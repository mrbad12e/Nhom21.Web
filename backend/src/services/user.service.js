const db = require('../config/database');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Hàm đăng nhập
const login = async (username, password) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.length === 0) {
      throw new Error('Invalid username or password');
    }
    const user = result[0];
    // So sánh password đã hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
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
  const { username, password, email, firstName, lastName, role = 'CUSTOMER', phone = null, address = null, image = null } = userData;
  try {
    const existingUser = await db.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (existingUser.length > 0) {
      throw new Error('Username or email already taken');
    }
    // Hash password trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);
    // Thêm tài khoản mới vào cơ sở dữ liệu
    const result = await db.query('SELECT create_account($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
      username, password, email, firstName, lastName, role, phone, address, image
    ]);
    return { username, email, firstName, lastName, role };
  } catch (err) {
    throw new Error('Registration failed: ' + err.message);
  }
};

// Hàm cập nhật thông tin người dùng
const updateAccount = async (userId, userData) => {
  const { email, firstName, lastName, phone, address, image } = userData;
  try {
    // Cập nhật thông tin người dùng
    const result = await db.query('SELECT update_profile($1, $2, $3, $4, $5, $6, $7)', [
      userId, email, firstName, lastName, phone, address, image
    ]);
    return { userId, email, firstName, lastName, phone, address, image };
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
