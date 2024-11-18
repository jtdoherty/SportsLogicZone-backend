const express = require('express');
const cors = require('cors');
const betRoutes = require('./routes/betRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Enable CORS for all routes in development
if (process.env.NODE_ENV === 'development') {
    app.use(cors());
} else {
    // In production, specify allowed origins
    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS || '*'
    }));
}

app.use(express.json());
app.use('/api/bets', betRoutes);
app.use(errorHandler);

module.exports = app;