// src/models/Bet.js
const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  edge: { type: String, required: true },
  lastFoundAt: { type: Date, required: true },
  type: { type: String, required: true },
  market_name: { type: String, required: true },
  participants: [{ type: String }],
  outcome_payout: { type: Number },
  source: { type: String },
  participant: { type: String },
  sport: { type: String },
  implied_probability: { type: Number },
  profit_potential: { type: Number },
  EV: { type: Number },
  event_start_time: { type: Date },
  competition_instance_name: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bet', betSchema);