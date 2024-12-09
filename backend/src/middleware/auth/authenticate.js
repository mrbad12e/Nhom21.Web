const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware xác thực người dùng qua JWT
const authenticate = (req, res, next) => {
    const token =
        req.cookies.auth ||
        (req.header('Authorization') && req.header('Authorization').startsWith('Bearer ')
            ? req.header('Authorization').replace('Bearer ', '')
            : '');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Lưu thông tin người dùng vào `req.user`
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
