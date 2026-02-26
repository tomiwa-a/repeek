import { Shield, User, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Predictor } from '../types/slips'

interface PredictorCardProps {
  predictor: Predictor
}

export default function PredictorCard({ predictor }: PredictorCardProps) {
  const navigate = useNavigate()

  return (
    <div 
      onClick={() => navigate(`/profile?u=${predictor.username}`)}
      className="bg-white border-2 border-obsidian p-2.5 shadow-sm hover-glitch scanline-card cursor-pointer transition-all flex flex-col h-full font-sans antialiased group"
    >
      {/* Dynamic Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-workspace border border-obsidian/10 flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform bg-white shrink-0">
            <User className="w-4 h-4 text-obsidian" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 leading-none mb-0.5">
              <h3 className="text-[10px] font-black italic uppercase tracking-tighter text-obsidian truncate">{predictor.username}</h3>
              <Shield className="w-2.5 h-2.5 text-accent shrink-0" />
            </div>
            <div className="text-[7px] font-black text-obsidian/30 uppercase tracking-widest truncate">{(predictor.specialties?.[0] || 'GENERAL')} OPERATOR</div>
          </div>
        </div>
        <div className="bg-obsidian text-white px-1.5 py-0.5 text-[7px] font-black italic tracking-widest shrink-0">VERIFIED_ANALYST</div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 gap-1 mb-2">
        <div className="bg-workspace/50 p-1.5 border border-obsidian/5">
          <div className="text-[7px] font-black text-obsidian/30 uppercase tracking-widest mb-0.5">PRECISION</div>
          <div className="text-sm font-black italic text-accent leading-none">{predictor.winRate}%</div>
        </div>
        <div className="bg-workspace/50 p-1.5 border border-obsidian/5">
          <div className="text-[7px] font-black text-obsidian/30 uppercase tracking-widest mb-0.5">NETWORK</div>
          <div className="text-sm font-black italic text-obsidian leading-none">
            {predictor.followers < 1000 ? predictor.followers : `${(predictor.followers/1000).toFixed(1)}K`}
          </div>
        </div>
      </div>

      {/* Specialty Tags */}
      <div className="flex flex-wrap gap-1 mb-3 flex-1 overflow-hidden">
        {predictor.specialties?.map((specialty, index) => (
          <span key={index} className="text-[7px] font-black text-obsidian/40 uppercase italic border border-obsidian/10 px-1 py-0.5 group-hover:border-obsidian/20 transition-colors whitespace-nowrap">
            {specialty}
          </span>
        ))}
      </div>

      {/* Profile Action */}
      <button className="w-full bg-obsidian text-white py-1.5 text-[8px] font-black uppercase italic tracking-[0.2em] group-hover:bg-accent group-hover:text-obsidian transition-colors flex items-center justify-center gap-1 group/btn">
        VIEW_PROFILE_PROTOCOL
        <ChevronRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform" />
      </button>
    </div>
  )
}
