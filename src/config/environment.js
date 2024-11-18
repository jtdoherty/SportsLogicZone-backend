require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sports-logic-zone',
    },
    rapidApi: {
        key: process.env.RAPID_API_KEY || '',
        host: process.env.RAPID_API_HOST || 'sportsbook-api2.p.rapidapi.com'
    },
    nodeEnv: process.env.NODE_ENV || 'development',
    allowedOrigins: process.env.ALLOWED_ORIGINS || '*'
};

// Modify validation to warn instead of throw
const requiredEnvVars = ['MONGODB_URI', 'RAPID_API_KEY', 'RAPID_API_HOST'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missingEnvVars.join(', ')}`);
}

module.exports = config;