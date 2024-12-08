const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

class UserService {
    static async signIn(username, password) {
        try {
            let userId = await User.signIn(username, password);            
            if (!userId[0].signin) {
                throw new Error('Invalid login credentials');
            }
            userId = userId[0].signin;
            const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
            return token;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async createAccount(userData) {
        await User.createAccount(userData);
    }
    static async getUserByIdService(id) {
        try {
            return (result = await User.getUserDetailByID(id));
        } catch (error) {
            throw error;
        }
    }
    static async getAllUserService() {
        try {
            return (result = await User.getAllUser());
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
