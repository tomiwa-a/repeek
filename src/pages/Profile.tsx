import { mockPredictors } from '../data/mockPredictors'
import { TrendingUp, TrendingDown, Target, Award, Calendar, Share2, UserPlus } from 'lucide-react'

export default function Profile() {
  // Show the first predictor's profile as example
  const user = mockPredictors[0]

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-10">
      {/* Profile Header */}
      <div className="bg-white border border-border rounded-2xl p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-workspace border border-border flex items-center justify-center flex-shrink-0 shadow-inner">
            <span className="font-bold text-secondary text-4xl">
              {user.displayName.substring(0, 1).toUpperCase()}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold text-secondary tracking-tight">{user.username}</h1>
              {user.isPremium && <span className="text-2xl">💎</span>}
              {user.isFeatured && (
                <span className="stat-badge bg-primary/10 text-primary border-transparent">
                  Featured Predictor
                </span>
              )}
            </div>
            <p className="text-text-muted font-medium mb-6">{user.displayName}</p>
            
            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-6">
              {user.specialties.map((specialty, index) => (
                <span key={index} className="px-3 py-1 bg-workspace border border-border-subtle rounded-lg text-[13px] font-bold text-text-muted uppercase tracking-tight">
                  {specialty}
                </span>
              ))}
            </div>

            {/* Basic Stats */}
            <div className="flex items-center gap-8">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-secondary">
                  {user.followers.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-text-muted">followers</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-secondary">{user.totalPredictions}</span>
                <span className="text-sm font-semibold text-text-muted">picks</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none btn-primary px-10 py-3 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm shadow-primary/20">
              <UserPlus className="w-4 h-4" />
              Follow
            </button>
            <button className="p-3 bg-white border border-border rounded-xl hover:bg-workspace transition-colors text-text-muted">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Win Rate */}
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className="p-2.5 bg-green-50 rounded-xl">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-0.5">Focus</div>
              <div className="text-2xl font-bold text-green-600">{user.winRate.toFixed(1)}% WR</div>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-text-muted uppercase tracking-tighter">Verified Wins</span>
              <span className="font-bold text-secondary">{user.wins}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-text-muted uppercase tracking-tighter">Losses</span>
              <span className="font-bold text-text-muted">{user.losses}</span>
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className={`p-2.5 rounded-xl ${
              user.streakType === 'win' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              {user.streakType === 'win' ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div>
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-0.5">
                Current Trend
              </div>
              <div className={`text-2xl font-bold ${
                user.streakType === 'win' ? 'text-green-600' : 'text-red-600'
              }`}>
                {user.streak} {user.streakType === 'win' ? 'W' : 'L'}
              </div>
            </div>
          </div>
          <div className="text-[13px] font-semibold text-text-muted">
            {user.streakType === 'win' ? '🔥 Currently on fire' : 'Standard variance observed'}
          </div>
        </div>

        {/* Total Predictions */}
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className="p-2.5 bg-primary/5 rounded-xl">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-0.5">
                Activity
              </div>
              <div className="text-2xl font-bold text-secondary">{user.totalPredictions}</div>
            </div>
          </div>
          <div className="text-[13px] font-semibold text-text-muted">
            Global Rank: Top 1.5%
          </div>
        </div>

        {/* Member Since */}
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className="p-2.5 bg-workspace rounded-xl">
              <Calendar className="w-6 h-6 text-text-muted" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-0.5">
                History
              </div>
              <div className="text-xl font-bold text-secondary leading-normal">Jan 2024</div>
            </div>
          </div>
          <div className="text-[13px] font-semibold text-text-muted">
            2.1 years active
          </div>
        </div>
      </div>

      {/* Recent Predictions - Placeholder for future implementation */}
      <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight text-secondary mb-8">
          Recent Predictions
        </h2>
        <div className="text-center py-20 bg-workspace/30 rounded-xl border border-dashed border-border">
          <Award className="w-12 h-12 text-text-muted/20 mx-auto mb-4" />
          <p className="text-sm font-semibold text-text-muted">Prediction history feed is currently being processed</p>
        </div>
      </div>
    </div>
  )
}
