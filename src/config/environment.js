require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    rapidApi: {
        key: process.env.RAPID_API_KEY,
        host: process.env.RAPID_API_HOST
    }
};