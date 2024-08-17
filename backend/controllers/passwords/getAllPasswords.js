// backend/controllers/passwords/getAllPasswords.js
const Password = require('../../models/Password');

const getAllPasswords = async (req, res) => {
  try {
    const passwords = await Password.find();
    res.status(200).json(passwords);
  } catch (error) {
    console.error('Error retrieving passwords:', error);
    res.status(500).json({ message: 'Error retrieving passwords', error });
  }
};

module.exports = getAllPasswords;
