// backend/controllers/user/updateUser.js
const User = require('../../models/user'); // Import User model
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    if (username) user.username = username;
    if (email) user.email = email;

    if (password) {
      // Hash the new password
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
};

module.exports = updateUser;
