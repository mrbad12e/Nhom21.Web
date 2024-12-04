const jwt = require('jsonwebtoken');
const db = require('../../config/database');
require('dotenv').config();

const authorizeAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.auth || req.headers.authorization?.split(' ')[1];        
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);        
        
        const result = await db.query(
            'SELECT role FROM users WHERE id = $1',
            [decoded.id]
        );        

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (result[0].role !== 'ADMIN') {
            return res.status(403).json({ message: 'Admin access required' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authorizeAdmin;