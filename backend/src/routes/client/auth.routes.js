const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protect = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Ví dụ route được bảo vệ
router.get('/me', protect, (req, res) => {
  res.json({
    status: 'success',
    data: {
      user: {
        id: req.user.id,
        email: req.user.email,
        fullName: req.user.fullName
      }
    }
  });
});

module.exports = router;