import { mockPredictors } from '../data/mockPredictors'
import PredictorCard from './PredictorCard'

export default function TopPredictors() {
  return (
    <div className="bg-white border-2 border-obsidian p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-obsidian/5 text-obsidian">
        <h2 className="text-xs font-black tracking-widest uppercase italic">TOP PREDICTORS</h2>
        <span className="text-[9px] font-mono font-black text-accent bg-obsidian px-1">LIVE</span>
      </div>
      
      <div className="space-y-2">
        {mockPredictors.slice(0, 5).map((predictor) => (
          <PredictorCard key={predictor.id} predictor={predictor} compact={true} />
        ))}
      </div>

      <button className="w-full mt-6 btn-elite py-2 text-[10px] tracking-widest">
        VIEW ALL PREDICTORS
      </button>
    </div>
  )
}
