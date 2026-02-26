import { MoreHorizontal, ChevronRight, Lock, Target } from 'lucide-react'
import type { Slip } from '../types/slips'
import { useUI } from '../context/UIContext'

interface PredictionCardProps {
  prediction: Slip
}

export default function PredictionCard({ prediction: slip }: PredictionCardProps) {
  const { openSlipDetail } = useUI()
  
  if (!slip.legs || slip.legs.length === 0) return null;
  
  const primaryLeg = slip.legs[0]
  const game = primaryLeg.game
  if (!game) return null;

  const { predictor, status = 'pending', isPremium } = slip
  const { homeTeam, awayTeam, homeScore = 0, awayScore = 0, league, isLive } = game

  return (
    <div className="bg-white border-2 border-obsidian p-3 shadow-sm hover-glitch scanline-card transition-all group relative overflow-hidden flex flex-col h-full font-sans antialiased">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-obsidian/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-workspace border border-obsidian/10 flex items-center justify-center font-black text-[10px] italic">
            {predictor.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-[10px] font-black text-obsidian uppercase italic leading-none mb-0.5">
              {predictor.username}
            </h3>
            <span className="text-[8px] font-black text-text-muted px-1 bg-workspace border border-obsidian/5">
              {predictor.winRate}%_WR
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {status === 'won' && <span className="text-[8px] font-black bg-accent text-obsidian px-1.5 py-0.5 italic">WIN</span>}
          {status === 'lost' && <span className="text-[8px] font-black bg-obsidian text-white px-1.5 py-0.5 italic">LOSS</span>}
          <button className="p-0.5 hover:bg-workspace transition-colors text-obsidian/20 hover:text-obsidian">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Game Content */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] font-black text-obsidian/30 tracking-widest uppercase italic">
            {league}
          </span>
          {isLive && (
            <div className="flex items-center gap-1 bg-obsidian px-1.5 py-0.5">
              <div className="w-1 h-1 rounded-full bg-accent animate-pulse"></div>
              <span className="text-[8px] font-black text-white italic">LIVE_FEED</span>
            </div>
          )}
        </div>

        <div className="bg-workspace border border-obsidian/5 p-2 flex flex-col gap-1.5 font-black">
          <div className="flex items-center justify-between">
            <span className="text-xs italic uppercase tracking-tighter text-obsidian truncate pr-4">{homeTeam}</span>
            <span className="font-mono text-xs bg-obsidian text-white px-1.5">
              {isLive ? homeScore : '0'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs italic uppercase tracking-tighter text-obsidian truncate pr-4">{awayTeam}</span>
            <span className="font-mono text-xs bg-obsidian text-white px-1.5">
              {isLive ? awayScore : '0'}
            </span>
          </div>
        </div>
      </div>

      {/* Prediction Details */}
      <div className="space-y-2 mb-4 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="bg-accent border border-obsidian px-1.5 py-0.5 flex items-center gap-1.5">
            <Target className="w-3 h-3 text-obsidian" />
            <span className="text-[9px] font-black uppercase italic tracking-tighter text-obsidian">
              {primaryLeg.pickLabel}
            </span>
          </div>
          <div className="bg-white border border-obsidian px-1.5 py-0.5 text-[9px] font-black font-mono text-obsidian">
            @{primaryLeg.odds.toFixed(2)}
          </div>
          <div className={`px-1.5 py-0.5 border border-obsidian text-[8px] font-black uppercase italic tracking-tighter ${
            primaryLeg.confidence === 'high' ? 'bg-obsidian text-white' : 'bg-workspace text-obsidian'
          }`}>
            {primaryLeg.confidence.toUpperCase()}
          </div>
        </div>
        <p className="text-[10px] font-bold text-zinc-500 italic leading-snug line-clamp-2">
          {primaryLeg.analysis}
        </p>
      </div>

      {/* Action Area */}
      <div className="pt-3 border-t border-obsidian/5 flex justify-end">
        <button 
          onClick={() => openSlipDetail(slip)}
          className="text-[9px] font-black italic uppercase hover:text-accent flex items-center gap-1 text-obsidian group/btn transition-colors"
        >
          VIEW_DATA_PROTOCOL <ChevronRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Premium Mask */}
      {isPremium && (
        <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center border-2 border-accent">
          <div className="w-12 h-12 bg-accent border-2 border-obsidian mb-4 flex items-center justify-center -rotate-12">
            <Lock className="w-6 h-6 text-obsidian" />
          </div>
          <h4 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">PREMIUM ANALYSIS</h4>
          <p className="text-[11px] text-zinc-400 font-bold mb-6 italic uppercase leading-tight">
            THIS CONTENT IS RESTRICTED TO PREMIUM USERS
          </p>
          <button className="btn-volt w-full">UPGRADE TO ACCESS</button>
        </div>
      )}
    </div>
  )
}
