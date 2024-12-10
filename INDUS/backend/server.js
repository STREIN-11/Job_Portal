const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Environment variables
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/jobPortal';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const jobRoutes = require('./routes/jobRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Routes
app.use('/api/jobs', jobRoutes);       // For job-related routes
app.use('/api', profileRoutes);        // For profile-related routes

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
