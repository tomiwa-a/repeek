import type { Predictor } from './mockPredictors'
import type { Game } from './mockGames'

export interface Prediction {
  id: string
  predictor: Predictor
  game: Game
  pickType: 'home' | 'draw' | 'away' | 'over' | 'under' | 'btts-yes' | 'btts-no'
  pickLabel: string
  confidence: 'low' | 'medium' | 'high'
  odds: number
  analysis: string
  timestamp: Date
  likes: number
  comments: number
  isPremium: boolean
  status?: 'pending' | 'won' | 'lost'
}

// This needs to be populated after predictors and games are loaded
// For now, it's a type definition that components can use
export const mockPredictions: Prediction[] = []

// Helper function to generate predictions (call this after loading predictors/games)
export function generateMockPredictions(
  predictors: Predictor[],
  games: Game[]
): Prediction[] {
  const predictions: Prediction[] = []
  const pickTypes = [
    { type: 'home' as const, label: 'Home Win' },
    { type: 'away' as const, label: 'Away Win' },
    { type: 'over' as const, label: 'Over 2.5 Goals' },
    { type: 'under' as const, label: 'Under 2.5 Goals' },
    { type: 'btts-yes' as const, label: 'BTTS - Yes' },
    { type: 'btts-no' as const, label: 'BTTS - No' }
  ]

  const analyses = [
    'Based on recent form analysis and head-to-head stats, this looks like a strong pick.',
    'Home advantage and injury news favor this outcome. High confidence.',
    'Statistical trends point to this result. Team has won 4 of last 5.',
    'Defensive records suggest this is the likely outcome.',
    'Form guide and goal-scoring patterns support this prediction.',
    'Historical data and current momentum indicate value here.',
    'Key players returning from injury. Expect goals.',
    'Recent performances show clear pattern emerging.',
    'Tactical matchup favors this selection.',
    'Expected goals (xG) analysis backs this pick.'
  ]

  // Generate predictions for most games
  games.forEach((game, gameIndex) => {
    // 2-5 predictions per game
    const numPredictions = Math.floor(Math.random() * 4) + 2
    const usedPredictors = new Set<string>()

    for (let i = 0; i < numPredictions && usedPredictors.size < predictors.length; i++) {
      const predictor = predictors[Math.floor(Math.random() * predictors.length)]
      
      if (usedPredictors.has(predictor.id)) continue
      usedPredictors.add(predictor.id)

      const pick = pickTypes[Math.floor(Math.random() * pickTypes.length)]
      const confidences: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high']
      const confidence = confidences[Math.floor(Math.random() * 3)]

      predictions.push({
        id: `pred-${gameIndex}-${i}`,
        predictor,
        game,
        pickType: pick.type,
        pickLabel: pick.label,
        confidence,
        odds: Number((Math.random() * 3 + 1.5).toFixed(2)),
        analysis: analyses[Math.floor(Math.random() * analyses.length)],
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        likes: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 50),
        isPremium: predictor.isPremium && Math.random() > 0.6,
        status: game.isLive ? (Math.random() > 0.5 ? 'won' : 'lost') : 'pending'
      })
    }
  })

  // Sort by timestamp, newest first
  return predictions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}
