const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'your-secret-key';

const protect = async (req, res, next) => {
  try {
    // Kiểm tra token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Bạn chưa đăng nhập'
      });
    }

    // Xác thực token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Kiểm tra user vẫn tồn tại
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Token không hợp lệ'
      });
    }

    // Gắn user vào request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Token không hợp lệ'
    });
  }
};

module.exports = protect;