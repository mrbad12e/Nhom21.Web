const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware xác thực người dùng qua JWT
const authenticate = (req, res, next) => {
    const token = req.cookies.auth;
    if (!token) return res.status(401).json({ message: 'Not logged in yet' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticate };
