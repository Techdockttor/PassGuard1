const Password = require('../../models/password');
const generatePassword = require('../../utils/generatePassword');

const savePasswordToDatabase = async (req, res) => {
  try {
    const { noLetters, noNumbers, noSymbols, title, description, start_date, end_date } = req.body;

    // Generate the password
    const generatedPassword = generatePassword(noLetters, noNumbers, noSymbols);

    // Create a new password document
    const newPassword = new Password({
      title,
      description,
      start_date,
      end_date,
      password: generatedPassword,
      status: 'active'
    });

    // Save to the database
    await newPassword.save();

    res.status(201).json({
      message: 'Password created successfully!',
      password: newPassword
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create password' });
  }
};

module.exports = savePasswordToDatabase;
