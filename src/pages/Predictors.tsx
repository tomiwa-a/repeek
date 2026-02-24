import { mockPredictors } from '../data/mockPredictors'
import PredictorCard from '../components/PredictorCard'
import { Trophy, TrendingUp, Users, Terminal } from 'lucide-react'
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
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-obsidian text-white flex items-center justify-center">
            <Trophy className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-obsidian leading-none mb-2">
              TOP PREDICTORS
            </h1>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest">VERIFIED PERFORMANCE METRICS</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 bg-workspace border-2 border-obsidian p-1 shadow-sm">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 text-[10px] font-black uppercase italic tracking-widest transition-all ${
              filter === 'all' 
                ? 'bg-obsidian text-white' 
                : 'text-text-muted hover:text-obsidian hover:bg-white'
            }`}
          >
            ALL OPERATORS
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-6 py-2 text-[10px] font-black uppercase italic tracking-widest transition-all flex items-center gap-2 ${
              filter === 'featured' 
                ? 'bg-obsidian text-white' 
                : 'text-text-muted hover:text-obsidian hover:bg-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            FEATURED
          </button>
          <button
            onClick={() => setFilter('premium')}
            className={`px-6 py-2 text-[10px] font-black uppercase italic tracking-widest transition-all flex items-center gap-2 ${
              filter === 'premium' 
                ? 'bg-obsidian text-white' 
                : 'text-text-muted hover:text-obsidian hover:bg-white'
            }`}
          >
            FEATURED
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-obsidian p-8 shadow-sm group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">COMMUNITY SIZE</h3>
            <Users className="w-4 h-4 text-obsidian/20 group-hover:text-accent transition-colors" />
          </div>
          <div className="text-4xl font-black italic text-obsidian mb-1 leading-none">{mockPredictors.length}</div>
          <div className="text-[10px] font-bold text-text-muted uppercase italic">TOP OPERATORS</div>
        </div>
        
        <div className="bg-white border-2 border-obsidian p-8 shadow-sm group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">TOTAL VOLUME</h3>
            <Terminal className="w-4 h-4 text-obsidian/20 group-hover:text-accent transition-colors" />
          </div>
          <div className="text-4xl font-black italic text-obsidian mb-1 leading-none">
            {mockPredictors.reduce((sum, p) => sum + p.totalPredictions, 0).toLocaleString()}
          </div>
          <div className="text-[10px] font-bold text-text-muted uppercase italic">VERIFIED PICKS</div>
        </div>

        <div className="bg-white border-2 border-obsidian p-8 shadow-sm group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">PLATFORM PRECISION</h3>
            <TrendingUp className="w-4 h-4 text-obsidian/20 group-hover:text-accent transition-colors" />
          </div>
          <div className="text-4xl font-black italic text-obsidian mb-1 leading-none">
            {(mockPredictors.reduce((sum, p) => sum + p.winRate, 0) / mockPredictors.length).toFixed(1)}%
          </div>
          <div className="text-[10px] font-bold text-text-muted uppercase italic">NETWORK AVG</div>
        </div>
      </div>

      {/* Predictors Grid */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-0.5 bg-obsidian flex-1"></div>
          <span className="text-[10px] font-black italic uppercase text-obsidian/40">LEADERBOARD</span>
          <div className="h-0.5 bg-obsidian flex-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedPredictors.map(predictor => (
            <PredictorCard key={predictor.id} predictor={predictor} />
          ))}
        </div>
      </div>
    </div>
  )
}
