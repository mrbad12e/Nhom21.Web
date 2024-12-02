const UserService = require('../../services/user.service');

class UserController {
  static async signIn(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserService.signIn(username, password);
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createAccount(req, res) {
    try {
      const newUser = await UserService.createAccount(req.body);
      res.status(201).json({ message: 'Account created successfully', user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.params.id;
      const updatedUser = await UserService.updateProfile(userId, req.body);
      res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { username, newPassword } = req.body;
      await UserService.updatePassword(username, newPassword);
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}

module.exports = UserController;
