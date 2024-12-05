const db = require('../config/database');

class Order {
    constructor(data) {
        this.validate(data);

        this.id = data.id;
        this.customerId = data.customer_id || data.customerId;
        this.totalPrice = parseFloat(data.total_price || data.totalPrice);
        this.shippingAddress = data.shipping_address || data.shippingAddress;
        this.orderStatus = data.order_status || data.orderStatus;
        this.paymentStatus = data.payment_status || data.paymentStatus;
        this.createdAt = data.created_at || data.createdAt;
        this.items = data.items || [];
    }

    // Kiểm tra tính hợp lệ của các thông tin đơn hàng
    validate(order) {
        const validationErrors = [];

        if (!order.customer_id) {
            validationErrors.push('Customer ID is required');
        }

        if (!this.isValidStatus(order.order_status)) {
            validationErrors.push('Invalid order status');
        }

        if (!this.isValidPaymentStatus(order.payment_status)) {
            validationErrors.push('Invalid payment status');
        }

        if (parseFloat(order.total_price) < 0) {
            validationErrors.push('Invalid total price');
        }

        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join(', '));
        }

        return true;
    }

    static getValidStatuses() {
        return ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELED'];
    }

    static getValidPaymentStatuses() {
        return ['PENDING', 'COMPLETED', 'FAILED'];
    }

    isValidStatus(status) {
        return Order.getValidStatuses().includes(status);
    }

    isValidPaymentStatus(status) {
        return Order.getValidPaymentStatuses().includes(status);
    }

    // Tạo đơn hàng từ giỏ hàng
    static async createOrderFromCart(userId, shippingAddress) {
        try {
            // Thực thi hàm SQL create_order_from_cart
            const query = `
        SELECT public.create_order_from_cart($1, $2) AS order_id;
      `;
            const result = await db.query(query, [userId, shippingAddress]);
            return result.rows[0].order_id;
        } catch (err) {
            console.error('Error creating order from cart:', err);
            throw new Error('Failed to create order from cart');
        }
    }

    // Lấy thông tin đơn hàng theo ID
    static async getOrderById(customerId, orderId) {
        try {
            const query = `
        SELECT * FROM public.get_order($1,$2);
      `;
            const result = await db.query(query, [orderId, customerId]);
            return result;
        } catch (err) {
            console.error('Get order by ID error:', err);
            throw new Error('Failed to fetch order');
        }
    }

    // Lấy thông tin các sản phẩm trong đơn hàng
    static async getOrderItems(orderId) {
        try {
            const query = `
        SELECT oi.id AS order_item_id, oi.quantity, oi.price, 
               p.id AS product_id, p.name AS product_name, p.price AS product_price
        FROM public.order_items oi
        JOIN public.products p ON oi.product_id = p.id
        WHERE oi.order_id = $1;
      `;
            const result = await db.query(query, [orderId]);
            return result.rows;
        } catch (err) {
            console.error('Get order items error:', err);
            throw new Error('Failed to fetch order items');
        }
    }

    static generateOrderId() {
        return Math.random().toString(36).substr(2, 16).toUpperCase();
    }

    static generateOrderItemId() {
        return Math.random().toString(36).substr(2, 24).toUpperCase();
    }
    static async getAllOrder(options) {
        try {
            const { id, offset, limit, status } = options;
            const result = await db.query('SELECT * FROM get_all_orders($1, $2, $3, $4)', [id, limit, offset, status]);
        } catch (error) {
            throw error;
        }
    }

    static async updateOrderStatus(orderId, status, userId) {
        try {
            if (isValidStatus(status)) {
                await db.query('CALL update_order_status($1, $2, $3', [orderId, status, userId]);
                return true;
            } else throw new Error('Invalid order status, cannot update');
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Order;
