const express = require('express');
const OrderController = require('../../controllers/client/order.controller');
const authenticate = require('../../middleware/auth/authenticate');
const router = express.Router();

// Tạo đơn hàng từ giỏ hàng
router.post('/create', authenticate, OrderController.createOrder);

// Lấy thông tin đơn hàng theo ID
router.get('/:orderId', OrderController.getOrderById);

// Lấy các sản phẩm trong đơn hàng
router.get('/:orderId/items', OrderController.getOrderItems);

module.exports = router;
