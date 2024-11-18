// src/config/environment.js
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sports-betting'
    },
    rapidApi: {
        key: process.env.RAPID_API_KEY,
        host: process.env.RAPID_API_HOST
    }
};