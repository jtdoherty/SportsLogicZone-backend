// src/controllers/betController.js
const betService = require('../services/betService');

class BetController {
  async getBets(req, res, next) {
    try {
      const bets = await betService.getBets();
      res.json(bets);
    } catch (error) {
      next(error);
    }
  }

  async updateBets(req, res, next) {
    try {
      const bets = await betService.updateBets();
      res.json(bets);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BetController();