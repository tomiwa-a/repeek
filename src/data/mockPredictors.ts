import type { Predictor } from '../types/slips'

export const mockPredictors: Predictor[] = [
  {
    id: '1',
    username: 'ALGO_TRADER_99',
    displayName: 'Quantum Analyst',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=algo1',
    winRate: 68.4,
    totalPredictions: 1242,
    wins: 850,
    losses: 392,
    streak: 5,
    streakType: 'win',
    followers: 12400,
    isPremium: true,
    isFeatured: true,
    specialties: ['SOCCER_ALPHA', 'VOLATILITY_HEDGE']
  },
  {
    id: '2',
    username: 'SHARP_REPEEKER',
    displayName: 'Dark Pool Expert',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sharp',
    winRate: 72.1,
    totalPredictions: 450,
    wins: 325,
    losses: 125,
    streak: 3,
    streakType: 'win',
    followers: 8500,
    isPremium: true,
    isFeatured: true,
    specialties: ['NBA_MATRIX', 'PROPS_ARBITRAGE']
  },
  {
    id: '3',
    username: 'BET_COMMANDER',
    displayName: 'The Signal Lord',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=commander',
    winRate: 61.8,
    totalPredictions: 3200,
    wins: 1980,
    losses: 1220,
    streak: 2,
    streakType: 'loss',
    followers: 45000,
    isPremium: false,
    isFeatured: false,
    specialties: ['GLOBAL_FOOTBALL', 'PARLAY_ENGINE']
  },
  {
    id: '4',
    username: 'WHALE_WATCHER',
    displayName: 'Liquidity Hunter',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=whale',
    winRate: 65.5,
    totalPredictions: 890,
    wins: 583,
    losses: 307,
    streak: 8,
    streakType: 'win',
    followers: 15600,
    isPremium: true,
    isFeatured: true,
    specialties: ['HIGH_STAKES_ML', 'MARKET_INEFFICIENCY']
  }
]
