const OrderService = require('../../services/order.service');

class OrderController {
  // Tạo đơn hàng từ giỏ hàng
  static async createOrder(req, res) {
    try {
      const userId = req.user.userId;
      const { shippingAddress } = req.body;
      const orderId = await OrderService.createOrderFromCart(userId, shippingAddress);
      res.status(200).json({ message: 'Order created successfully', orderId });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Lấy thông tin đơn hàng theo ID
  static async getOrderById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Lấy các sản phẩm trong đơn hàng
  static async getOrderItems(req, res) {
    try {
      const { orderId } = req.params;
      const items = await OrderService.getOrderItems(orderId);
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = OrderController;
