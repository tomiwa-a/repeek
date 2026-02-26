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
      className="bg-white border-2 border-obsidian p-3 shadow-sm hover-glitch scanline-card cursor-pointer transition-all flex flex-col h-full font-sans antialiased group"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4 pb-2 border-b border-obsidian/5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-workspace border-2 border-obsidian flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform shrink-0">
             {predictor.avatarUrl ? (
               <img src={predictor.avatarUrl} alt={predictor.username} className="w-full h-full object-cover" />
             ) : (
               <User className="w-5 h-5 text-obsidian" />
             )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 leading-none">
              <h3 className="text-xs font-black italic uppercase tracking-tighter text-obsidian truncate">{predictor.username}</h3>
              {predictor.hasActiveSlips && (
                <div className="flex items-center gap-1 ml-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]"></div>
                  <span className="text-[6px] font-black text-accent uppercase italic">LIVE</span>
                </div>
              )}
              {predictor.isPremium && <Shield className="w-3 h-3 text-accent shrink-0 ml-auto" />}
            </div>
            <div className="text-[7px] font-black text-obsidian/20 uppercase tracking-[0.2em] mt-0.5 italic">VERIFIED_ANALYST</div>
          </div>
        </div>
      </div>

      {/* Stats Matrix 3x2 */}
      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {/* ... (stats content stays the same) */}
        <div className="p-2 border border-obsidian/5 bg-workspace/30">
          <div className="text-[7px] font-black text-obsidian/40 uppercase tracking-widest mb-1">WIN_RATE</div>
          <div className="text-base font-black italic text-obsidian tabular-nums leading-none tracking-tighter">
            {predictor.winRate.toFixed(1)}%
          </div>
        </div>
        <div className="p-2 border border-obsidian/5 bg-workspace/30">
          <div className="text-[7px] font-black text-obsidian/40 uppercase tracking-widest mb-1">ROI_ALPHA</div>
          <div className="text-base font-black italic text-accent tabular-nums leading-none tracking-tighter">
            +{predictor.roi}%
          </div>
        </div>
        <div className="p-2 border border-obsidian/5 bg-workspace/30">
          <div className="text-[7px] font-black text-obsidian/40 uppercase tracking-widest mb-1">TOTAL_SLIPS</div>
          <div className="text-base font-black italic text-obsidian tabular-nums leading-none tracking-tighter">
            {predictor.totalSlips}
          </div>
        </div>
        <div className="p-2 border border-obsidian/5 bg-workspace/30">
          <div className="text-[7px] font-black text-obsidian/40 uppercase tracking-widest mb-1">TOTAL_GAMES</div>
          <div className="text-base font-black italic text-obsidian tabular-nums leading-none tracking-tighter">
            {predictor.totalGames}
          </div>
        </div>
        <div className="p-2 border border-obsidian/5 bg-workspace/30">
          <div className="text-[7px] font-black text-obsidian/40 uppercase tracking-widest mb-1">FOLLOWERS</div>
          <div className="text-base font-black italic text-obsidian tabular-nums leading-none tracking-tighter">
            {predictor.followers}
          </div>
        </div>
        <div className="p-2 border border-obsidian/5 bg-workspace/30">
          <div className="text-[7px] font-black text-obsidian/40 uppercase tracking-widest mb-1">CURRENT_STREAK</div>
          <div className="text-base font-black italic text-obsidian tabular-nums leading-none tracking-tighter flex items-center gap-1.5">
            {predictor.streak} 
            <span className={predictor.streakType === 'win' ? 'text-accent' : 'text-red-500'}>
              {predictor.streakType.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto">
        <button className="w-full btn-volt py-3 text-[10px] font-black italic uppercase tracking-[0.2em] flex items-center justify-center gap-2 group/btn">
          VIEW_PROFILE_PROTOCOL
          <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
