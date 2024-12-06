const express = require('express');
const OrderController = require('../../controllers/client/order.controller');

const router = express.Router();

// Tạo đơn hàng từ giỏ hàng
router.post('/create', OrderController.createOrder);

// Lấy thông tin đơn hàng theo ID
router.get('/:orderId', OrderController.getOrderById);

// Lấy các sản phẩm trong đơn hàng
router.get('/:orderId/items', OrderController.getOrderItems);

module.exports = router;