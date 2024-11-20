const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route đăng nhập
router.post('/login', authController.login);

// Route đăng ký tài khoản mới
router.post('/register', authController.register);

// Route cập nhật thông tin người dùng
router.put('/update-profile', authController.updateUserProfile);
module.exports = router;
