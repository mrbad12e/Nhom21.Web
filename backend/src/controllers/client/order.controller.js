
const OrderService = require('../../services/order.service');

class OrderController {
    // Tạo đơn hàng mới
    async createOrder(req, res) {
        const { userId, items } = req.body;
        try {
            const order = await OrderService.createOrder(userId, items);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Lấy danh sách đơn hàng của người dùng
    async getUserOrders(req, res) {
        const userId = req.params.userId;
        try {
            const orders = await OrderService.getUserOrders(userId);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Lấy chi tiết đơn hàng
    async getOrderById(req, res) {
        const orderId = req.params.orderId;
        try {
            const order = await OrderService.getOrderById(orderId);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new OrderController();
