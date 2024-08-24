const bcrypt = require('bcrypt');
const path = require('path');

// Resolve the path to the User model
const userModelPath = path.resolve(__dirname, '../../models/user');
console.log("Resolved User model path:", userModelPath);

// Import the User model using the resolved path
const User = require(userModelPath);

const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Error signing up user', error });
  }
};

module.exports = userSignUp;
