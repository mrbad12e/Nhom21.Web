const jwt = require('jsonwebtoken');
const db = require('../../config/database');
// Middleware to check if the user is an admin
async function authorizeAdmin(req, res, next) {
    // Get the token from cookies (or headers)

    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'No token provided' });
        }
        console.log('authorize middleware');
        const result = await db.query('SELECT role FROM users WHERE id = $1', [user.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (result[0].role !== 'ADMIN') {
            return res.status(403).json({ message: 'Admin access required' });
        }

        req.user = user;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = authorizeAdmin;
