const express = require('express');
const authorizeAdmin = require('../../middleware/auth/authorize');
const authenticate = require('../../middleware/auth/authenticate');
const adminOrderController = require('../../controllers/admin/order.controller');
const routes = express.Router();

routes.post('/order-list', authenticate, authorizeAdmin, adminOrderController.getAllOrders);
routes.post('/order/:id', authenticate, authorizeAdmin, adminOrderController.getOrderById);
routes.put('/order/:id/update', authenticate, authorizeAdmin, adminOrderController.updateOrderStatus);

module.exports = routes;
