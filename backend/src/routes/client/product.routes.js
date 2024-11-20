const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route lấy danh sách toàn bộ sản phẩm
router.get('/all', productController.getAllProducts);

// Route lấy danh sách sản phẩm theo danh mục
router.get('/category/:categoryId', productController.getProductsByCategory);

module.exports = router;
