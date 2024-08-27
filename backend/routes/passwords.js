const express = require('express');
const router = express.Router();
const passwordManagement = require('../controllers/passwordManagement'); // Import the correct controller

// Define routes
router.post('/passwords', passwordManagement.createPassword); // Ensure createPassword is a function
router.get('/passwords', passwordManagement.getAllPasswords); // Ensure getAllPasswords is a function
router.delete('/passwords/:id', passwordManagement.deletePassword); // Ensure deletePassword is a function
router.put('/passwords/:id/status', passwordManagement.updatePasswordStatus); // Ensure updatePasswordStatus is a function
router.post('/passwords/save', passwordManagement.savePasswordToDatabase); // Ensure savePasswordToDatabase is a function

module.exports = router;
