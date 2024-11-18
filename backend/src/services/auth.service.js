const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const jwt = require('jsonwebtoken');

exports.validateAdminCredentials = async (username,password) => {
    try {
        const result = await sequelize.query(
            `SELECT signIn(:username, :password) AS is_valid`,
            {
                replacements: {username,password},
                type: QueryTypes.SELECT,
            }
    );

    const isValid = result[0]?.is_valid;

    if(isValid) {
      const user = await sequelize.query(
        `SELECT id,username,role FROM users WHERE username = :username`,
        {
          replacements: { username },
          type: QueryTypes.SELECT,
        }
      );

      if (user.role !== 'ADMIN') {
        throw new Error('Unauthorized. User is not an admin.');
      }

      return user; // Trả về thông tin admin
    }
    } catch(err){
        console.log('Error why authenticate admin:',err);
        
    }
}

exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

exports.generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

exports.refreshAccessToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    return this.generateAccessToken(decoded);
  } catch (err) {
    throw new Error('Invalid or expired refresh token');
  }
};