const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

// Resolve the path to the User model
const userModelPath = path.resolve(__dirname, '../../models/User');
console.log("Resolved User model path:", userModelPath);

// Import the User model using the resolved path
const User = require(userModelPath);

const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET, // Ensure you have a JWT_SECRET set in your environment variables
      { expiresIn: '1h' }
    );

    // Send back the token and user details
    res.status(200).json({ message: 'Sign-in successful', token, user: existingUser });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ message: 'Error signing in user', error });
  }
};

module.exports = userSignIn;
