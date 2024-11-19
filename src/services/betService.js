// src/services/betService.js
const Bet = require('../models/Bet');
const rapidApiService = require('./rapidApiService');
const logger = require('../utils/logger');

class BetService {
  async updateBets() {
    try {
      const data = await rapidApiService.fetchAdvantages();
      logger.info('Fetched advantages data:', { count: data.advantages?.length || 0 });
      
      if (data.advantages && data.advantages.length > 0) {
        const bets = data.advantages.map(advantage => {
          const outcomes = advantage.outcomes || [];
          const participant = outcomes[0]?.participant;
          const implied_probability = advantage.marketStatistics?.[0]?.value;
          const outcome_payout = outcomes[0]?.payout;

          let profit_potential = null;
          let EV = null;

          if (implied_probability !== null && outcome_payout !== null) {
            profit_potential = (outcome_payout - 1) * 100;
            const implied_probability_decimal = implied_probability / 100;
            EV = (implied_probability_decimal * profit_potential) - 
                 ((1 - implied_probability_decimal) * 100);
          }

          return {
            key: advantage.key,
            edge: advantage.type,
            lastFoundAt: advantage.lastFoundAt,
            type: advantage.market.type,
            market_name: advantage.market.event.name,
            participants: advantage.market.event.participants.map(p => p.name),
            outcome_payout,
            source: outcomes[0]?.source,
            participant: participant?.name,
            sport: participant?.sport,
            implied_probability,
            profit_potential,
            EV,
            event_start_time: advantage.market.event.startTime,
            competition_instance_name: advantage.market.event.competitionInstance?.name
          };
        });

        logger.info('Attempting to write to MongoDB:', { betCount: bets.length });
        
        const result = await Bet.bulkWrite(
          bets.map(bet => ({
            updateOne: {
              filter: { key: bet.key },
              update: { $set: bet },
              upsert: true
            }
          }))
        );
        
        logger.info('MongoDB bulkWrite result:', result);
        return bets;
      }
      
      logger.info('No advantages available');
      return [];
    } catch (error) {
      logger.error('Error updating bets:', error);
      throw error;
    }
  }

  async getBets() {
    try {
      return await Bet.find()
        .sort({ EV: -1 })
        .exec();
    } catch (error) {
      logger.error('Error fetching bets:', error);
      throw error;
    }
  }
}

module.exports = new BetService();