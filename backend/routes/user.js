const express = require('express');
const userSignUp = require('../controllers/user/userSignUp');
const userSignIn = require('../controllers/user/userSignIn');
const userDetails = require('../controllers/user/userDetails');
const userLogout = require('../controllers/user/userLogout');
const allUsers = require('../controllers/user/allUsers');
const updateUser = require('../controllers/user/updateUser');
const { authToken } = require('../middleware/authMiddleware');

const router = express.Router();

// User sign-up
router.post('/signup', userSignUp);

// User sign-in
router.post('/signin', userSignIn);

// Get user details by ID
router.get('/:id', authToken, userDetails);

// User logout
router.post('/logout', userLogout);

// Get all users
router.get('/', authToken, allUsers);

// Update user by ID
router.put('/:id', authToken, updateUser);

module.exports = router;
