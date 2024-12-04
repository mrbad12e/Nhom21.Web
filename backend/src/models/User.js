const db = require('../config/database');
const crypto = require('crypto');

class User {
  constructor(data) {
    const errors = User.validate(data);
    if (errors.length > 0) {
        throw new Error(`Invalid user data: ${errors.join(', ')}`);
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
    const errors = [];

    if (!user.username) errors.push("Username is required");
    if (!user.email) errors.push("Email is required");
    else if (!this.validateEmail(user.email)) errors.push("Email is invalid");
    
    if (!user.password) errors.push("Password is required");
    if (!user.first_name) errors.push("First name is required");
    if (!user.last_name) errors.push("Last name is required");

    if (user.role && !['ADMIN', 'CUSTOMER'].includes(user.role)) {
        errors.push("Role must be 'ADMIN' or 'CUSTOMER'");
    }

    if (user.phone && !this.validatePhone(user.phone)) {
        errors.push("Phone number is invalid");
    }

    return errors;
}

static validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return email ? emailRegex.test(email) : false;
}

static validatePhone(phone) {
    const phoneRegex = /^0[0-9]{9}$/;
    return phone ? phoneRegex.test(phone) : false;
}

    

    static async signIn(username, password) {
        try {
            const query = 'SELECT signIn($1, $2) as user_id';
            const result = await db.query(query, [username, password]);
            // console.log(result[0].user_id);
            return result[0].user_id;
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    static async createAccount(data) {
        try {
            const query = `
        select create_account($1, $2, $3, $4, $5)`;
            const values = [
                data.username,
                data.password,
                data.email,
                data.firstName,
                data.lastName
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
}

module.exports = User;