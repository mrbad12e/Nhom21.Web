const db = require('../config/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');

// Hàm đăng nhập
const login = async (username, password) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [
            username,
        ]);
        
        if (result.length === 0) {
            throw new Error('Invalid username or password');
        }
        const user = result[0];
        // So sánh password đã hash
        if (User.hashPassword(password) != user.password) {
            throw new Error('Invalid password');
        }
        // Tạo JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
    } catch (err) {
        throw new Error('Login failed: ' + err.message);
    }
};

// Hàm đăng ký tài khoản mới
const register = async (userData) => {
    const {
        username,
        password,
        email,
        firstName,
        lastName,
        role = 'CUSTOMER',
        phone = null,
        address = null,
        image = null,
    } = userData;
    try {
        const existingUser = await db.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
        if (existingUser.length > 0) {
            throw new Error('Username or email already taken');
        }
        await User.createAccount(username, password, email, firstName, lastName, role, phone, address, image);
        return { username, email, firstName, lastName, role };
    } catch (err) {
        throw new Error('Registration failed: ' + err.message);
    }
};

// Hàm cập nhật thông tin người dùng
const updateAccount = async (userId, userData) => {
    const { email, firstName, lastName, phone, address, image } = userData;
    console.log(userData);
    
    try {
        // Cập nhật thông tin người dùng
        await User.updateProfile(userId, email, firstName, lastName, phone, address, image);
    } catch (err) {
        throw new Error('Profile update failed: ' + err.message);
    }
};

// Cập nhật trạng thái người dùng
const updateUserStatus = async (userId, isActive) => {
    try {
        const user = await User.updateUserStatus(userId, isActive);
        return user;
    } catch (err) {
        throw new Error('Error in UserService while updating user status: ' + err.message);
    }
};

// Kiểm tra xem người dùng đã có giỏ hàng chưa
const checkCartExistence = async (userId) => {
    try {
        const exists = await User.checkCartExistence(userId);
        return exists;
    } catch (err) {
        throw new Error('Error in UserService while checking cart existence: ' + err.message);
    }
};

module.exports = { login, register, updateAccount, updateUserStatus, checkCartExistence };
