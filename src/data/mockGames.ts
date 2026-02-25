export interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  league: string
  sport: 'soccer' | 'basketball' | 'football'
  startTime: Date
  isLive: boolean
  homeScore?: number
  awayScore?: number
  matchTime?: string
  odds: {
    home: number
    draw?: number
    away: number
  }
  predictionCount: number
  sportKey?: string
}

export const mockGames: Game[] = [
  // Live matches
  {
    id: 'l1',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    sport: 'soccer',
    startTime: new Date(Date.now() - 45 * 60 * 1000),
    isLive: true,
    homeScore: 1,
    awayScore: 2,
    matchTime: "67'",
    odds: { home: 2.10, draw: 3.40, away: 3.20 },
    predictionCount: 342,
    sportKey: 'SOCCER'
  },
  {
    id: 'l2',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    league: 'La Liga',
    sport: 'soccer',
    startTime: new Date(Date.now() - 30 * 60 * 1000),
    isLive: true,
    homeScore: 0,
    awayScore: 0,
    matchTime: "52'",
    odds: { home: 2.45, draw: 3.10, away: 2.85 },
    predictionCount: 489,
    sportKey: 'SOCCER'
  },
  {
    id: 'l3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    league: 'Bundesliga',
    sport: 'soccer',
    startTime: new Date(Date.now() - 20 * 60 * 1000),
    isLive: true,
    homeScore: 2,
    awayScore: 1,
    matchTime: "38'",
    odds: { home: 1.75, draw: 3.80, away: 4.50 },
    predictionCount: 267,
    sportKey: 'SOCCER'
  },
  {
    id: 'l4',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    league: 'Ligue 1',
    sport: 'soccer',
    startTime: new Date(Date.now() - 50 * 60 * 1000),
    isLive: true,
    homeScore: 3,
    awayScore: 1,
    matchTime: "72'",
    odds: { home: 1.55, draw: 4.20, away: 5.80 },
    predictionCount: 198,
    sportKey: 'SOCCER'
  },

  // Upcoming matches - Next 6 hours
  {
    id: 'u1',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    league: 'Premier League',
    sport: 'soccer',
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 2.20, draw: 3.30, away: 3.10 },
    predictionCount: 428,
    sportKey: 'SOCCER'
  },
  {
    id: 'u2',
    homeTeam: 'Atletico Madrid',
    awayTeam: 'Sevilla',
    league: 'La Liga',
    sport: 'soccer',
    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 1.95, draw: 3.20, away: 3.90 },
    predictionCount: 187
  },
  {
    id: 'u3',
    homeTeam: 'Juventus',
    awayTeam: 'Inter Milan',
    league: 'Serie A',
    sport: 'soccer',
    startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 2.35, draw: 3.05, away: 3.00 },
    predictionCount: 312
  },
  {
    id: 'u4',
    homeTeam: 'Manchester United',
    awayTeam: 'Tottenham',
    league: 'Premier League',
    sport: 'soccer',
    startTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 2.60, draw: 3.40, away: 2.70 },
    predictionCount: 394
  },
  {
    id: 'u5',
    homeTeam: 'AC Milan',
    awayTeam: 'Napoli',
    league: 'Serie A',
    sport: 'soccer',
    startTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 2.15, draw: 3.25, away: 3.30 },
    predictionCount: 245
  },

  // Tomorrow's matches
  {
    id: 'u6',
    homeTeam: 'Newcastle',
    awayTeam: 'West Ham',
    league: 'Premier League',
    sport: 'soccer',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 1.85, draw: 3.50, away: 4.20 },
    predictionCount: 156
  },
  {
    id: 'u7',
    homeTeam: 'Valencia',
    awayTeam: 'Real Sociedad',
    league: 'La Liga',
    sport: 'soccer',
    startTime: new Date(Date.now() + 26 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 2.70, draw: 3.15, away: 2.65 },
    predictionCount: 134
  },
  {
    id: 'u8',
    homeTeam: 'Bayer Leverkusen',
    awayTeam: 'RB Leipzig',
    league: 'Bundesliga',
    sport: 'soccer',
    startTime: new Date(Date.now() + 28 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 2.10, draw: 3.45, away: 3.35 },
    predictionCount: 178
  },
  {
    id: 'u9',
    homeTeam: 'Lyon',
    awayTeam: 'Monaco',
    league: 'Ligue 1',
    sport: 'soccer',
    startTime: new Date(Date.now() + 30 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 2.40, draw: 3.20, away: 2.95 },
    predictionCount: 112
  },
  {
    id: 'u10',
    homeTeam: 'Aston Villa',
    awayTeam: 'Brighton',
    league: 'Premier League',
    sport: 'soccer',
    startTime: new Date(Date.now() + 32 * 60 * 60 * 1000),
    isLive: false,
    odds: { home: 2.25, draw: 3.30, away: 3.15 },
    predictionCount: 145
  }
]
