const express = require('express');
const authenticate = require('../../middleware/auth/authenticate');
const authorizeAdmin = require('../../middleware/auth/authorize');
const adminDashboardController = require('../../controllers/admin/dashboard.controller');
const routes = express.Router();

routes.post('/stat-overview', authenticate, authorizeAdmin, adminDashboardController.getOverview);
routes.post('/stat-chart', authenticate, authorizeAdmin, adminDashboardController.getChart);
routes.post('/recent-order', authenticate, authorizeAdmin, adminDashboardController.getRecentOrders);

module.exports = routes;
