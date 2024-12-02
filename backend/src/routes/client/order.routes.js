// routes/OrderRoutes.js
const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/client/order.controller');

// Route để tạo đơn hàng
router.post('/create', OrderController.createOrder);

// Route để lấy danh sách đơn hàng của người dùng
router.get('/user/:userId', OrderController.getUserOrders);

// Route để lấy thông tin chi tiết đơn hàng theo ID
router.get('/:orderId', OrderController.getOrderById);

module.exports = router;
