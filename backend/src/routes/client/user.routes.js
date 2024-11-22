const express = require('express');
const router = express.Router();
const usercontroller = require('../../controllers/client/user.controller'); 
const { authenticate } = require('../../middleware/auth/authenticate');

// Route đăng nhập
router.post('/login', usercontroller.login);

// Route đăng ký tài khoản mới
router.post('/register', usercontroller.register);

// Route cập nhật thông tin người dùng (có xác thực)
router.put('/update-profile', authenticate, usercontroller.updateUserProfile);

// Route cập nhật trạng thái người dùng
router.put('/update-status', usercontroller.updateUserStatus);

module.exports = router;
