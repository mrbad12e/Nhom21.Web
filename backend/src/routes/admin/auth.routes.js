const express = require('express');
const route = express.Router();
const adminAuthController = require('../../controllers/admin/auth.controller');


route.post('/login',adminAuthController.login);
route.post('/logout',adminAuthController.logout);
route.post('/refresh-token',adminAuthController);

module.exports=route;