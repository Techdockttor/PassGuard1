const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler'); // Import asyncHandler

// Controllers
const userSignUpController = require("../controllers/user/userSignUp");
const userSignInController = require('../controllers/user/userSignIn');
const userDetailsController = require('../controllers/user/userDetails');
const userLogout = require('../controllers/user/userLogout');
const allUsers = require('../controller/users/allUsers');
const updateUser = require('../controller/users/updateUser');

const passwordCreateController = require('../controllers/passwords/createPassword');
const passwordGetAllController = require('../controllers/passwords/getAllPasswords');
const passwordDeleteController = require('../controllers/passwords/deletePassword');
const passwordUpdateStatusController = require('../controllers/passwords/updatePasswordStatus');
const { savePasswordToDatabase } = require('../controllers/passwords/passwordsGenerator'); // Import savePasswordToDatabase

// Middleware
const authToken = require('../middleware/authToken');

// API 0: User Authentication and Management
router.post("/signup", asyncHandler(userSignUpController));
router.post("/signin", asyncHandler(userSignInController));
router.get("/user-details", authToken, asyncHandler(userDetailsController));
router.get("/userLogout", asyncHandler(userLogout));

// API 1: Admin Panel - User Management
router.get("/all-user", authToken, asyncHandler(allUsers));
router.post("/update-user", authToken, asyncHandler(updateUser));

// API 2: Password Management
router.post("/passwords", authToken, asyncHandler(passwordCreateController));
router.get("/passwords", authToken, asyncHandler(passwordGetAllController));
router.delete("/passwords/:id", authToken, asyncHandler(passwordDeleteController));
router.put("/passwords/:id/status", authToken, asyncHandler(passwordUpdateStatusController));
router.post("/passwords/generate", authToken, asyncHandler(savePasswordToDatabase)); // New route for saving generated passwords

module.exports = router;
