import type { Predictor } from '../data/mockPredictors'
import { TrendingUp, TrendingDown, UserPlus } from 'lucide-react'

interface PredictorCardProps {
  predictor: Predictor
  compact?: boolean
}

export default function PredictorCard({ predictor, compact = false }: PredictorCardProps) {
  const getTrendIcon = () => {
    if (predictor.streakType === 'win') {
      return <TrendingUp className="w-3 h-3 text-green-400" />
    }
    return <TrendingDown className="w-3 h-3 text-red-400" />
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-surface border border-border hover:border-primary transition-colors cursor-pointer group">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="font-black text-white text-sm">
            {predictor.displayName.substring(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-white truncate group-hover:text-primary transition-colors">
              {predictor.username}
            </p>
            {predictor.isPremium && (
              <span className="text-xs text-primary">💎</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="win-badge px-1.5 py-0.5">
              {predictor.winRate.toFixed(1)}%
            </span>
            <span className="text-text-muted">{predictor.totalPredictions} picks</span>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 text-xs font-bold">
          {getTrendIcon()}
          <span className={predictor.streakType === 'win' ? 'text-green-400' : 'text-red-400'}>
            {predictor.streak}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="compact-card hover:border-primary transition-colors group cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="font-black text-white">
              {predictor.displayName.substring(0, 2).toUpperCase()}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-black text-white group-hover:text-primary transition-colors">
                {predictor.username}
              </p>
              {predictor.isPremium && (
                <span className="text-sm">💎</span>
              )}
            </div>
            <p className="text-xs text-text-muted uppercase tracking-wider">
              {predictor.followers.toLocaleString()} followers
            </p>
          </div>
        </div>

        {predictor.isFeatured && (
          <span className="stat-badge bg-primary/20 text-primary border-primary/30">
            Featured
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3 p-2 bg-background rounded">
        <div className="text-center">
          <div className="text-xl font-black text-green-400">{predictor.winRate.toFixed(1)}%</div>
          <div className="text-xs text-text-muted uppercase">Win Rate</div>
        </div>
        <div className="text-center border-x border-border">
          <div className="text-xl font-black text-white">{predictor.wins}</div>
          <div className="text-xs text-text-muted uppercase">Wins</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black text-white">{predictor.totalPredictions}</div>
          <div className="text-xs text-text-muted uppercase">Total</div>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center justify-between mb-3 p-2 bg-background rounded">
        <span className="text-xs text-text-muted uppercase tracking-wider">Current Streak</span>
        <div className="flex items-center gap-1">
          {getTrendIcon()}
          <span className={`text-sm font-black ${predictor.streakType === 'win' ? 'text-green-400' : 'text-red-400'}`}>
            {predictor.streak} {predictor.streakType === 'win' ? 'wins' : 'losses'}
          </span>
        </div>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-1 mb-3">
        {predictor.specialties.slice(0, 2).map((specialty, index) => (
          <span key={index} className="neutral-badge text-xs">
            {specialty}
          </span>
        ))}
      </div>

      {/* Follow Button */}
      <button className="w-full bg-primary text-white py-2 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-background transition-all flex items-center justify-center gap-2">
        <UserPlus className="w-4 h-4" />
        Follow
      </button>
    </div>
  )
}
