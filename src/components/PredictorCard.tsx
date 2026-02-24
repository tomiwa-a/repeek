import { TrendingUp, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PredictorCardProps {
  predictor: {
    id: string
    username: string
    displayName: string
    winRate: number
    followers: number
    specialties: string[]
    isPremium: boolean
    streak: number
  }
}

export default function PredictorCard({ predictor }: PredictorCardProps) {
  const navigate = useNavigate()

  return (
    <div className="bg-white border-2 border-obsidian p-3 shadow-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md transition-all group relative overflow-hidden flex flex-col h-full font-sans antialiased">
      {/* Absolute Rank Mark */}
      <div className="absolute top-0 right-0 bg-obsidian text-white px-1.5 py-1 text-[7px] font-black italic tracking-tighter z-10 uppercase">
        VERIFIED_ANALYST
      </div>

      {/* Header */}
      <div className="flex items-start gap-2.5 mb-3 pt-1">
        <div className="w-9 h-9 bg-workspace border border-obsidian flex items-center justify-center text-sm font-black italic group-hover:bg-accent transition-colors text-obsidian shrink-0">
          {predictor.username.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h3 className="text-xs font-black uppercase italic tracking-tighter leading-none mb-0.5 text-obsidian truncate">
            {predictor.username}
          </h3>
          <p className="text-[8px] font-bold text-text-muted uppercase tracking-widest truncate">{predictor.displayName}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        <div className="bg-workspace/40 border border-obsidian/5 p-2 transition-colors group-hover:border-obsidian/10">
          <span className="text-[7px] font-black text-text-muted uppercase tracking-widest block mb-0.5 italic">ACCURACY</span>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-sm font-black italic text-obsidian">{predictor.winRate}%</span>
            {predictor.winRate > 80 && <span className="text-[7px] font-black text-accent bg-obsidian px-1 italic">ELITE</span>}
          </div>
        </div>
        <div className="bg-workspace/40 border border-obsidian/5 p-2 transition-colors group-hover:border-obsidian/10">
          <span className="text-[7px] font-black text-text-muted uppercase tracking-widest block mb-0.5 italic">NETWORK</span>
          <div className="flex items-center gap-1 leading-none">
            <span className="text-sm font-black italic text-obsidian">{predictor.followers < 1000 ? predictor.followers : `${(predictor.followers/1000).toFixed(1)}K`}</span>
            <TrendingUp className="w-2.5 h-2.5 text-accent bg-obsidian p-0.5" />
          </div>
        </div>
      </div>

      {/* Specialty Tags */}
      <div className="flex flex-wrap gap-1 mb-4 flex-1">
        {predictor.specialties.map((specialty, index) => (
          <span key={index} className="text-[7px] font-black text-obsidian uppercase italic border border-obsidian/10 px-1 py-0.5 group-hover:border-obsidian/20 transition-colors whitespace-nowrap">
            {specialty}
          </span>
        ))}
      </div>

      {/* Profile Action */}
      <button 
        onClick={() => navigate(`/profile/${predictor.username.toLowerCase()}`)}
        className="w-full bg-obsidian text-white py-2 flex items-center justify-center gap-1.5 text-[9px] font-black uppercase italic tracking-widest hover:bg-accent hover:text-obsidian transition-all group/btn"
      >
        VIEW_PROFILE_PROTOCOL
        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
      </button>
    </div>
  )
}
