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