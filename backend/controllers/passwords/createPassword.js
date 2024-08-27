// controllers/passwords/createPassword.js
const { body, validationResult } = require('express-validator');

const createPassword = [
  // Validation middleware
  body('title').isString().notEmpty().withMessage('Title is required.'),
  body('description').isString().notEmpty().withMessage('Description is required.'),
  body('noLetters').isInt({ min: 1 }).withMessage('Number of letters must be at least 1.'),
  body('noNumbers').isInt({ min: 1 }).withMessage('Number of numbers must be at least 1.'),
  body('noSymbols').isInt({ min: 1 }).withMessage('Number of symbols must be at least 1.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, noLetters, noNumbers, noSymbols } = req.body;

    try {
      const generatedPassword = generatePassword(noLetters, noNumbers, noSymbols);

      const start_date = new Date();
      const end_date = new Date(start_date.getTime() + 30 * 24 * 60 * 60 * 1000); 

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
  }
];

module.exports = createPassword;
