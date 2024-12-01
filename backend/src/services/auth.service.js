const jwt = require('jsonwebtoken');
const pool = require('../config/database'); 

exports.validateAdminCredentials = async (username, password, next) => {
  try {
    // Query to validate user credentials using raw SQL (keeping the same query structure)
    const result = await pool.query(
      'SELECT signIn($1, $2) AS is_valid',
      [username, password] 
    );

    const isValid = result.rows[0]?.is_valid;

    if (isValid) {
      const userResult = await pool.query(
        'SELECT id, username, role FROM users WHERE username = $1',
        [username]
      );

      const user = userResult.rows[0];

      if (user.role !== 'ADMIN') {
        const error = new Error('Unauthorized. User is not an admin.');
        error.statusCode = 403;
        return next(error); // Pass error to your error handler middleware
      }

      return user; // Return admin user info
    }
  } catch (err) {
    console.log('Error during admin authentication:', err);
    return next(err); // Pass the error to the middleware
  }
};

exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
};
