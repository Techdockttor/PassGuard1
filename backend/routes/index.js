const express = require('express');
const asyncHandler = require('express-async-handler');
const { authToken } = require('../middleware/authMiddleware'); // Assuming you have an authentication middleware
const userController = require('../controllers/userController');
const passwordController = require('../controllers/passwordController');

const router = express.Router();

// User Authentication Routes
router.post('/signup', asyncHandler(userController.signup));
router.post('/signin', asyncHandler(userController.signin));
router.get('/user-details', authToken, asyncHandler(userController.getUserDetails));
router.get('/userLogout', authToken, asyncHandler(userController.logout));

// Admin Panel - User Management
router.get('/all-user', authToken, asyncHandler(userController.getAllUsers));
router.post('/update-user', authToken, asyncHandler(userController.updateUser));

// Password Management Routes
router.post('/passwords', authToken, asyncHandler(passwordController.createPassword));
router.get('/passwords', authToken, asyncHandler(passwordController.getAllPasswords));
router.delete('/passwords/:id', authToken, asyncHandler(passwordController.deletePasswordById));
router.put('/passwords/:id/status', authToken, asyncHandler(passwordController.updatePasswordStatus));
router.post('/passwords/generate', authToken, asyncHandler(passwordController.generateAndSavePassword));

module.exports = router;
