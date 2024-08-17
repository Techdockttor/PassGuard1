const path = require('path');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import MongoDB connection
const User = require('./models/user'); // Import your User model
const Password = require('./models/password'); // Import your Password model
const generatePassword = require('./passwordGenerator');
const authRouter = require('./routes/auth'); // Import your auth routes
const passwordRouter = require('./routes/passwords'); // Import password routes
const apiRoutes = require('./routes'); // Import your routes

dotenv.config(); // Load environment variables

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://127.0.0.1:4000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files

// Main Browser Page Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'profile.html'));
});

app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'Password.html'));
});

app.get('/sign-up', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sign-up.html'));
});

app.get('/sign-in', (req, res) => {
  res.sendFile(path.join(__dirname, 'sign-in.html'));
});

// API Routes
app.use('/api/auth', authRouter); // Authentication-related routes
app.use('/api/passwords', passwordRouter); // Password management routes
app.use('/api', apiRoutes); // Mount the API routes at the /api path

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Connect to the Database and Start the Server
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Connected to the database`);
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1); // Exit Failure
});

// Test DB
app.get('/test-db', async (req, res) => {
  try {
    const connectionState = mongoose.connection.readyState; // 1 = connected, 0 = disconnected
    if (connectionState === 1) {
      return res.status(200).json({ message: 'Database connected successfully' });
    } else {
      return res.status(500).json({ message: 'Database not connected' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error checking database connection' });
  }
});
