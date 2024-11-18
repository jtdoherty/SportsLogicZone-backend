// src/utils/scheduler.js
const cron = require('node-cron');
const betService = require('../services/betService');
const logger = require('./logger');

function initializeScheduler() {
  // Run every 5 minutes
  cron.schedule('*/30 * * * *', async () => {
    try {
      logger.info('Running scheduled bet update');
      await betService.updateBets();
    } catch (error) {
      logger.error('Scheduled update failed:', error);
    }
  });
}

module.exports = { initializeScheduler };