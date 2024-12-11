const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    console.log('Cookies:', req.cookies); // Add this
    console.log('Auth header:', req.headers.authorization); // Add this
    const token = req.cookies.auth || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        res.clearCookie('auth');
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie('auth');
        return res.status(401).json({ message: err.message });
    }
};

module.exports = authenticate;