const UserService = require('../services/userservice');
const CartService = require('../services/cartservice');

// Hàm đăng nhập
const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      const { token, user } = await authService.login(username, password);
      
      // Loại bỏ password khỏi thông tin user trả về
      const { password: _, ...userInfo } = user;
      
      res.status(200).json({ token, user: userInfo });
    } catch (err) {
      console.error('Login error:', err);
      res.status(401).json({ message: err.message || 'Login failed' });
    }
  };

// Hàm đăng ký tài khoản mới
const register = async (req, res) => {
    try {
      const userData = req.body;
      
      // Validate input
      if (!userData.username || !userData.password || !userData.email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const user = await authService.register(userData);
      res.status(201).json({ 
        message: 'Registration successful', 
        user: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        } 
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(400).json({ message: err.message || 'Registration failed' });
    }
  };

// Hàm cập nhật thông tin người dùng
const updateUserProfile = async (req, res) => {
    try {
      const userData = req.body;
      
      // Validate input
      if (!userData.email && !userData.firstName && !userData.lastName) {
        return res.status(400).json({ message: 'No update data provided' });
      }
  
      const updatedUser = await authService.updateAccount(req.user.id, userData);
      res.status(200).json({ 
        message: 'Profile updated successfully', 
        user: updatedUser 
      });
    } catch (err) {
      console.error('Profile update error:', err);
      res.status(400).json({ message: err.message || 'Profile update failed' });
    }
  };

// Hàm cập nhật trạng thái người dùng
const updateUserStatus = async (req, res) => {
    const { userId, isActive } = req.body;
    
    // Validate input
    if (!userId || typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'Invalid input data' });
    }
    
    try {
      // Cập nhật trạng thái kích hoạt người dùng
      const user = await UserService.updateUserStatus(userId, isActive);
  
      // Kiểm tra xem người dùng có giỏ hàng chưa, nếu chưa thì tạo giỏ hàng
      if (isActive && !(await UserService.checkCartExistence(userId))) {
        // Tạo giỏ hàng cho người dùng nếu chưa có
        await CartService.createCartForUser(userId);
      }
  
      res.status(200).json({ 
        message: 'User status updated successfully', 
        user: {
          id: user.id,
          username: user.username,
          isActive: user.isActive
        }
      });
    } catch (err) {
      console.error('User status update error:', err);
      res.status(500).json({ 
        message: 'Error updating user status', 
        error: err.message 
      });
    }
  };
  
module.exports = { login, register, updateUserProfile, updateUserStatus };
