const express = require('express');
const router = express.Router();
const passwordManagement = require('../controllers/passwordManagement');

// Define routes
router.post('/passwords', passwordManagement.createPassword);
router.get('/passwords', passwordManagement.getAllPasswords);
router.delete('/passwords/:id', passwordManagement.deletePassword);
router.put('/passwords/:id/status', passwordManagement.updatePasswordStatus);
router.post('/passwords/save', passwordManagement.savePasswordToDatabase);

module.exports = router;
