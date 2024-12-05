const express = require('express');
const authorizeAdmin = require('../../middleware/auth/authorize');
const authenticate = require('../../middleware/auth/authenticate');
const { getAllOrders, getOrderById, updateOrderStatus } = require('../../controllers/admin/order.controller');
const routes = express.Router();

routes.post('/order-list', authenticate, authorizeAdmin, getAllOrders);
routes.post('/order/:id', authenticate, authorizeAdmin, getOrderById);
routes.put('/order/:id/update', authenticate, authorizeAdmin, updateOrderStatus);
