import type { Prediction } from '../data/mockPredictions'
import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageSquare, Lock, TrendingUp, MoreHorizontal } from 'lucide-react'

interface PredictionCardProps {
  prediction: Prediction
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  const { predictor, game, pickLabel, confidence, odds, analysis, timestamp, likes, comments, isPremium, status } = prediction

  const getConfidenceBadge = () => {
    const badges = {
      low: 'neutral-badge',
      medium: 'stat-badge bg-amber-50 text-amber-700 border-amber-100',
      high: 'win-badge'
    }
    return badges[confidence]
  }

  const getStatusBadge = () => {
    if (!status || status === 'pending') return null
    if (status === 'won') return <span className="win-badge">Won</span>
    return <span className="loss-badge">Lost</span>
  }

  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
      {/* Header - Predictor Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-workspace border border-border flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-secondary text-xs">
              {predictor.displayName.substring(0, 1).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-semibold text-secondary group-hover:text-primary transition-colors">
                {predictor.username}
              </p>
              {predictor.isPremium && <span className="text-[10px]">💎</span>}
              <span className="text-[11px] text-text-muted font-medium bg-workspace px-1.5 py-0.5 rounded">
                {predictor.winRate.toFixed(0)}% WR
              </span>
            </div>
            <p className="text-[11px] text-text-muted font-medium">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <button className="text-text-muted hover:text-secondary h-8 w-8 flex items-center justify-center rounded-md hover:bg-workspace">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Game Info */}
      <div className="bg-workspace/50 border border-border-subtle p-3 rounded-lg mb-4">
        <div className="flex items-center justify-between mb-3 text-[11px] font-bold text-text-muted uppercase tracking-wider">
          <span>{game.league}</span>
          {game.isLive && (
            <div className="flex items-center gap-1.5 text-red-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span>LIVE</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold text-secondary">{game.homeTeam}</p>
            <p className="text-[13px] font-semibold text-secondary">{game.awayTeam}</p>
          </div>
          {game.isLive && (
            <div className="flex flex-col items-end gap-1">
              <p className="text-lg font-bold text-primary">{game.homeScore}</p>
              <p className="text-lg font-bold text-primary">{game.awayScore}</p>
            </div>
          )}
        </div>
      </div>

      {/* Prediction Details */}
      <div className="mb-5">
        <div className="flex items-center gap-2 flex-wrap mb-2.5">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 text-primary rounded-md">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-[12px] font-bold uppercase tracking-tight">
              {pickLabel}
            </span>
          </div>
          <span className="text-[13px] font-bold text-secondary">@ {odds.toFixed(2)}</span>
          <span className={getConfidenceBadge()}>
            {confidence} confidence
          </span>
          {isPremium && (
            <span className="stat-badge bg-primary/10 text-primary border-transparent">
              <Lock className="w-3 h-3 mr-1" /> Premium
            </span>
          )}
        </div>
        
        {isPremium ? (
          <div className="p-4 bg-workspace border border-dashed border-border rounded-lg text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white p-2 rounded-full shadow-sm border border-border">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs font-semibold text-secondary">Unlock full analysis</p>
              <p className="text-[11px] text-text-muted">Available to premium members only</p>
            </div>
          </div>
        ) : (
          <p className="text-[13px] text-text-muted leading-relaxed font-medium">
            {analysis}
          </p>
        )}
      </div>

      {/* Engagement */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 text-text-muted hover:text-red-500 transition-colors font-semibold text-[12px]">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors font-semibold text-[12px]">
            <MessageSquare className="w-4 h-4" />
            <span>{comments}</span>
          </button>
        </div>
        <button className="text-[12px] text-primary font-bold hover:text-primary-hover transition-colors">
          View Detail
        </button>
      </div>
    </div>
  )
}
