// server.js
const app = require('./src/app');
const config = require('./src/config/environment');
const logger = require('./src/utils/logger');
const { connectDatabase } = require('./src/config/database');
const { initializeScheduler } = require('./src/utils/scheduler');

async function startServer() {
  try {
    await connectDatabase();
    initializeScheduler();
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();