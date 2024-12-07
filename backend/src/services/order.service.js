const Order = require('../models/Order');

class OrderService {
  // Tạo đơn hàng từ giỏ hàng
  static async createOrderFromCart(userId, shippingAddress) {
      return await Order.createOrderFromCart(userId, shippingAddress);
    }

  static async getOrderById(orderId, userId) {
      return await Order.getOrderById(orderId, userId);
  }

  // Tạo thanh toán cho đơn hàng
  static async createPayment(orderId, amount, paymentMethod) {
      return await Order.createPayment(orderId, amount, paymentMethod);

  }
}

module.exports = OrderService;