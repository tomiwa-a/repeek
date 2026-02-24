import { mockPredictors } from '../data/mockPredictors'
import PredictorCard from './PredictorCard'
import { Trophy } from 'lucide-react'

export default function TopPredictors() {
  // Sort by win rate and take top 10
  const topPredictors = [...mockPredictors]
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 10)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-black uppercase tracking-tight text-white">
            Top Predictors
          </h2>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {topPredictors.map((predictor, index) => (
          <div key={predictor.id} className="relative">
            {/* Rank Badge */}
            <div className="absolute -left-2 -top-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-black z-10">
              {index + 1}
            </div>
            <PredictorCard predictor={predictor} compact />
          </div>
        ))}
      </div>
    </div>
  )
}
