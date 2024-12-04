const express = require('express');
const route = express.Router();
const adminAuthController = require('../../controllers/admin/auth.controller');

route.post('/login', adminAuthController.login);
route.post('/logout', adminAuthController.logout);


module.exports = route;
