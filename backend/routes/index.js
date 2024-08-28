const express = require('express');
const asyncHandler = require('express-async-handler');
const { authToken } = require('../middleware/authMiddleware');

// Import controllers
const userSignUp = require('../controllers/user/userSignUp');
const userSignIn = require('../controllers/user/userSignIn');
const userDetails = require('../controllers/user/userDetails');
const userLogout = require('../controllers/user/userLogout');
const allUsers = require('../controllers/user/allUsers');
const updateUser = require('../controllers/user/updateUser');
const passwordController = require('../controllers/passwordController');

const router = express.Router();

// User Authentication Routes
router.post('/signup', asyncHandler(userSignUp));
router.post('/signin', asyncHandler(userSignIn));
router.get('/user-details/:id', authToken, asyncHandler(userDetails));
router.post('/logout', authToken, asyncHandler(userLogout));

// Admin Panel - User Management
router.get('/all-user', authToken, asyncHandler(allUsers));
router.put('/update-user/:id', authToken, asyncHandler(updateUser));

// Password Management Routes
router.post('/passwords', authToken, asyncHandler(passwordController.createPassword));
router.get('/passwords', authToken, asyncHandler(passwordController.getAllPasswords));
router.delete('/passwords/:id', authToken, asyncHandler(passwordController.deletePasswordById));
router.put('/passwords/:id/status', authToken, asyncHandler(passwordController.updatePasswordStatus));
router.post('/passwords/generate', authToken, asyncHandler(passwordController.generateAndSavePassword));

module.exports = router;
