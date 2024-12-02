const express = require('express');
const ReviewController = require('../../controllers/client/review.controller');

const router = express.Router();

// Lưu trữ thay đổi trạng thái đơn hàng
router.post('/status-change', ReviewController.logOrderStatusChange);

// Lấy lịch sử trạng thái của đơn hàng
router.get('/:orderId/history', ReviewController.getOrderStatusHistory);

module.exports = router;
