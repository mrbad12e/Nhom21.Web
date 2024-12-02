const Order = require('../models/Order');

class OrderService {
  // Tạo đơn hàng từ giỏ hàng
  static async createOrderFromCart(userId, shippingAddress) {
    return await Order.createOrderFromCart(userId, shippingAddress);
  }

  // Lấy thông tin đơn hàng theo ID
  static async getOrderById(orderId) {
    return await Order.getOrderById(orderId);
  }

  // Lấy các sản phẩm trong đơn hàng
  static async getOrderItems(orderId) {
    return await Order.getOrderItems(orderId);
  }
}

module.exports = OrderService;
