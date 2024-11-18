// server.js
const app = require('./src/app');
const config = require('./src/config/environment');
const logger = require('./src/utils/logger');
const { connectDatabase } = require('./src/config/database');
const { initializeScheduler } = require('./src/utils/scheduler');

async function startServer() {
  try {
    logger.info('Starting server...');
    logger.info(`Environment: ${process.env.NODE_ENV}`);
    
    await connectDatabase();
    initializeScheduler();
    const server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });

    server.on('error', (error) => {
      logger.error('Server error:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();