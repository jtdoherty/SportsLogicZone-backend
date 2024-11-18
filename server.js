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
    
    try {
      await connectDatabase();
    } catch (error) {
      logger.error('Database connection failed:', error);
    }

    if (process.env.RAPID_API_KEY && process.env.RAPID_API_HOST) {
      initializeScheduler();
    } else {
      logger.warn('Scheduler not initialized due to missing API credentials');
    }

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
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
}

startServer();