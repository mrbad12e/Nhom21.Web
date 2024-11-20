const authService = require('../services/authService');

async function login(req, res) {
  const { username, password } = req.body;

  const isAuthenticated = await authService.signIn(username, password);

  if (isAuthenticated) {
    res.json({ message: 'Đăng nhập thành công' });
  } else {
    res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
  }
}

module.exports = { login };

// Controller để đăng ký tài khoản
async function register(req, res) {
  const { username, password, email, firstName, lastName, role, phone, address, image } = req.body;

  try {
    await authService.createAccount(username, password, email, firstName, lastName, role, phone, address, image);
    res.status(201).json({ message: 'Tạo tài khoản thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Đã có lỗi xảy ra khi tạo tài khoản' });
  }
}

module.exports = { register };

//Controller cập nhật tài khoản
/**
 * Controller để cập nhật thông tin người dùng
 * @param {Object} req - Yêu cầu HTTP từ client
 * @param {Object} res - Đáp ứng HTTP cho client
 */
async function updateUserProfile(req, res) {
  const { username, email, firstName, lastName, phone, address, image } = req.body;

  // Kiểm tra nếu không cung cấp username
  if (!username) {
    return res.status(400).json({ message: 'Tên người dùng là bắt buộc.' });
  }

  try {
    await authService.updateProfile(username, email, firstName, lastName, phone, address, image);
    res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Đã có lỗi xảy ra khi cập nhật thông tin.', error: error.message });
  }
}

module.exports = { updateUserProfile };