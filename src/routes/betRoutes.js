// src/routes/betRoutes.js
const express = require('express');
const betController = require('../controllers/betController');

const router = express.Router();

router.get('/', betController.getBets);
router.post('/update', betController.updateBets);

module.exports = router;