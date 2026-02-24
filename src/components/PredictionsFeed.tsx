import { useMemo } from 'react'
import { mockPredictors } from '../data/mockPredictors'
import { mockGames } from '../data/mockGames'
import { generateMockSlips, flattenSlips } from '../data/mockSlips'
import PredictionCard from './PredictionCard'

export default function PredictionsFeed() {
  const predictions = useMemo(
    () => flattenSlips(generateMockSlips(mockPredictors, mockGames)),
    []
  )

  return (
    <div className="space-y-4">
      {/* Feed */}
      <div className="flex flex-col gap-4">
        {predictions.slice(0, 20).map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>

      {/* Load More */}
      <button className="w-full bg-white border border-border py-2.5 text-[13px] font-semibold text-text rounded-lg hover:bg-workspace transition-all shadow-sm">
        Load More Predictions
      </button>
    </div>
  )
}
