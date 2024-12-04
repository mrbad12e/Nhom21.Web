const db = require('../config/database');
const crypto = require('crypto');

class User {
  constructor(data) {
    if (!User.validate(data)) {
      throw new Error('Invalid user data');
    }
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.firstName = data.first_name || data.firstName;
    this.lastName = data.last_name || data.lastName;
    this.role = data.role || 'CUSTOMER';
    this.createdAt = data.created_at || data.createdAt;
    this.isActive = data.is_active || false;
    this.phone = data.phone || null;
    this.address = data.address || null;
    this.image = data.image || null;
  }

  static validate(user) {
    return !!(
      user.username &&
      user.email &&
      user.password &&
      user.first_name &&
      user.last_name &&
      ['ADMIN', 'CUSTOMER'].includes(user.role || 'CUSTOMER') &&
      this.validateEmail(user.email) &&
      this.validatePhone(user.phone)
    );
  }

  static validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return email ? emailRegex.test(email) : true;
  }

  static validatePhone(phone) {
    const phoneRegex = /^0[0-9]{9}$/;
    return phone ? phoneRegex.test(phone) : true;
  }

  static hashPassword(password) {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  static async signIn(username, password) {
    try {
      const hashedPassword = this.hashPassword(password);
      const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
      const result = await db.query(query, [username, hashedPassword]);

      return result.rows.length > 0 ? new User(result.rows[0]) : null;
    } catch (err) {
      console.error('Login error:', err);
      throw new Error('Login failed');
    }
  }

  static async createAccount(data) {
    try {
      // Generate a UUID for the user ID
      const id = crypto.randomBytes(16).toString('hex').toLowerCase();

      // Hash the password
      const hashedPassword = this.hashPassword(data.password);

      const query = `
        INSERT INTO users 
        (id, username, password, email, first_name, last_name, role, 
         phone, address, image, is_active) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *
      `;
      const values = [
        id,
        data.username,
        hashedPassword,
        data.email,
        data.firstName,
        data.lastName,
        data.role || 'CUSTOMER',
        data.phone || null,
        data.address || null,
        data.image || null,
        false, // is_active defaults to false
      ];
      const result = await db.query(query, values);
      return new User(result.rows[0]);
    } catch (err) {
      console.error('Account creation error:', err);
      throw new Error('Failed to create account');
    }
  }

  static async updateProfile(userId, updateData) {
    try {
      // Validate email and phone if provided
      if (updateData.email && !this.validateEmail(updateData.email)) {
        throw new Error('Invalid email format');
      }
      if (updateData.phone && !this.validatePhone(updateData.phone)) {
        throw new Error('Invalid phone format');
      }

      const query = `
        UPDATE users 
        SET 
          email = COALESCE($2, email),
          first_name = COALESCE($3, first_name),
          last_name = COALESCE($4, last_name),
          phone = COALESCE($5, phone),
          address = COALESCE($6, address),
          image = COALESCE($7, image)
        WHERE id = $1
        RETURNING *
      `;
      const values = [
        userId,
        updateData.email,
        updateData.firstName,
        updateData.lastName,
        updateData.phone,
        updateData.address,
        updateData.image,
      ];
      const result = await db.query(query, values);
      return new User(result.rows[0]);
    } catch (err) {
      console.error('Profile update error:', err);
      throw new Error('Failed to update profile');
    }
  }

  static async updatePassword(username, newPassword) {
    try {
      const hashedPassword = this.hashPassword(newPassword);
      const query = 'UPDATE users SET password = $2 WHERE username = $1';
      await db.query(query, [username, hashedPassword]);
    } catch (err) {
      console.error('Password update error:', err);
      throw new Error('Failed to update password');
    }
  }

  static async getCartByUserId(userId) {
    try {
      const query = 'SELECT * FROM carts WHERE customer_id = $1';
      const result = await db.query(query, [userId]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.error('Get cart error:', err);
      throw new Error('Failed to fetch cart');
    }
  }

  static async getUserDetailByID(id) {
    try {
      const result = await db.query(
        'SELECT view_profile(select username from users where id = $1)',
        [id]
      );
      return result.rows[0]; // Can be use flexible with specific userid or just * for all user
    } catch (error) {
      throw error;
    }
  }

  static async getAllUser() {
    try {
      const result = await db.query(
        'SELECT id,username,email,first_name,last_name,role FROM users'
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
