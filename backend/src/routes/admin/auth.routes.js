const express = require('express');
const routes = express.Router();
const adminAuthController = require('../../controllers/admin/auth.controller');

routes.post('/login', adminAuthController.login);
routes.post('/logout', adminAuthController.logout);
//routes.post('/refresh-token', adminAuthController.refreshToken);

module.exports = routes;
