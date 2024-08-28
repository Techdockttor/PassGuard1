const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to check JWT token
function authToken(req, res, next) {
  // Get token
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
}

module.exports = { authToken };
