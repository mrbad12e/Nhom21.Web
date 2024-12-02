const OrderService = require('../../services/order.service');

class OrderController {
    // Tạo đơn hàng mới
    async createOrder(req, res) {
        try {
            const { userId, items } = req.body;
            
            // Validate input
            if (!userId || !items) {
                return res.status(400).json({ 
                    error: 'Missing user ID or order items' 
                });
            }

            const order = await OrderService.createOrder(userId, items);
            res.status(201).json(order);
        } catch (error) {
            // Xử lý các loại lỗi khác nhau
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ 
                error: error.message || 'Internal server error' 
            });
        }
    }

    // Lấy danh sách đơn hàng của người dùng
    async getUserOrders(req, res) {
        try {
            const userId = req.params.userId;
            
            // Validate input
            if (!userId) {
                return res.status(400).json({ 
                    error: 'User ID is required' 
                });
            }

            const orders = await OrderService.getUserOrders(userId);
            res.status(200).json(orders);
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ 
                error: error.message || 'Internal server error' 
            });
        }
    }

    // Lấy chi tiết đơn hàng
    async getOrderById(req, res) {
        try {
            const orderId = req.params.orderId;
            
            // Validate input
            if (!orderId) {
                return res.status(400).json({ 
                    error: 'Order ID is required' 
                });
            }

            const order = await OrderService.getOrderById(orderId);
            res.status(200).json(order);
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ 
                error: error.message || 'Internal server error' 
            });
        }
    }
}

module.exports = new OrderController();