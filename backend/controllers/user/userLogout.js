const User = require('../../models/user'); // User Model

const userLogout = async (req, res) => {
  const { id } = req.user;

  try {
    // Find the user with their ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Simply respond with success
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Error logging out user', error });
  }
};

module.exports = userLogout;
