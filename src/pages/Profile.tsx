import { mockPredictors } from '../data/mockPredictors'
import { TrendingUp, TrendingDown, Target, Award, Calendar } from 'lucide-react'

export default function Profile() {
  // Show the first predictor's profile as example
  const user = mockPredictors[0]

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
      {/* Profile Header */}
      <div className="compact-card mb-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="font-black text-white text-3xl">
              {user.displayName.substring(0, 2).toUpperCase()}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-white">{user.username}</h1>
              {user.isPremium && <span className="text-2xl">💎</span>}
              {user.isFeatured && (
                <span className="stat-badge bg-primary/20 text-primary border-primary/30">
                  Featured
                </span>
              )}
            </div>
            <p className="text-text-muted mb-4">{user.displayName}</p>
            
            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-4">
              {user.specialties.map((specialty, index) => (
                <span key={index} className="neutral-badge">
                  {specialty}
                </span>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6">
              <div>
                <span className="text-2xl font-black text-white">
                  {user.followers.toLocaleString()}
                </span>
                <span className="text-sm text-text-muted ml-2">followers</span>
              </div>
              <div>
                <span className="text-2xl font-black text-white">{user.totalPredictions}</span>
                <span className="text-sm text-text-muted ml-2">predictions</span>
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <button className="bg-primary text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-background transition-all">
            Follow
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Win Rate */}
        <div className="compact-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-600/20 rounded">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider">Win Rate</div>
              <div className="text-3xl font-black text-green-400">{user.winRate.toFixed(1)}%</div>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Wins: {user.wins}</span>
            <span className="text-text-muted">Losses: {user.losses}</span>
          </div>
        </div>

        {/* Current Streak */}
        <div className="compact-card">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded ${
              user.streakType === 'win' ? 'bg-green-600/20' : 'bg-red-600/20'
            }`}>
              {user.streakType === 'win' ? (
                <TrendingUp className="w-6 h-6 text-green-400" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-400" />
              )}
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider">
                Current Streak
              </div>
              <div className={`text-3xl font-black ${
                user.streakType === 'win' ? 'text-green-400' : 'text-red-400'
              }`}>
                {user.streak}
              </div>
            </div>
          </div>
          <div className="text-sm text-text-muted capitalize">
            {user.streakType === 'win' ? '🔥 On fire!' : 'Keep pushing'}
          </div>
        </div>

        {/* Total Predictions */}
        <div className="compact-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/20 rounded">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider">
                Total Predictions
              </div>
              <div className="text-3xl font-black text-white">{user.totalPredictions}</div>
            </div>
          </div>
          <div className="text-sm text-text-muted">
            Avg odds: {(Math.random() * 2 + 1.5).toFixed(2)}
          </div>
        </div>

        {/* Member Since */}
        <div className="compact-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-slate-600/20 rounded">
              <Calendar className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider">
                Member Since
              </div>
              <div className="text-xl font-black text-white">Jan 2024</div>
            </div>
          </div>
          <div className="text-sm text-text-muted">
            2 years active
          </div>
        </div>
      </div>

      {/* Recent Predictions */}
      <div className="compact-card">
        <h2 className="text-xl font-black uppercase tracking-tight text-white mb-4">
          Recent Predictions
        </h2>
        <div className="text-center py-12 text-text-muted">
          <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Prediction history coming soon...</p>
        </div>
      </div>
    </div>
  )
}
