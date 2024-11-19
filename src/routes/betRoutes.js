// src/routes/betRoutes.js
const express = require('express');
const betController = require('../controllers/betController');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', betController.getBets);
router.post('/update', betController.updateBets);

// Add health check endpoint
router.get('/health', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStates = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    
    res.json({
        status: 'ok',
        timestamp: new Date(),
        mongodb: {
            state: dbStates[dbState],
            connected: dbState === 1
        }
    });
});

module.exports = router;