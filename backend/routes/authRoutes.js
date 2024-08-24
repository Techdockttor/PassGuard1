const express = require('express');
const router = express.Router();
const userSignUpController = require('../controllers/user/userSignUp');
const userSignInController = require('../controllers/user/userSignIn');
const userLogout = require('../controllers/user/userLogout');
const userDetailsController = require('../controllers/user/userDetails');
const authToken = require('../middleware/authToken');

// User Authentication Routes
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/logout", userLogout);
router.get("/user-details", authToken, userDetailsController);

module.exports = router;
