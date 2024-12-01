const { Client } = require('pg');
require('dotenv').config();

// Kết nối với cơ sở dữ liệu PostgreSQL
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

client.connect();

// Hàm đăng nhập
async function signIn(username, password) {
  try {
    const result = await client.query('SELECT * FROM signIn($1, $2)', [username, password]);
    
    if (result.rows.length > 0) {
      return true; // Đăng nhập thành công
    } else {
      return false; // Đăng nhập thất bại
    }
  } catch (err) {
    console.error('Lỗi khi gọi hàm đăng nhập:', err);
    return false;
  } finally {
    await client.end();
  }
}

module.exports = { signIn };

// Hàm tạo tài khoản người dùng mới
async function createAccount(username, password, email, firstName, lastName, role = 'CUSTOMER', phone = null, address = null, image = null) {
    try {
      const result = await client.query('SELECT create_account($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
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
    } finally {
      await client.end();
    }
  }
  
  module.exports = { createAccount };
