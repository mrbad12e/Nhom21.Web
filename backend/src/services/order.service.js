const { query } = require('../config/database'); // Giả sử bạn đang sử dụng kết nối db đã được cấu hình
const Order = require('../models/Order');

class OrderService {
    // Tạo đơn hàng
    async createOrder(userId, items) {
        // Tính tổng giá trị đơn hàng
        let totalAmount = 0;
        for (let item of items) {
            totalAmount += item.price * item.quantity;
        }

        const orderData = {
            userId,
            status: 'pending',
            totalAmount,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Insert vào bảng đơn hàng
        const result = await query(
            `INSERT INTO orders (user_id, status, total_amount, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [orderData.userId, orderData.status, orderData.totalAmount, orderData.createdAt, orderData.updatedAt]
        );

        const order = new Order(result[0]);
        // Sau khi tạo đơn hàng, thêm các mục trong đơn hàng vào bảng order_items
        for (let item of items) {
            await query(
                `INSERT INTO order_items (order_id, product_id, quantity, price)
                 VALUES ($1, $2, $3, $4)`,
                [order.id, item.productId, item.quantity, item.price]
            );
        }

        return order;
    }

    // Lấy danh sách đơn hàng của người dùng
    async getUserOrders(userId) {
        const orders = await query(
            `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId]
        );

        return orders;
    }

    // Lấy chi tiết đơn hàng theo ID
    async getOrderById(orderId) {
        const order = await query(
            `SELECT * FROM orders WHERE id = $1`,
            [orderId]
        );

        if (!order.length) {
            throw new Error("Order not found");
        }

        return order[0];
    }
}

module.exports = new OrderService();
