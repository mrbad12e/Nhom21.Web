const db = require('../config/database');

class User {
  constructor(data) {
    if (!User.validate(data)) {
      throw new Error("Invalid user data");
    }
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.firstName = data.first_name || data.firstName;
    this.lastName = data.last_name || data.lastName;
    this.role = data.role;
    this.createdAt = data.created_at || data.createdAt;
  }

  static validate(user) {
    return !!(
      user.id &&
      user.username &&
      user.email &&
      user.password &&
      user.first_name &&
      user.last_name &&
      ['ADMIN', 'CUSTOMER'].includes(user.role)
    );
  }

  static async signIn(username, password) {
    try {
      const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
      const result = await db.query(query, [username, password]);
      
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.error('Login error:', err);
      throw new Error('Login failed');
    }
  }

  static async createAccount(data) {
    try {
      const query = `
        INSERT INTO users 
        (id, username, password, email, first_name, last_name, role) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *
      `;
      const values = [
        data.id,
        data.username,
        data.password,
        data.email,
        data.firstName,
        data.lastName,
        data.role || 'CUSTOMER'
      ];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Account creation error:', err);
      throw new Error('Failed to create account');
    }
  }

  static async updateProfile(userId, updateData) {
    try {
      const query = `
        UPDATE users 
        SET 
          email = COALESCE($2, email),
          first_name = COALESCE($3, first_name),
          last_name = COALESCE($4, last_name)
        WHERE id = $1
        RETURNING *
      `;
      const values = [
        userId, 
        updateData.email, 
        updateData.firstName, 
        updateData.lastName
      ];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Profile update error:', err);
      throw new Error('Failed to update profile');
    }
  }
}

module.exports = User;