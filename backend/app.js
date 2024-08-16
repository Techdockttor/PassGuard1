const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const User = require('./models/user'); // Import your User model
const db = require('./config/db'); // Import MongoDB connection
const authRouter = require('./routes/auth'); // Example router file
const config = require('./controllers/config');
const router = require('./routes');
const { createNginxConfig } = require('./config/nginxConfig'); // Import the utility function

dotenv.config(); // Load environment variables from .env file

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://127.0.0.1:4000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
};

app.use(cors(corsOptions));

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Browser Page Routes
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
app.use('/api/auth', authRouter);
app.use('/api/passwords', passwordRouter);
app.use('/api/',router);

// Route for creating Nginx config and DNS record
//app.post('/create-nginx-config', (req, res) => {
  //const { domain, publicFolder, zoneId, recordId, ip } = req.body;

  // Create Nginx config
  //createNginxConfig(domain, publicFolder, (error, message) => {
    //if (error) {
      //return res.status(500).json({ error });
    //}

    // Add DNS record
    //addDnsRecord(zoneId, recordId, domain, ip, (err, dnsMessage) => {
      //if (err) {
        //return res.status(500).json({ error: err });
      //}

      //res.status(200).json({ message: `${message}. ${dnsMessage}` });
    //});
  //});

// Update host and port
//const host = '127.0.0.1';
const port = 4000 || process.env.port;

// Start the Express app
app.listen(port, () => {
  console.log(`Server is running on http://${port} (Press CTRL+C to quit)`);
  console.log('Starting server...'+port);
});
