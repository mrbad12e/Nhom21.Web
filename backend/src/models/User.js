const db = require('../db');

class User {
  constructor(data) {
    if (!User.validate(data)) {
      throw new Error("Invalid user data");
    }
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.createdAt = data.createdAt;
  }

  static validate(user) {
    return !!(
      user.id &&
      user.username &&
      user.email &&
      user.password &&
      user.firstName &&
      user.lastName
    );
  }

  // Hàm đăng nhập
  static async signIn(username, password) {
    try {
      const result = await db.query('SELECT * FROM signIn($1, $2)', [username, password]);
      
      if (result.length > 0) {
        return true; // Đăng nhập thành công
      } else {
        return false; // Đăng nhập thất bại
      }
    } catch (err) {
      console.error('Lỗi khi gọi hàm đăng nhập:', err);
      return false;
    }
  }

  // Hàm tạo tài khoản
  static async createAccount(username, password, email, firstName, lastName, role = 'CUSTOMER', phone = null, address = null, image = null) {
    try {
      const result = await db.query('SELECT create_account($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
        username,
        password,
        email,
        firstName,
        lastName,
        role,
        phone,
        address,
        image
      ]);
  
      console.log('Tạo tài khoản thành công');
    } catch (err) {
      console.error('Lỗi khi gọi hàm tạo tài khoản:', err.message);
      throw err;
    }
  }

  // Hàm cập nhật thông tin người dùng
  static async updateProfile(username, email = null, firstName = null, lastName = null, phone = null, address = null, image = null) {
    try {
      const query = `
        SELECT update_profile($1, $2, $3, $4, $5, $6, $7)
      `;
      const values = [username, email, firstName, lastName, phone, address, image];
  
      await db.query(query, values);
      console.log('Cập nhật thông tin người dùng thành công.');
    } catch (err) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', err.message);
      throw err;
    }
  }
}

module.exports = User;
