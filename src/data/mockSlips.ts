import type { Predictor, Game, Leg, Slip } from '../types/slips'

export const generateMockSlips = (predictors: Predictor[], games: Game[]): Slip[] => {
  const slips: Slip[] = []
  
  predictors.forEach(predictor => {
    // Generate 2-4 slips per predictor
    const slipCount = Math.floor(Math.random() * 3) + 2
    
    for (let i = 0; i < slipCount; i++) {
      const selectedGames = [...games].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
      const legs: Leg[] = selectedGames.map(game => {
        const pickTypes = ['home', 'draw', 'away', 'over', 'under', 'btts-yes', 'btts-no']
        const pickType = pickTypes[Math.floor(Math.random() * pickTypes.length)]
        const odds = Math.floor(Math.random() * 200) / 100 + 1.5
        
        return {
          id: `leg-${Math.random().toString(36).substr(2, 9)}`,
          game,
          pickType,
          pickLabel: pickType.toUpperCase(),
          odds,
          confidence: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
          status: 'pending',
          analysis: 'Statistical analysis indicates a high probability of value in this market based on recent entity performance matrices.',
          likes: Math.floor(Math.random() * 50),
          comments: Math.floor(Math.random() * 10)
        }
      })

      const totalOdds = parseFloat(legs.reduce((acc, leg) => acc * leg.odds, 1).toFixed(2))
      const isPremium = Math.random() > 0.7

      slips.push({
        id: `slip-${Math.random().toString(36).substr(2, 9)}`,
        title: `${predictor.username.split('_')[0]}_STRATEGY_NODE_${Math.floor(Math.random() * 1000)}`,
        predictor,
        legs,
        totalOdds,
        status: 'pending',
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 100000000)),
        price: isPremium ? 4.99 : 0,
        isPremium,
        analysisNote: 'Overall strategy relies on cross-referencing liquidity pools with offensive efficiency ratings.'
      })
    }
  })

  return slips
}

export const flattenSlips = (slips: Slip[]): Slip[] => {
  return [...slips].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}
