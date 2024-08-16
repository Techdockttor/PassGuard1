const express = require('express');
const router = express.Router();

// Controllers
const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');

const passwordCreateController = require('../controller/passwords/createPassword');
const passwordGetAllController = require('../controller/passwords/getAllPasswords');
const passwordDeleteController = require('../controller/passwords/deletePassword');
const passwordUpdateStatusController = require('../controller/passwords/updatePasswordStatus');
const passwordGenerateController = require('../controller/passwords/generatePassword');

// Middleware
const authToken = require('../middleware/authToken');

// API 0: User Authentication and Management
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// API 1: Admin Panel - User Management
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// API 2: Password Management
router.post("/passwords", authToken, passwordCreateController);
router.get("/passwords", authToken, passwordGetAllController);
router.delete("/passwords/:id", authToken, passwordDeleteController);
router.put("/passwords/:id/status", authToken, passwordUpdateStatusController);
router.get("/passwords/generate", authToken, passwordGenerateController);

module.exports = router;
