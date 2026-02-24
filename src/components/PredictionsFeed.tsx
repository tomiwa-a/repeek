import { useMemo } from 'react'
import { mockPredictors } from '../data/mockPredictors'
import { mockGames } from '../data/mockGames'
import { generateMockPredictions } from '../data/mockPredictions'
import PredictionCard from './PredictionCard'
import { Activity } from 'lucide-react'

export default function PredictionsFeed() {
  const predictions = useMemo(
    () => generateMockPredictions(mockPredictors, mockGames),
    []
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-black uppercase tracking-tight text-white">
            Latest Predictions
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-text-muted uppercase tracking-wider hover:text-white transition-colors">
            All
          </button>
          <span className="text-text-muted">•</span>
          <button className="text-xs text-text-muted uppercase tracking-wider hover:text-white transition-colors">
            Following
          </button>
          <span className="text-text-muted">•</span>
          <button className="text-xs text-text-muted uppercase tracking-wider hover:text-white transition-colors">
            Premium
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {predictions.slice(0, 20).map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>

      {/* Load More */}
      <button className="w-full bg-surface border border-border py-3 text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-all">
        Load More Predictions
      </button>
    </div>
  )
}
