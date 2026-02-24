import type { Prediction } from '../data/mockPredictions'
import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageSquare, Lock, TrendingUp } from 'lucide-react'

interface PredictionCardProps {
  prediction: Prediction
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  const { predictor, game, pickLabel, confidence, odds, analysis, timestamp, likes, comments, isPremium, status } = prediction

  const getConfidenceBadge = () => {
    const badges = {
      low: 'neutral-badge',
      medium: 'stat-badge bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
      high: 'stat-badge bg-green-600/20 text-green-400 border-green-600/30'
    }
    return badges[confidence]
  }

  const getStatusBadge = () => {
    if (!status || status === 'pending') return null
    if (status === 'won') return <span className="win-badge">Won</span>
    return <span className="loss-badge">Lost</span>
  }

  return (
    <div className="compact-card hover:border-primary transition-colors cursor-pointer">
      {/* Header - Predictor Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="font-black text-white text-sm">
              {predictor.displayName.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-white hover:text-primary transition-colors">
                {predictor.username}
              </p>
              {predictor.isPremium && <span className="text-xs">💎</span>}
              <span className="win-badge text-xs px-1.5 py-0.5">
                {predictor.winRate.toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-text-muted">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Game Info */}
      <div className="bg-background p-3 rounded mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-text-muted">
            {game.league}
          </span>
          {game.isLive && (
            <div className="flex items-center gap-1">
              <div className="live-dot"></div>
              <span className="text-xs font-bold text-red-500">LIVE</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-white">{game.homeTeam}</p>
            <p className="font-bold text-white">{game.awayTeam}</p>
          </div>
          {game.isLive && (
            <div className="text-right">
              <p className="text-2xl font-black text-white">{game.homeScore}</p>
              <p className="text-2xl font-black text-white">{game.awayScore}</p>
            </div>
          )}
        </div>
      </div>

      {/* Prediction Details */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="font-black text-white uppercase tracking-tight">
            {pickLabel}
          </span>
          <span className="text-sm font-bold text-primary">@ {odds.toFixed(2)}</span>
          <span className={getConfidenceBadge()}>
            {confidence}
          </span>
          {isPremium && (
            <span className="stat-badge bg-primary/20 text-primary border-primary/30">
              <Lock className="w-3 h-3" />
            </span>
          )}
        </div>
        
        {isPremium ? (
          <div className="p-3 bg-surface-hover border border-primary/30 rounded">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Lock className="w-4 h-4" />
              <span>Premium analysis - Subscribe to view full details</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted leading-relaxed">
            {analysis}
          </p>
        )}
      </div>

      {/* Engagement */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-text-muted hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-bold">{likes}</span>
          </button>
          <button className="flex items-center gap-1 text-text-muted hover:text-primary transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-bold">{comments}</span>
          </button>
        </div>
        <button className="text-xs text-primary font-bold uppercase tracking-wider hover:underline">
          View Details →
        </button>
      </div>
    </div>
  )
}
