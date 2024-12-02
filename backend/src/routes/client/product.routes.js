const express = require('express');
const router = express.Router();
const productController = require('../../controllers/client/product.controller');

// Lấy danh sách toàn bộ sản phẩm với tùy chọn tìm kiếm
router.get('/', productController.getAllProducts);

// Lấy danh sách sản phẩm theo danh mục
router.get('/category/:categoryId', productController.getProductsByCategory);

// Lấy thông tin chi tiết của một sản phẩm
router.get('/:id', productController.getProductById);

module.exports = router;
