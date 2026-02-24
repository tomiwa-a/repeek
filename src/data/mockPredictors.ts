export interface Predictor {
  id: string
  username: string
  displayName: string
  avatar?: string
  winRate: number
  totalPredictions: number
  wins: number
  losses: number
  streak: number
  streakType: 'win' | 'loss'
  followers: number
  isPremium: boolean
  isFeatured: boolean
  specialties: string[]
}

export const mockPredictors: Predictor[] = [
  {
    id: '1',
    username: '@StatsMaster',
    displayName: 'Stats Master',
    winRate: 87.5,
    totalPredictions: 248,
    wins: 217,
    losses: 31,
    streak: 8,
    streakType: 'win',
    followers: 12400,
    isPremium: true,
    isFeatured: true,
    specialties: ['Premier League', 'La Liga']
  },
  {
    id: '2',
    username: '@GoalGuru',
    displayName: 'Goal Guru',
    winRate: 82.3,
    totalPredictions: 176,
    wins: 145,
    losses: 31,
    streak: 5,
    streakType: 'win',
    followers: 8200,
    isPremium: true,
    isFeatured: true,
    specialties: ['Over/Under', 'Champions League']
  },
  {
    id: '3',
    username: '@EPLWizard',
    displayName: 'EPL Wizard',
    winRate: 79.8,
    totalPredictions: 312,
    wins: 249,
    losses: 63,
    streak: 3,
    streakType: 'win',
    followers: 6700,
    isPremium: false,
    isFeatured: true,
    specialties: ['Premier League', 'BTTS']
  },
  {
    id: '4',
    username: '@UnderdogKing',
    displayName: 'Underdog King',
    winRate: 76.4,
    totalPredictions: 189,
    wins: 144,
    losses: 45,
    streak: 2,
    streakType: 'loss',
    followers: 5100,
    isPremium: true,
    isFeatured: false,
    specialties: ['Upsets', 'High Odds']
  },
  {
    id: '5',
    username: '@LaLigaPro',
    displayName: 'La Liga Pro',
    winRate: 81.2,
    totalPredictions: 203,
    wins: 165,
    losses: 38,
    streak: 4,
    streakType: 'win',
    followers: 4800,
    isPremium: true,
    isFeatured: false,
    specialties: ['La Liga', 'Serie A']
  },
  {
    id: '6',
    username: '@BTTSExpert',
    displayName: 'BTTS Expert',
    winRate: 74.5,
    totalPredictions: 267,
    wins: 199,
    losses: 68,
    streak: 6,
    streakType: 'win',
    followers: 3900,
    isPremium: false,
    isFeatured: false,
    specialties: ['BTTS', 'All Leagues']
  },
  {
    id: '7',
    username: '@CleanSheetCaller',
    displayName: 'Clean Sheet Caller',
    winRate: 78.9,
    totalPredictions: 142,
    wins: 112,
    losses: 30,
    streak: 1,
    streakType: 'win',
    followers: 3200,
    isPremium: false,
    isFeatured: false,
    specialties: ['Clean Sheets', 'Defensive Stats']
  },
  {
    id: '8',
    username: '@OddsHunter',
    displayName: 'Odds Hunter',
    winRate: 72.1,
    totalPredictions: 298,
    wins: 215,
    losses: 83,
    streak: 2,
    streakType: 'win',
    followers: 2800,
    isPremium: false,
    isFeatured: false,
    specialties: ['Value Bets', 'Live Betting']
  },
  {
    id: '9',
    username: '@ChampionsLeagueKing',
    displayName: 'CL King',
    winRate: 85.3,
    totalPredictions: 95,
    wins: 81,
    losses: 14,
    streak: 9,
    streakType: 'win',
    followers: 7500,
    isPremium: true,
    isFeatured: true,
    specialties: ['Champions League', 'Europa League']
  },
  {
    id: '10',
    username: '@FormFinder',
    displayName: 'Form Finder',
    winRate: 77.6,
    totalPredictions: 224,
    wins: 174,
    losses: 50,
    streak: 3,
    streakType: 'win',
    followers: 2400,
    isPremium: false,
    isFeatured: false,
    specialties: ['Form Analysis', 'Statistical Trends']
  }
]
