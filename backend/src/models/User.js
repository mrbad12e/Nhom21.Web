const db = require('../config/database');

class User {
    static async signIn(username, password) {
        try {
            const query = 'SELECT signIn($1, $2)';
            return await db.query(query, [username, password]);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async createAccount(data) {
        try {
            const query = `select create_account($1, $2, $3, $4, $5) as user`;
            const values = [data.username, data.password, data.email, data.firstName, data.lastName];
            await db.query(query, values);
            return true;
        } catch (err) {
            throw new Error('Failed to create account');
        }
    }

    static async updateProfile(userId, updateData) {
        const query = 'select update_profile($1, $2, $3, $4, $5, $6, $7)';
        const values = [
            userId,
            updateData.email,
            updateData.firstName,
            updateData.lastName,
            updateData.phone,
            updateData.address,
            updateData.image,
        ];
        await db.query(query, values);
    }

    static async updatePassword(userData) {
        try {
            const query = 'select update_password($1, $2, $3)';
            await db.query(query, [userData.user, userData.oldPassword, userData.newPassword]);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async getUserDetailByID(id) {
        try {
            const result = await db.query('SELECT view_profile(select username from users where id = $1)', [id]);
            return result.rows[0]; // Can be use flexible with specific userid or just * for all user
        } catch (error) {
            throw error;
        }
    }

    static async getAllUser() {
        try {
            const result = await db.query('SELECT view_all_profiles()');
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
