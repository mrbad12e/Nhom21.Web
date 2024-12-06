const express = require('express');
const CartController = require('../../controllers/client/cart.controller');
const authMiddleware = require('../../middleware/auth/authenticate');

const router = express.Router();

// Lấy danh sách sản phẩm trong giỏ hàng
router.get('/', authMiddleware, CartController.getCart);

// Thêm sản phẩm vào giỏ hàng
router.post('/add', authMiddleware, CartController.addProduct);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/update', authMiddleware, CartController.updateCartItem);

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/remove', authMiddleware, CartController.removeProduct);

module.exports = router;
