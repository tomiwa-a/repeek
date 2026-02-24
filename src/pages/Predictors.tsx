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
    <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-secondary leading-tight">
              Top Predictors
            </h1>
            <p className="text-sm font-medium text-text-muted">The best performing pickers on the platform</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 p-1 bg-white border border-border rounded-xl shadow-sm self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-[13px] font-semibold rounded-lg transition-all ${
              filter === 'all' 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'text-text-muted hover:bg-workspace hover:text-secondary'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-1.5 text-[13px] font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              filter === 'featured' 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'text-text-muted hover:bg-workspace hover:text-secondary'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Featured
          </button>
          <button
            onClick={() => setFilter('premium')}
            className={`px-4 py-1.5 text-[13px] font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              filter === 'premium' 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'text-text-muted hover:bg-workspace hover:text-secondary'
            }`}
          >
            💎 Premium
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Community</span>
          </div>
          <div className="text-3xl font-bold text-secondary mb-1">{mockPredictors.length}</div>
          <div className="text-[13px] font-medium text-text-muted">Total Predictors</div>
        </div>
        
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Trophy className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Total Output</span>
          </div>
          <div className="text-3xl font-bold text-secondary mb-1">
            {mockPredictors.reduce((sum, p) => sum + p.totalPredictions, 0).toLocaleString()}
          </div>
          <div className="text-[13px] font-medium text-text-muted">Verified Predictions</div>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/5 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Precision</span>
          </div>
          <div className="text-3xl font-bold text-secondary mb-1">
            {(mockPredictors.reduce((sum, p) => sum + p.winRate, 0) / mockPredictors.length).toFixed(1)}%
          </div>
          <div className="text-[13px] font-medium text-text-muted">Avg Success Rate</div>
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
