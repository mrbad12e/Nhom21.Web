const express = require('express');
const route = express.Router();
const adminAuthController = require('../../controllers/admin/auth.controller');
const authorizeAdmin = require('../../middleware/auth/authorize');
const authenticate = require('../../middleware/auth/authenticate');

route.post('/login', adminAuthController.login);
route.get('/logout', authenticate, authorizeAdmin, adminAuthController.logout);

module.exports = route;
