// src/app.js
const express = require('express');
const cors = require('cors');
const betRoutes = require('./routes/betRoutes');
const errorHandler = require('./middleware/errorHandler');
const scheduler = require('./utils/scheduler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bets', betRoutes);

// Error handling
app.use(errorHandler);

// Start scheduler
scheduler.initializeScheduler();

module.exports = app;