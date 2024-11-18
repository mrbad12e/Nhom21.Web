const { Client } = require('pg');

// Kết nối với cơ sở dữ liệu PostgreSQL
const client = new Client({
  host: 'pg-27acab61-ntnghia9a7-4e14.h.aivencloud.com',
  port: 24259,
  database: 'store',
  user: 'avnadmin',
  password: 'AVNS_lHjfoRsc9cYDtvcka-5'
});

// Kết nối cơ sở dữ liệu
client.connect();

// Hàm đăng nhập
async function signIn(username, password) {
  try {
    const result = await client.query('SELECT * FROM signIn($1, $2)', [username, password]);
    
    if (result.rows.length > 0) {
      return true; // Đăng nhập thành công
    } else {
      return false; // Sai tài khoản hoặc mật khẩu
    }
  } catch (err) {
    console.error('Lỗi khi gọi hàm đăng nhập:', err);
    return false;
  }
}

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
    throw err; // Quay lại lỗi nếu có
  }
}

module.exports = { signIn, createAccount };
