const express = require('express');
const router = express.Router();
const Password = require('../models/password');

// Create a new password
router.post('/passwords', async (req, res) => {
  try {
    const { title, description, start_date, end_date, password } = req.body;
    const newPassword = new Password({ title, description, start_date, end_date, password });
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (error) {
    console.error('Error creating password:', error); // Log error for debugging
    res.status(500).json({ error: 'Failed to create password' });
  }
});

// Get all passwords
router.get('/passwords', async (req, res) => {
  try {
    const passwords = await Password.find();
    res.status(200).json(passwords);
  } catch (error) {
    console.error('Error fetching passwords:', error);
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
});

// Delete a password
router.delete('/passwords/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Password.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: 'Password not found' });
    res.status(200).json({ message: 'Password deleted' });
  } catch (error) {
    console.error('Error deleting password:', error);
    res.status(500).json({ error: 'Failed to delete password' });
  }
});

// Update password status
router.put('/passwords/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const password = await Password.findByIdAndUpdate(id, { status }, { new: true });
    if (!password) return res.status(404).json({ error: 'Password not found' });
    res.status(200).json(password);
  } catch (error) {
    console.error('Error updating password status:', error);
    res.status(500).json({ error: 'Failed to update password status' });
  }
});

// Generate a new password
router.post('/passwords/generate', (req, res) => {
  try {
    const generatedPassword = generatePassword(); // Assuming you have a function to generate passwords
    res.status(200).json({ password: generatedPassword });
  } catch (error) {
    console.error('Error generating password:', error);
    res.status(500).json({ error: 'Failed to generate password' });
  }
});

module.exports = router;
