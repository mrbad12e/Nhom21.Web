const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route đăng nhập
router.post('/login', authController.login);

// Route đăng ký tài khoản mới
router.post('/register', authController.register);

module.exports = router;
