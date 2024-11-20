const { query } = require('../config/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Kết nối với cơ sở dữ liệu PostgreSQL

// Hàm đăng nhập
// async function signIn(username, password) {
//   try {
//     const result = await query('SELECT * FROM signIn($1, $2)', [username, password]);

//     if (result.rows.length > 0) {
//       return true; // Đăng nhập thành công
//     } else {
//       return false; // Đăng nhập thất bại
//     }
//   } catch (err) {
//     console.error('Lỗi khi gọi hàm đăng nhập:', err);
//     return false;
//   }
// }

// module.exports = { signIn };

// // Hàm tạo tài khoản người dùng mới
// async function createAccount(username, password, email, firstName, lastName, role = 'CUSTOMER', phone = null, address = null, image = null) {
//     try {
//       const result = await client.query('SELECT create_account($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
//         username,
//         password,
//         email,
//         firstName,
//         lastName,
//         role,
//         phone,
//         address,
//         image
//       ]);

//       console.log('Tạo tài khoản thành công');
//     } catch (err) {
//       console.error('Lỗi khi gọi hàm tạo tài khoản:', err.message);
//       throw err;
//     } finally {
//       await client.end();
//     }
//   }

//   module.exports = { createAccount };

//////////////////////////////////////////////////ADMIN'S PART DONOT DELETE///////////////////////////////////////////////////////////////////

exports.validateAdminCredentials = async (username, password) => {
  try {
    // Thực hiện truy vấn để kiểm tra tên đăng nhập và mật khẩu
    const result = await query(`SELECT signIn($1, $2) AS is_valid`, [
      username,
      password,
    ]);

    const isValid = result[0]?.is_valid;

    if (isValid) {
      // Nếu xác thực thành công, lấy thông tin người dùng từ cơ sở dữ liệu
      const user = await query(
        `SELECT id, username, role FROM users WHERE username = $1`,
        [username]
      );

      const adminUser = user[0]; // Lấy người dùng đầu tiên từ kết quả trả về

      if (!adminUser || adminUser.role !== 'ADMIN') {
        throw new Error('Unauthorized. User is not an admin.');
      }

      return adminUser; // Trả về thông tin admin
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (err) {
    throw err;
  }
};

exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m' }
  );
};

// exports.generateRefreshToken = (user) => {
//   return jwt.sign(
//     { id: user.id, username: user.username, role: user.role },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: '7d' }
//   );
// };

// exports.refreshAccessToken = (refreshToken) => {
//   try {
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );
//     return this.generateAccessToken(decoded);
//   } catch (err) {
//     throw new Error('Invalid or expired refresh token');
//   }
// };
