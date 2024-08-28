const express = require('express');
const asyncHandler = require('express-async-handler');
const { authToken } = require('../middleware/authMiddleware');
const passwordManagementRoutes = require('./passwordManagement');

const router = express.Router();

// User Authentication Routes
router.post('/signup', asyncHandler(require('../controllers/user/userSignUp')));
router.post('/signin', asyncHandler(require('../controllers/user/userSignIn')));
router.get('/user-details/:id', authToken, asyncHandler(require('../controllers/user/userDetails')));
router.post('/logout', authToken, asyncHandler(require('../controllers/user/userLogout')));

// Admin Panel - User Management
router.get('/all-user', authToken, asyncHandler(require('../controllers/user/allUsers')));
router.put('/update-user/:id', authToken, asyncHandler(require('../controllers/user/updateUser')));

// Password Management Routes
router.use('/passwords', passwordManagementRoutes);

module.exports = router;
