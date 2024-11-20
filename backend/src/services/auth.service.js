const db = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

// Hàm đăng nhập
const login = async (username, password) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.length === 0) {
      throw new Error('Invalid username or password');
    }
    const user = result[0];
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

module.exports = { login, register, updateAccount };
