const express = require('express');
const route = express.Router();
const adminProductController = require('../../controllers/admin/product.controller');
const authenticate = require('../../middleware/auth/authenticate');
const authorizeAdmin = require('../../middleware/auth/authorize');
route.get(
  '/product-list',
  authenticate,
  authorizeAdmin,
  adminProductController.getProductList
);

route.post(
  '/add-product',
  authenticate,
  authorizeAdmin,
  adminProductController.addProduct
);

route.put(
  '/edit-product/:id',
  authenticate,
  authorizeAdmin,
  adminProductController.editProduct
);

route.get(
  '/product/:id',
  protect,
  authorizeAdmin,
  adminProductController.getProductList
);
