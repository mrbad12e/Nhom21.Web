const express = require('express');
const CartController = require('../../controllers/client/cart.controller');

const router = express.Router();

// Lấy danh sách sản phẩm trong giỏ hàng
router.get('/:customerId', CartController.getCart);

// Thêm sản phẩm vào giỏ hàng
router.post('/add', CartController.addProduct);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/update', CartController.updateCartItem);

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/remove', CartController.removeProduct);

module.exports = router;