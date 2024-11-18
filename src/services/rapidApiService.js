// src/services/rapidApiService.js
const axios = require('axios');
const config = require('../config/environment');
const logger = require('../utils/logger');

class RapidApiService {
  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'x-rapidapi-key': config.rapidApi.key,
        'x-rapidapi-host': config.rapidApi.host
      }
    });
  }

  async fetchAdvantages() {
    try {
      const response = await this.axiosInstance.get(
        'https://sportsbook-api2.p.rapidapi.com/v0/advantages/',
        { params: { type: 'PLUS_EV_AVERAGE' } }
      );
      return response.data;
    } catch (error) {
      logger.error('Error fetching from RapidAPI:', error);
      throw error;
    }
  }
}

module.exports = new RapidApiService();