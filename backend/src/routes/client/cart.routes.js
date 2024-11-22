const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/client/cart.controller');

// Route: Thêm sản phẩm vào giỏ hàng
router.post('/add', cartController.addProductToCart);

// Route: Lấy danh sách sản phẩm trong giỏ hàng
router.get('/:userId', cartController.getCartItems);

module.exports = router;
