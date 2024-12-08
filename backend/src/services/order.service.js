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

  static async getCustomerPayments(userId, limit, offset) {
    return await CustomerPaymentModel.getCustomerPayments(userId, limit, offset);
  
  }

}

module.exports = OrderService;