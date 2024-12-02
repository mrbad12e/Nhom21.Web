const ReviewService = require('../../services/review.service');

class ReviewController {
  // Lưu trữ thay đổi trạng thái đơn hàng
  static async logOrderStatusChange(req, res) {
    try {
      const { orderId, oldStatus, newStatus, changedBy } = req.body;
      const result = await ReviewService.logOrderStatusChange(orderId, oldStatus, newStatus, changedBy);
      res.status(201).json({ message: 'Order status change logged successfully', result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Lấy lịch sử trạng thái của đơn hàng
  static async getOrderStatusHistory(req, res) {
    try {
      const { orderId } = req.params;
      const history = await ReviewService.getOrderStatusHistory(orderId);
      res.status(200).json(history);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ReviewController;
