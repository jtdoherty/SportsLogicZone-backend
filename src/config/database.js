// src/config/database.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');

// MongoDB Atlas connection function
async function connectDatabase() {
    try {
        // Your MongoDB Atlas connection string should look like this:
        // mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            logger.warn('MongoDB Atlas URI is not defined in environment variables');
            return; // Don't exit, just return
        }

        const options = {
            retryWrites: true,
            w: 'majority',
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryReads: true,
            connectTimeoutMS: 10000,
        };

        await mongoose.connect(mongoURI, options);
        logger.info('Successfully connected to MongoDB Atlas');

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            logger.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected');
        });

        // Handle application termination
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                logger.info('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (err) {
                logger.error('Error closing MongoDB connection:', err);
                process.exit(1);
            }
        });

    } catch (error) {
        logger.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }
}

module.exports = { connectDatabase };