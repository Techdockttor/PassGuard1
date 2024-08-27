// backend/controllers/passwordManagement.js

const Password = require('../models/password'); // Ensure your model is imported

// Example implementation of generatePassword function
const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
};

// Controller functions
module.exports = {
    createPassword: async (req, res) => {
        try {
            const { title, description, start_date, end_date } = req.body;
            const newPassword = new Password({ title, description, start_date, end_date });
            await newPassword.save();
            res.status(201).json(newPassword);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllPasswords: async (req, res) => {
        try {
            const passwords = await Password.find();
            res.status(200).json(passwords);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deletePassword: async (req, res) => {
        try {
            const { id } = req.params;
            const password = await Password.findById(id);
            if (!password) {
                return res.status(404).json({ message: 'Password not found' });
            }
            await password.remove();
            res.status(200).json({ message: 'Password deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updatePasswordStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const password = await Password.findById(id);
            if (!password) {
                return res.status(404).json({ message: 'Password not found' });
            }
            password.status = status; // Adjust according to your schema
            await password.save();
            res.status(200).json({ message: 'Password status updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    savePasswordToDatabase: async (req, res) => {
        try {
            const { title, description, start_date, end_date } = req.body;
            const generatedPassword = generatePassword(); // Generate a password
            const newPassword = new Password({
                title,
                description,
                start_date,
                end_date,
                generatedPassword
            });
            await newPassword.save();
            res.status(201).json(newPassword);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
