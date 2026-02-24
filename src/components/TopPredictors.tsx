import { mockPredictors } from '../data/mockPredictors'
import PredictorCard from './PredictorCard'

export default function TopPredictors() {
  return (
    <div className="bg-white border-2 border-obsidian p-4 shadow-sm font-sans antialiased">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-obsidian/10 text-obsidian">
        <h2 className="text-[10px] font-black tracking-[0.2em] uppercase italic">ELITE_NODES</h2>
        <span className="text-[8px] font-black text-accent bg-obsidian px-1 italic">V_4.2</span>
      </div>
      
      <div className="space-y-1.5">
        {mockPredictors.slice(0, 5).map((predictor) => (
          <PredictorCard key={predictor.id} predictor={predictor} />
        ))}
      </div>

      <button className="w-full mt-4 bg-obsidian text-white py-2 text-[8px] font-black uppercase italic tracking-widest hover:bg-accent hover:text-obsidian transition-all">
        ACCESS_ALL_OPERATORS
      </button>
    </div>
  )
}
