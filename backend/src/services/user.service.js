const User = require('../models/User');

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
  
}

module.exports = UserService;
