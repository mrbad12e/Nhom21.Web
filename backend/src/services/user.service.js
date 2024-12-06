const User = require('../models/User');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD

class UserService {
    static async signIn(username, password) {
        return await User.signIn(username, password);
    }

    static async createAccount(userData) {
        return await User.createAccount(userData);
    }

    static async updateProfile(userId, updateData) {
        return await User.updateProfile(userId, updateData);
    }

    static async updatePassword(username, newPassword) {
        await User.updatePassword(username, newPassword);
    }

    static async getCart(userId) {
        return await User.getCartByUserId(userId);
    }

    static async updateUserStatus(userId, isActive) {
        const user = await User.updateProfile(userId, { isActive });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    static async checkCartExistence(userId) {
        return await User.getCartByUserId(userId);
    }

    static createToken(user) {
        return jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
=======
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
>>>>>>> b5f7bb4131230df3ec402beae7c35a43e242ff76
    }
}

module.exports = UserService;
