const express = require('express');
const routes = express.Router();
const adminUserController = require('../../controllers/admin/user.controller');
const authenticate = require('../../middleware/auth/authenticate');
const authorizeAdmin = require('../../middleware/auth/authorize');
routes.get('/user-list', authenticate, authorizeAdmin, adminUserController.getAllUser);

routes.get('/user/:id', authenticate, authorizeAdmin, adminUserController.getDetailUser);

module.exports = routes;
