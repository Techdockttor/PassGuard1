const express = require('express');
const router = express.Router();
const { savePasswordToDatabase } = require('../controllers/passwords/passwordsGenerator');
const passwordCreateController = require('../controllers/passwords/createPassword');
const passwordGetAllController = require('../controllers/passwords/getAllPasswords');
const passwordDeleteController = require('../controllers/passwords/deletePassword');
const passwordUpdateStatusController = require('../controllers/passwords/updatePasswordStatus');
const authToken = require('../middleware/authToken');

// Password Management Routes
router.post("/", authToken, passwordCreateController);
router.get("/", authToken, passwordGetAllController);
router.delete("/:id", authToken, passwordDeleteController);
router.put("/:id/status", authToken, passwordUpdateStatusController);
router.post("/generate", authToken, savePasswordToDatabase);

module.exports = router;
