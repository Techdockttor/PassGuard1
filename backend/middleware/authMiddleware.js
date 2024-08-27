const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to check JWT token
function authToken(req, res, next) {
  // Get token from cookies or authorization header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Store decoded user data in the request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
}

module.exports = { authToken };
