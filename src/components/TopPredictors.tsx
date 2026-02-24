import { mockPredictors } from '../data/mockPredictors'
import PredictorCard from './PredictorCard'

export default function TopPredictors() {
  // Sort by win rate and take top 10
  const topPredictors = [...mockPredictors]
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 10)

  return (
    <div className="bg-white border border-border rounded-xl px-4 py-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-secondary">
          Leaderboard
        </h2>
        <button className="text-[11px] font-bold text-primary uppercase tracking-widest hover:underline">
          View All
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {topPredictors.map((predictor, index) => (
          <div key={predictor.id} className="flex items-center gap-3">
             <span className="text-[11px] font-bold text-text-muted w-3 text-center">
              {index + 1}
            </span>
            <PredictorCard predictor={predictor} compact />
          </div>
        ))}
      </div>
    </div>
  )
}
