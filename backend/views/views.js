const express = require('express');
const path = require('path');
const authToken = require('./middleware/authToken');

const router = express.Router();

// Serve the landing page (public)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'landing.html'));
});

// Serve the profile page (protected)
router.get('/profile', authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;
