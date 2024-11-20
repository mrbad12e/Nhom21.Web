const authService = require('../services/auth');

// Hàm đăng nhập
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token, user } = await authService.login(username, password);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Hàm đăng ký tài khoản mới
const register = async (req, res) => {
  try {
    const userData = req.body;
    const user = await authService.register(userData);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Hàm cập nhật thông tin người dùng
const updateUserProfile = async (req, res) => {
  try {
    const userData = req.body;
    const updatedUser = await authService.updateAccount(req.user.id, userData);
    res.status(200).json({ updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { login, register, updateUserProfile };
