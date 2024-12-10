const express = require('express');
const authenticate = require('../../middleware/auth/authenticate');
const authorizeAdmin = require('../../middleware/auth/authorize');
const adminDashboardController = require('../../controllers/admin/dashboard.controller');
const routes = express.Router();

routes.post('/stat-overview', authorizeAdmin, adminDashboardController.getOverview);
routes.post('/stat-chart', authorizeAdmin, adminDashboardController.getChart);
routes.post('/recent-order', authorizeAdmin, adminDashboardController.getRecentOrders);

module.exports = routes;
