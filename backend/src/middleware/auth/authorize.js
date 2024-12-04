const jwt = require('jsonwebtoken');

// Middleware to check if the user is an admin
function authorizeAdmin(req, res, next) {
  // Get the token from cookies (or headers)
  const token =
    req.cookies.accessToken ||
    (req.header('Authorization') &&
    req.header('Authorization').startsWith('Bearer ')
      ? req.header('Authorization').replace('Bearer ', '')
      : '');

  if (!token) {
    return res.status(401).send('No token provided');
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid or expired token');
    }

    // Check if the role is 'admin'
    if (decoded.role !== 'admin') {
      return res.status(403).send('Forbidden: Admins only');
    }

    // Attach the user to the request object for use in the route handler
    req.user = decoded; // Optionally attach user data to the request object
    next();
  });
}

module.exports = authorizeAdmin;
