const { query, connect } = require('../config/database');
const Order = require('../models/Order');

class OrderService {
    // Tạo đơn hàng với kiểm tra và xử lý toàn diện
    async createOrder(userId, items) {
        // Validation đầu vào
        if (!userId) {
            const error = new Error('User ID is required');
            error.statusCode = 400;
            throw error;
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            const error = new Error('Invalid order items');
            error.statusCode = 400;
            throw error;
        }

        const client = await connect();

        try {
            // Bắt đầu giao dịch
            await client.query('BEGIN');

            // Kiểm tra và tính tổng giá trị đơn hàng
            let totalAmount = 0;
            const validatedItems = [];

            for (let item of items) {
                // Kiểm tra thông tin sản phẩm
                const productQuery = await client.query(
                    `SELECT id, price, stock 
                     FROM products 
                     WHERE id = $1 AND stock >= $2`,
                    [item.productId, item.quantity]
                );

                if (productQuery.rows.length === 0) {
                    const error = new Error(`Product ${item.productId} unavailable or insufficient stock`);
                    error.statusCode = 400;
                    throw error;
                }

                const product = productQuery.rows[0];
                
                // Cập nhật tồn kho
                await client.query(
                    `UPDATE products 
                     SET stock = stock - $1 
                     WHERE id = $2`,
                    [item.quantity, item.productId]
                );

                // Tính tổng giá
                const itemTotal = product.price * item.quantity;
                totalAmount += itemTotal;

                validatedItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price
                });
            }

            // Tạo đơn hàng
            const orderResult = await client.query(
                `INSERT INTO orders 
                 (user_id, status, total_amount, created_at, updated_at)
                 VALUES ($1, $2, $3, $4, $5) 
                 RETURNING *`,
                [
                    userId, 
                    'pending', 
                    totalAmount, 
                    new Date(), 
                    new Date()
                ]
            );

            const order = orderResult.rows[0];

            // Thêm chi tiết đơn hàng
            for (let item of validatedItems) {
                await client.query(
                    `INSERT INTO order_items 
                     (order_id, product_id, quantity, price)
                     VALUES ($1, $2, $3, $4)`,
                    [order.id, item.productId, item.quantity, item.price]
                );
            }

            // Kết thúc giao dịch
            await client.query('COMMIT');

            return order;
        } catch (error) {
            // Rollback giao dịch nếu có lỗi
            await client.query('ROLLBACK');
            
            // Xử lý lỗi chi tiết
            if (error.statusCode) {
                throw error;
            }
            
            const serverError = new Error('Failed to create order');
            serverError.statusCode = 500;
            throw serverError;
        } finally {
            // Giải phóng kết nối
            client.release();
        }
    }

    // Lấy danh sách đơn hàng của người dùng
    async getUserOrders(userId) {
        if (!userId) {
            const error = new Error('User ID is required');
            error.statusCode = 400;
            throw error;
        }

        try {
            const orders = await query(
                `SELECT o.*, 
                    (SELECT json_agg(
                        json_build_object(
                            'productId', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'productName', p.name
                        )
                    ) AS items
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = o.id) 
                FROM orders o
                WHERE o.user_id = $1 
                ORDER BY o.created_at DESC`,
                [userId]
            );

            return orders;
        } catch (error) {
            const serverError = new Error('Failed to retrieve orders');
            serverError.statusCode = 500;
            throw serverError;
        }
    }

    // Lấy chi tiết đơn hàng theo ID
    async getOrderById(orderId) {
        if (!orderId) {
            const error = new Error('Order ID is required');
            error.statusCode = 400;
            throw error;
        }

        try {
            const orderQuery = await query(
                `SELECT o.*, 
                    (SELECT json_agg(
                        json_build_object(
                            'productId', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'productName', p.name,
                            'productImage', p.image_url
                        )
                    ) AS items
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = o.id) 
                FROM orders o
                WHERE o.id = $1`,
                [orderId]
            );

            if (orderQuery.length === 0) {
                const error = new Error('Order not found');
                error.statusCode = 404;
                throw error;
            }

            return orderQuery[0];
        } catch (error) {
            if (error.statusCode) {
                throw error;
            }
            
            const serverError = new Error('Failed to retrieve order details');
            serverError.statusCode = 500;
            throw serverError;
        }
    }
}

module.exports = new OrderService();