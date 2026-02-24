import { MoreHorizontal, Heart, MessageSquare, ChevronRight, Lock, Target } from 'lucide-react'
import type { Prediction } from '../data/mockPredictions'

interface PredictionCardProps {
  prediction: Prediction
}

export default function PredictionCard({ prediction: p }: PredictionCardProps) {
  const { 
    game, predictor, pickLabel, odds, confidence, analysis, 
    likes, comments, isPremium, status = 'pending'
  } = p

  const { homeTeam, awayTeam, homeScore = 0, awayScore = 0, league, isLive } = game
  const { displayName: predictorName, winRate } = predictor

  return (
    <div className="bg-white border-2 border-obsidian p-5 shadow-sm hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md transition-all group relative">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-obsidian/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-workspace border border-obsidian/10 flex items-center justify-center font-black text-xs italic">
            {predictorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-[11px] font-black text-obsidian uppercase italic leading-none mb-1">
              {predictorName}
            </h3>
            <span className="text-[10px] font-bold text-text-muted border border-obsidian/10 px-1 bg-workspace">
              {winRate}% WR
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === 'won' && <span className="win-badge italic">WIN</span>}
          {status === 'lost' && <span className="loss-badge italic">LOSS</span>}
          <button className="p-1 hover:bg-workspace transition-colors text-obsidian">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Game Content */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-obsidian/40 tracking-widest uppercase italic">
            {league}
          </span>
          {isLive && (
            <div className="flex items-center gap-1.5 bg-obsidian px-2 py-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-white italic">LIVE_FEED</span>
            </div>
          )}
        </div>

        <div className="bg-workspace border border-obsidian/10 p-3 flex flex-col gap-3 font-black">
          <div className="flex items-center justify-between">
            <span className="text-sm italic uppercase tracking-tighter text-obsidian">{homeTeam}</span>
            <span className="font-mono text-sm bg-obsidian text-white px-2">
              {isLive ? homeScore : '0'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm italic uppercase tracking-tighter text-obsidian">{awayTeam}</span>
            <span className="font-mono text-sm bg-obsidian text-white px-2">
              {isLive ? awayScore : '0'}
            </span>
          </div>
        </div>
      </div>

      {/* Prediction Details */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-accent border border-obsidian px-2 py-1 flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-obsidian" />
            <span className="text-[11px] font-black uppercase italic tracking-tighter text-obsidian">
              {pickLabel}
            </span>
          </div>
          <div className="bg-white border border-obsidian px-2 py-1 flex items-center gap-2">
            <span className="text-[11px] font-black font-mono text-obsidian">@{odds.toFixed(2)}</span>
          </div>
          <div className={`px-2 py-1 border border-obsidian text-[10px] font-black uppercase italic tracking-tighter ${
            confidence === 'high' ? 'bg-obsidian text-white' : 'bg-workspace text-obsidian'
          }`}>
            {confidence.toUpperCase()}_CONFIDENCE
          </div>
        </div>
        <p className="text-[11px] font-bold text-zinc-500 italic leading-snug">
          {analysis}
        </p>
      </div>

      {/* Engagement */}
      <div className="flex items-center justify-between pt-4 border-t border-obsidian/5">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-obsidian hover:text-accent transition-colors">
            <Heart className="w-4 h-4" />
            <span className="text-[11px] font-black font-mono text-obsidian">{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-obsidian hover:text-accent transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span className="text-[11px] font-black font-mono text-obsidian">{comments}</span>
          </button>
        </div>
        <button className="text-[11px] font-black italic uppercase hover:text-accent flex items-center gap-1 text-obsidian">
          VIEW_DATA <ChevronRight className="w-3 h-3" />
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
