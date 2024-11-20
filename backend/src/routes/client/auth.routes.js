const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const { authenticate } = require('../middlewares/authMiddleware');

// Route đăng nhập
router.post('/login', authController.login);

// Route đăng ký tài khoản mới
router.post('/register', authController.register);

// Route cập nhật thông tin người dùng (có xác thực)
router.put('/update-profile', authenticate, authController.updateUserProfile);

module.exports = router;
