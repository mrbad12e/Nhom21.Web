const express = require('express');
const routes = express.Router();
const { getAllUser, getUserById } = require('../../controllers/admin/user.controller');
const authenticate = require('../../middleware/auth/authenticate');
const authorizeAdmin = require('../../middleware/auth/authorize');

routes.get('/list', authorizeAdmin, getAllUser);

routes.get('/:id', authorizeAdmin, getUserById);

module.exports = routes;
