// backend/controllers/passwords/deletePassword.js
const Password = require('../../models/Password');

const deletePassword = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPassword = await Password.findByIdAndDelete(id);
    if (!deletedPassword) {
      return res.status(404).json({ message: 'Password not found' });
    }
    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (error) {
    console.error('Error deleting password:', error);
    res.status(500).json({ message: 'Error deleting password', error });
  }
};

module.exports = deletePassword;
