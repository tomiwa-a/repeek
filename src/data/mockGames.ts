import type { Game } from '../types/slips'

export const mockGames: Game[] = [
  {
    id: 'g1',
    homeTeam: 'ARSENAL',
    awayTeam: 'MAN_CITY',
    league: 'PREMIER_LEAGUE',
    sport: 'soccer',
    startTime: new Date(Date.now() + 3600),
    isLive: true,
    homeScore: 1,
    awayScore: 1,
    matchTime: '72:14',
    odds: { home: 2.10, draw: 3.40, away: 3.20 },
    predictionCount: 84,
    sportKey: 'soccer_epl'
  },
  {
    id: 'g2',
    homeTeam: 'REAL_MADRID',
    awayTeam: 'BARCELONA',
    league: 'LA_LIGA',
    sport: 'soccer',
    startTime: new Date(Date.now() + 7200),
    isLive: false,
    odds: { home: 1.95, draw: 3.60, away: 3.80 },
    predictionCount: 156,
    sportKey: 'soccer_spain_la_liga'
  },
  {
    id: 'g3',
    homeTeam: 'LA_LAKERS',
    awayTeam: 'GS_WARRIORS',
    league: 'NBA',
    sport: 'basketball',
    startTime: new Date(Date.now() + 10800),
    isLive: true,
    homeScore: 94,
    awayScore: 92,
    matchTime: '4Q 08:42',
    odds: { home: 1.85, away: 2.05 },
    predictionCount: 242,
    sportKey: 'basketball_nba'
  },
  {
    id: 'g4',
    homeTeam: 'LIVERPOOL',
    awayTeam: 'CHELSEA',
    league: 'PREMIER_LEAGUE',
    sport: 'soccer',
    startTime: new Date(Date.now() + 18000),
    isLive: false,
    odds: { home: 1.70, draw: 3.90, away: 4.80 },
    predictionCount: 68,
    sportKey: 'soccer_epl'
  },
  {
    id: 'g5',
    homeTeam: 'BAYERN_MUNICH',
    awayTeam: 'DORTMUND',
    league: 'BUNDESLIGA',
    sport: 'soccer',
    startTime: new Date(Date.now() + 25200),
    isLive: false,
    odds: { home: 1.55, draw: 4.20, away: 5.60 },
    predictionCount: 92,
    sportKey: 'soccer_germany_bundesliga'
  }
]
