const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
    }
}

module.exports = UserService;
