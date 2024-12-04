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

// module.exports = User;

// Test the User model methods
User.signIn('ureid', 'admin').then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    db.pool.end();
    console.log('Pool has ended');
})