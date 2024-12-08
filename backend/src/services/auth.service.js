const jwt = require('jsonwebtoken');
const pool = require('../config/database');

exports.validateAdminCredentials = async (username, password) => {
    try {
        // Query to validate user credentials using raw SQL (keeping the same query structure)
        const result = await pool.query('SELECT * from signIn($1, $2)', [username, password]);

        if (!result[0].signin) throw new Error('Wrong username or password');

        const role = await pool.query('SELECT role FROM users WHERE id = $1', [result[0].signin]);
        if (role[0].role !== 'ADMIN') {
            const error = new Error('Unauthorized. User is not an admin.');
            error.statusCode = 403;
            throw error;
        }

        return {
            id: result[0].signin,
            username: username,
            role: role[0].role,
        }
        
    } catch (err) {
        throw err; // Pass the error to the middleware
    }
};

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};
