const User = require('../../models/user'); // User Model

const allUsers = async (req, res) => {
  try {
    // Retrieve all users
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

module.exports = allUsers;
