const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming your user model is in the models directory

async function authToken(req, res, next) {
  try {
    // Get the token from the cookies or the Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    // If no token is provided, respond with an error
    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token",
          error: true,
          success: false
        });
      }

      // Extract user ID from the decoded token
      const userId = decoded.userId;

      try {
        // Find the user in MongoDB
        const user = await User.findById(userId);

        // If user does not exist, respond with an error
        if (!user) {
          return res.status(404).json({
            message: "User not found",
            error: true,
            success: false
          });
        }

        // Attach user information to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
      } catch (dbError) {
        return res.status(500).json({
          message: "Database error while finding user",
          error: true,
          success: false
        });
      }
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false
    });
  }
}

module.exports = authToken;
