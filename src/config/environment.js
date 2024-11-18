require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI,
    },
    rapidApi: {
        key: process.env.RAPID_API_KEY,
        host: process.env.RAPID_API_HOST
    },
    nodeEnv: process.env.NODE_ENV || 'development',
    allowedOrigins: process.env.ALLOWED_ORIGINS || '*'
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'RAPID_API_KEY', 'RAPID_API_HOST'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

module.exports = config;