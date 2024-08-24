// backend/routes/user.js
const express = require('express');
const userSignUp = require('../controllers/user/userSignUp');
const userSignIn = require('../controllers/user/userSignIn');
const userDetails = require('../controllers/user/userDetails');
const userLogout = require('../controllers/user/userLogout');
const allUsers = require('../controllers/user/allUsers');
const updateUser = require('../controllers/user/updateUser');

const router = express.Router();

// User sign-up
router.post('/signup', userSignUp);

// User sign-in
router.post('/signin', userSignIn);

// Get user details by ID
router.get('/:id', userDetails);

// User logout
router.post('/logout', userLogout);

// Get all users
router.get('/', allUsers);

// Update user by ID
router.put('/:id', updateUser);

module.exports = router;
