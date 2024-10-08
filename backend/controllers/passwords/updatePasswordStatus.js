// backend/controllers/passwords/updatePasswordStatus.js
const Password = require('../../models/password');

const updatePasswordStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const password = await Password.findById(id);
    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }

    password.status = status;
    await password.save();

    res.status(200).json({ message: 'Password status updated successfully', data: password });
  } catch (error) {
    console.error('Error updating password status:', error);
    res.status(500).json({ message: 'Error updating password status', error });
  }
};

module.exports = updatePasswordStatus;
