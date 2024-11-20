const jwt = require('jsonwebtoken');
const authService = require('../../services/auth.service');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const admin = await authService.validateAdminCredentials(
      username,
      password
    );

    if (!admin) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials or not an admin.' });
    }

    const accessToken = authService.generateAccessToken(admin);
    //const refreshToken = authService.generateRefreshToken(admin); //Cancel forgot no redis used

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      // refreshToken,
    });
  } catch (err) {
    //console.log(err);
    next(err);
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Admin logged out.' });
};

//  exports.refreshToken = (req, res) => {
//    const { refreshToken } = req.body;

//    if (!refreshToken) {
//      return res.status(400).json({ error: 'Refresh token is required.' });
//    }

//    try {
//      const newAccessToken = authService.refreshAccessToken(refreshToken);
//      res.json({
//        message: 'Token refreshed successfully.',
//        accessToken: newAccessToken,
//      });
//    } catch (err) {
//      console.error(err.message);
//      next(err);
//    }
//  };
// ``
