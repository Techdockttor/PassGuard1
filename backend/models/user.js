// backend/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // Added unique constraint for email
    password: { type: String, required: true },
    token: { type: String, default: null }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
