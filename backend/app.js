const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user'); 
const passwordRouter = require('./routes/passwords');

dotenv.config(); // Load environment variables

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:4000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, '../public')));

// Main Browser Page Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/landing.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/profile.html'));
});

app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/Password.html'));
});

app.get('/sign-up', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/Sign-up.html'));
});

app.get('/sign-in', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/sign-in.html'));
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter); 
app.use('/api/passwords', passwordRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Connect to the Database and Start the Server
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to the database`);
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1); // Exit Failure
  });

module.exports = app; // App for testing
