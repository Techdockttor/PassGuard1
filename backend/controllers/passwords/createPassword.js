// backend/controllers/passwords/createPassword.js
const Password = require('../../models/Password');
const { generatePassword } = require('../passwordGenerator'); // Import password generation logic

const createPassword = async (req, res) => {
  const { title, description, noLetters, noNumbers, noSymbols } = req.body;

  try {
    // Generate the password
    const generatedPassword = generatePassword(noLetters, noNumbers, noSymbols);

    // Set the start and end dates
    const start_date = new Date();
    const end_date = new Date(start_date.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    // Create the password entry in MongoDB
    const newPassword = new Password({
      title,
      description,
      start_date,
      end_date,
      password: generatedPassword,
    });

    await newPassword.save();
    res.status(201).json({ message: 'Password created successfully', data: newPassword });
  } catch (error) {
    console.error('Error creating password:', error);
    res.status(500).json({ message: 'Error creating password', error });
  }
};

module.exports = createPassword;
