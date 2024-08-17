// backend/controllers/user/userDetails.js
const User = require('../../models/user'); // Import User model

const userDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).json({ message: 'Error retrieving user details', error });
  }
};

module.exports = userDetails;
