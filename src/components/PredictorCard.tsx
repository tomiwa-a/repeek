import type { Predictor } from '../data/mockPredictors'
import { TrendingUp, TrendingDown, UserPlus } from 'lucide-react'

interface PredictorCardProps {
  predictor: Predictor
  compact?: boolean
}

export default function PredictorCard({ predictor, compact = false }: PredictorCardProps) {
  const getTrendIcon = () => {
    if (predictor.streakType === 'win') {
      return <TrendingUp className="w-3.5 h-3.5 text-green-600" />
    }
    return <TrendingDown className="w-3.5 h-3.5 text-red-600" />
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-2.5 bg-white border border-border rounded-lg hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-workspace border border-border flex items-center justify-center flex-shrink-0">
          <span className="font-bold text-secondary text-xs">
            {predictor.displayName.substring(0, 1).toUpperCase()}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-[13px] text-secondary truncate group-hover:text-primary transition-colors">
              {predictor.username}
            </p>
            {predictor.isPremium && (
              <span className="text-[10px]">💎</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-text-muted">
            <span className="text-green-600">
              {predictor.winRate.toFixed(0)}% WR
            </span>
            <span>•</span>
            <span>{predictor.totalPredictions} picks</span>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 px-2 py-1 bg-workspace rounded text-[11px] font-bold">
          {getTrendIcon()}
          <span className={predictor.streakType === 'win' ? 'text-green-600' : 'text-red-600'}>
            {predictor.streak}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-workspace border border-border flex items-center justify-center">
            <span className="font-bold text-secondary text-lg">
              {predictor.displayName.substring(0, 1).toUpperCase()}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-secondary group-hover:text-primary transition-colors">
                {predictor.username}
              </p>
              {predictor.isPremium && <span className="text-xs">💎</span>}
            </div>
            <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider">
              {predictor.followers.toLocaleString()} followers
            </p>
          </div>
        </div>

        {predictor.isFeatured && (
          <span className="stat-badge bg-primary/10 text-primary border-transparent">
            Featured
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-workspace p-2.5 rounded-lg text-center">
          <div className="text-lg font-bold text-green-600 leading-none mb-1">{predictor.winRate.toFixed(1)}%</div>
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Win Rate</div>
        </div>
        <div className="bg-workspace p-2.5 rounded-lg text-center">
          <div className="text-lg font-bold text-secondary leading-none mb-1">{predictor.wins}</div>
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Wins</div>
        </div>
        <div className="bg-workspace p-2.5 rounded-lg text-center">
          <div className="text-lg font-bold text-secondary leading-none mb-1">{predictor.totalPredictions}</div>
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Total</div>
        </div>
      </div>

      {/* Specialty Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {predictor.specialties.map((specialty, index) => (
          <span key={index} className="px-2 py-0.5 bg-workspace border border-border-subtle rounded text-[11px] font-bold text-text-muted uppercase tracking-tight">
            {specialty}
          </span>
        ))}
      </div>

      {/* Follow Button */}
      <button className="w-full btn-primary py-2.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm shadow-primary/20">
        <UserPlus className="w-3.5 h-3.5" />
        Follow Predictor
      </button>
    </div>
  )
}
