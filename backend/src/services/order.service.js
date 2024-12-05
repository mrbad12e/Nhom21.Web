const Order = require('../models/Order');

class OrderService {
    // Tạo đơn hàng từ giỏ hàng
    static async createOrderFromCart(userId, shippingAddress) {
        try {
            return await Order.createOrderFromCart(userId, shippingAddress);
        } catch (error) {
            throw error;
        }
    }

    // Lấy thông tin đơn hàng theo ID
    static async getOrderById(customerId, orderId) {
        try {
            return await Order.getOrderById(customerId, orderId);
        } catch (error) {
            throw error;
        }
    }

    // Lấy các sản phẩm trong đơn hàng
    static async getOrderItems(orderId) {
        try {
            return await Order.getOrderItems(orderId);
        } catch (error) {
            throw error;
        }
    }

    static async getAllOrdersService(options) {
        try {
            return await Order.getAllOrder(option);
        } catch (error) {
            throw error;
        }
    }

    static async updateOrderStatusService(order_id, status, id) {
        try {
            return await Order.updateOrderStatus(order_id, status, id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderService;
