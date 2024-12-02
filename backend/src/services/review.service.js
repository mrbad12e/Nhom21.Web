const Review = require('../models/Review');

class ReviewService {
  // Gọi hàm logOrderStatusChange
  static async logOrderStatusChange(orderId, oldStatus, newStatus, changedBy) {
    return await Review.logOrderStatusChange(orderId, oldStatus, newStatus, changedBy);
  }

  // Lấy lịch sử trạng thái của đơn hàng
  static async getOrderStatusHistory(orderId) {
    return await Review.getOrderStatusHistory(orderId);
  }
}

module.exports = ReviewService;
