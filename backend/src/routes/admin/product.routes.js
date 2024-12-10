const express = require('express');
const route = express.Router();
const adminProductController = require('../../controllers/admin/product.controller');
const authorizeAdmin = require('../../middleware/auth/authorize');
const { checkFileUpload } = require('../../middleware/upload.middleware');
route.get('/product-list', authorizeAdmin, adminProductController.getProductList);

route.post('/add-product', authorizeAdmin, checkFileUpload, adminProductController.addProduct);

route.put('/edit-product/:id', authorizeAdmin, adminProductController.editProduct);

route.get('/product/:id', authorizeAdmin, adminProductController.getProduct);

module.exports = route;
