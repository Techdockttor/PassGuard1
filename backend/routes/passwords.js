// backend/routes/passwords.js
const express = require('express');
const createPassword = require('../controllers/passwords/createPassword');
const getAllPasswords = require('../controllers/passwords/getAllPasswords');
const deletePassword = require('../controllers/passwords/deletePassword');
const updatePasswordStatus = require('../controllers/passwords/updatePasswordStatus');
const { savePasswordToDatabase } = require('../controllers/passwords/passwordGenerator');

const router = express.Router();

// Route to create a password
router.post('/create', createPassword);

// Route to get all passwords
router.get('/', getAllPasswords);

// Route to delete a password
router.delete('/:id', deletePassword);

// Route to update password status
router.put('/:id/status', updatePasswordStatus);

// Route to generate and save a password
router.post('/generate', savePasswordToDatabase);

module.exports = router;
