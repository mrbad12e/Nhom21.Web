const express = require('express');
const route = express.Router();
const adminProductController = require('../../controllers/admin/product.controller');
const protect = require('../../middleware/auth/authenticate');
const authorizeAdmin = require('../../middleware/auth/authorize');
route.get(
  '/product-list',
  protect,
  authorizeAdmin,
  adminProductController.getProductList()
);

route.post(
  '/add-product',
  protect,
  authorizeAdmin,
  adminProductController.addProduct()
);

route.put(
  '/edit-product/:id',
  protect,
  authorizeAdmin,
  adminProductController.editProduct()
);

route.get(
  '/product/:id',
  protect,
  authorizeAdmin,
  adminProductController.getProductList()
);
