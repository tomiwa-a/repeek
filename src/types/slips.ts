export interface Predictor {
  id: string
  username: string
  displayName: string
  avatar?: string
  avatarUrl?: string // For backward compatibility with Convex hydration
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

export interface Game {
  id: string
  _id?: string
  homeTeam: string
  awayTeam: string
  league: string
  sport: 'soccer' | 'basketball' | 'football'
  startTime: Date
  isLive: boolean
  homeScore?: number
  awayScore?: number
  matchTime?: string
  time?: string
  odds: {
    home: number
    draw?: number
    away: number
  }
  predictionCount: number
  sportKey?: string
}

export interface Leg {
  id: string
  game: Game
  pickType: string
  pickLabel: string
  odds: number
  analysis?: string
  confidence?: 'high' | 'medium' | 'low'
  status?: 'pending' | 'won' | 'lost' | 'pushed'
  likes?: number
  comments?: number
}

export interface Slip {
  id: string
  _id?: string
  title: string
  predictor: Predictor
  legs: Leg[]
  totalOdds: number
  status: 'pending' | 'won' | 'lost' | 'pushed'
  timestamp: Date
  price: number
  isPremium: boolean
  analysisNote?: string
}

export interface SlipLeg {
  game: Game
  pick: 'home' | 'draw' | 'away'
  analysis: string
}
