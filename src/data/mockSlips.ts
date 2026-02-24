import type { Predictor } from './mockPredictors'
import type { Game } from './mockGames'

export interface Leg {
  id: string
  game: Game
  pickType: 'home' | 'draw' | 'away' | 'over' | 'under' | 'btts-yes' | 'btts-no'
  pickLabel: string
  odds: number
  confidence: 'low' | 'medium' | 'high'
  status: 'pending' | 'won' | 'lost'
  analysis: string
  likes: number
  comments: number
}

export interface Slip {
  id: string
  predictor: Predictor
  legs: Leg[]
  title: string
  totalOdds: number
  price: number
  isPremium: boolean
  timestamp: Date
  status: 'pending' | 'won' | 'lost'
}

export function generateMockSlips(predictors: Predictor[], games: Game[]): Slip[] {
  const slips: Slip[] = []
  
  const pickTypes = [
    { type: 'home' as const, label: 'Home Win' },
    { type: 'away' as const, label: 'Away Win' },
    { type: 'over' as const, label: 'Over 2.5 Goals' },
    { type: 'under' as const, label: 'Under 2.5 Goals' },
    { type: 'btts-yes' as const, label: 'BTTS - Yes' },
    { type: 'btts-no' as const, label: 'BTTS - No' }
  ]

  // Generate 20 slips
  for (let i = 0; i < 20; i++) {
    const predictor = predictors[Math.floor(Math.random() * predictors.length)]
    const numLegs = Math.floor(Math.random() * 3) + 1 // 1-3 legs per slip
    const slipLegs: Leg[] = []
    
    for (let j = 0; j < numLegs; j++) {
      const game = games[Math.floor(Math.random() * games.length)]
      const pick = pickTypes[Math.floor(Math.random() * pickTypes.length)]
      
      slipLegs.push({
        id: `leg-${i}-${j}`,
        game,
        pickType: pick.type,
        pickLabel: pick.label,
        odds: Number((Math.random() * 2 + 1.2).toFixed(2)),
        confidence: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
        status: game.isLive ? (Math.random() > 0.5 ? 'won' : 'lost') : 'pending',
        analysis: 'TECHNICAL_ANALYSIS_PROTOCOL_ACTIVE: Leg matches historical form patterns.',
        likes: Math.floor(Math.random() * 150),
        comments: Math.floor(Math.random() * 40)
      })
    }

    const totalOdds = slipLegs.reduce((acc, leg) => acc * leg.odds, 1)
    const overallStatus = slipLegs.every(l => l.status === 'won') ? 'won' : 
                         slipLegs.some(l => l.status === 'lost') ? 'lost' : 'pending'

    slips.push({
      id: `slip-${i}`,
      predictor,
      legs: slipLegs,
      title: slipLegs.length > 1 ? `${numLegs}_LEG_ACCUMULATOR` : `${slipLegs[0].game.homeTeam}_VS_${slipLegs[0].game.awayTeam}`,
      totalOdds: Number(totalOdds.toFixed(2)),
      price: predictor.isPremium ? 2.50 : 0,
      isPremium: predictor.isPremium && Math.random() > 0.5,
      timestamp: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000),
      status: overallStatus
    })
  }

  return slips.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export interface PredictionEquivalent extends Leg {
  predictor: Predictor
  slipId: string
  isPremium: boolean
  timestamp: Date
}

export function flattenSlips(slips: Slip[]): PredictionEquivalent[] {
  return slips.flatMap(slip => 
    slip.legs.map(leg => ({
      ...leg,
      predictor: slip.predictor,
      slipId: slip.id,
      isPremium: slip.isPremium,
      timestamp: slip.timestamp,
      confidence: leg.confidence,
      likes: leg.likes,
      comments: leg.comments
    }))
  ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}
