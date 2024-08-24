// backend/controllers/passwords/passwordGenerator.js
const Password = require('../../models/password'); // Import Mongoose model

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
const numbers = '0123456789'.split('');
const symbols = '!@£%^&*+#'.split('');

// Function to generate a password
function generatePassword(noLetters, noNumbers, noSymbols) {
  let passwordList = [];

  for (let i = 0; i < noLetters; i++) {
    passwordList.push(letters[Math.floor(Math.random() * letters.length)]);
  }

  for (let i = 0; i < noNumbers; i++) {
    passwordList.push(numbers[Math.floor(Math.random() * numbers.length)]);
  }

  for (let i = 0; i < noSymbols; i++) {
    passwordList.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }

  // Shuffle the password list
  for (let i = passwordList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordList[i], passwordList[j]] = [passwordList[j], passwordList[i]];
  }

  return passwordList.join(''); // Return generated password
}

// Controller function to generate and save password
const savePasswordToDatabase = async (req, res) => {
  const { title, description, noLetters, noNumbers, noSymbols } = req.body;

  try {
    // Generate the password
    const generatedPassword = generatePassword(noLetters, noNumbers, noSymbols);

    // Set start and end dates
    const start_date = new Date();
    const end_date = new Date(start_date.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    // Save password to MongoDB using Mongoose
    const newPassword = new Password({
      title,
      description,
      start_date,
      end_date,
      password: generatedPassword,
    });

    await newPassword.save();
    res.status(201).json({ message: 'Password saved to database', data: newPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error generating or saving password', error });
  }
};

module.exports = {
  generatePassword,
  savePasswordToDatabase,
};
