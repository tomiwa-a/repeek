import { mockPredictors } from '../data/mockPredictors'
import PredictorCard from '../components/PredictorCard'
import { Trophy, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'

export default function Predictors() {
  const [filter, setFilter] = useState<'all' | 'featured' | 'premium'>('all')

  const filteredPredictors = mockPredictors.filter(predictor => {
    if (filter === 'featured') return predictor.isFeatured
    if (filter === 'premium') return predictor.isPremium
    return true
  })

  const sortedPredictors = [...filteredPredictors].sort((a, b) => b.winRate - a.winRate)

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">
            Top Predictors
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
        <button
          onClick={() => setFilter('all')}
          className={`text-sm font-bold uppercase tracking-wider transition-colors ${
            filter === 'all' ? 'text-primary' : 'text-text-muted hover:text-white'
          }`}
        >
          All Predictors
        </button>
        <button
          onClick={() => setFilter('featured')}
          className={`text-sm font-bold uppercase tracking-wider transition-colors ${
            filter === 'featured' ? 'text-primary' : 'text-text-muted hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-1" />
          Featured
        </button>
        <button
          onClick={() => setFilter('premium')}
          className={`text-sm font-bold uppercase tracking-wider transition-colors ${
            filter === 'premium' ? 'text-primary' : 'text-text-muted hover:text-white'
          }`}
        >
          💎 Premium
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="compact-card text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-black text-white">{mockPredictors.length}</div>
          <div className="text-xs text-text-muted uppercase tracking-wider">Total Predictors</div>
        </div>
        <div className="compact-card text-center">
          <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-black text-white">
            {mockPredictors.reduce((sum, p) => sum + p.totalPredictions, 0).toLocaleString()}
          </div>
          <div className="text-xs text-text-muted uppercase tracking-wider">Total Predictions</div>
        </div>
        <div className="compact-card text-center">
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-black text-white">
            {(mockPredictors.reduce((sum, p) => sum + p.winRate, 0) / mockPredictors.length).toFixed(1)}%
          </div>
          <div className="text-xs text-text-muted uppercase tracking-wider">Avg Win Rate</div>
        </div>
      </div>

      {/* Predictors Grid */}
      <div className="data-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedPredictors.map(predictor => (
          <PredictorCard key={predictor.id} predictor={predictor} />
        ))}
      </div>
    </div>
  )
}
