const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

class UserService {
    static async signIn(username, password) {
        try {
            const userId = await User.signIn(username, password);            
            const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
            return token;
            
        } catch (err) {
            throw new Error('Login failed: ' + err.message);
        }
    }

    static async createAccount(userData) {
        try {
            await User.createAccount(userData);
        } catch (err) {
            throw new Error('Registration failed: ' + err.message);
        }
    }
}

module.exports = UserService;
