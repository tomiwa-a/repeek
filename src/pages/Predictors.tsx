import { useQuery, useConvexAuth } from 'convex/react'
import { api } from '../../convex/_generated/api'
import PredictorCard from '../components/PredictorCard'
import { Trophy, Users, Search, Filter, ChevronRight, Activity, Zap, Shield, Loader2 } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Predictor } from '../types/slips'

export default function Predictors() {
  const navigate = useNavigate()
  const { isAuthenticated } = useConvexAuth()
  const [activeSport, setActiveSport] = useState<string>('ALL_SPORTS')
  const [minAccuracy, setMinAccuracy] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'winRate' | 'roi' | 'totalSlips'>('winRate')

  const livePredictors = useQuery(api.leaderboard.getTopAnalysts, { 
    sortBy, 
    sportKey: activeSport !== 'ALL_SPORTS' ? activeSport : undefined 
  })
  
  const isLoading = livePredictors === undefined

  const predictors = useMemo(() => {
    if (!livePredictors) return []
    return livePredictors.filter(predictor => {
      const matchesSearch = (predictor.username || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (predictor.displayName || "").toLowerCase().includes(searchQuery.toLowerCase())
      const matchesAccuracy = predictor.winRate >= minAccuracy
      
      return matchesSearch && matchesAccuracy
    })
  }, [livePredictors, searchQuery, minAccuracy])

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-6 flex flex-col h-full bg-white font-sans selection:bg-accent selection:text-obsidian">
      
      {/* Top Protocol Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-obsidian text-white p-4 relative group overflow-hidden">
          <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1 italic">NETWORK_NODES</div>
              <div className="text-3xl font-black italic leading-none">
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin opacity-20" /> : predictors.length}
              </div>
            </div>
            <Users className="w-5 h-5 text-accent/20 group-hover:text-accent transition-colors" />
          </div>
        </div>
        
        <div className="bg-white border-2 border-obsidian p-4 group relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="text-[8px] font-black text-obsidian/30 uppercase tracking-[0.2em] mb-1 italic">TOTAL_NETWORK_SLIPS</div>
              <div className="text-3xl font-black italic text-obsidian leading-none">
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin opacity-20" /> : 
                  predictors.reduce((sum: number, p: Predictor) => sum + p.totalSlips, 0).toLocaleString()}
              </div>
            </div>
            <Zap className="w-5 h-5 text-obsidian/10 group-hover:text-obsidian transition-colors" />
          </div>
        </div>

        <div className="bg-white border-2 border-obsidian p-4 group relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="text-[8px] font-black text-obsidian/30 uppercase tracking-[0.2em] mb-1 italic">AVG_PRECISION</div>
              <div className="text-3xl font-black italic text-obsidian leading-none">
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin opacity-20" /> : 
                  predictors.length > 0 ? (predictors.reduce((sum: number, p: Predictor) => sum + p.winRate, 0) / predictors.length).toFixed(1) + '%' : '0.0%'}
              </div>
            </div>
            <Activity className="w-5 h-5 text-obsidian/10 group-hover:text-obsidian transition-colors" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-4 shrink-0">
          <div className="border-2 border-obsidian bg-white p-4 space-y-6">
            <div className="flex items-center gap-2 border-b border-obsidian/10 pb-3">
              <Filter className="w-3.5 h-3.5 text-obsidian" />
              <h3 className="text-[10px] font-black uppercase italic tracking-widest leading-none">FILTER_PROTOCOL</h3>
            </div>

            {/* Sorting */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-black text-obsidian/40 uppercase tracking-widest italic">RANKING_CRITERIA</label>
              <div className="flex flex-col gap-1">
                {[
                  { id: 'winRate', label: 'WIN_RATE' },
                  { id: 'roi', label: 'ROI_ALPHA' },
                  { id: 'totalSlips', label: 'TOTAL_SLIPS' }
                ].map(sort => (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id as any)}
                    className={`text-left px-2.5 py-2 text-[9px] font-black uppercase italic tracking-wider border transition-all flex items-center justify-between group ${
                      sortBy === sort.id 
                        ? 'bg-obsidian text-white border-obsidian' 
                        : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                    }`}
                  >
                    {sort.label}
                    <div className={`w-1 h-1 rounded-full bg-accent ${sortBy === sort.id ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-black text-obsidian/40 uppercase tracking-widest italic">NODE_SEARCH</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-obsidian/30" />
                <input 
                  type="text"
                  placeholder="USERNAME..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-workspace border border-obsidian/10 py-2 pl-8 pr-3 text-[10px] font-black italic uppercase focus:outline-none focus:border-obsidian transition-colors"
                />
              </div>
            </div>

            {/* Sport Filter */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-black text-obsidian/40 uppercase tracking-widest italic">SPECIALTY_CORE</label>
              <div className="flex flex-col gap-1">
                {['ALL_SPORTS', 'PREMIER LEAGUE', 'LA LIGA', 'CHAMPIONS LEAGUE', 'SERIE A'].map(sport => (
                  <button
                    key={sport}
                    onClick={() => setActiveSport(sport)}
                    className={`text-left px-2.5 py-2 text-[9px] font-black uppercase italic tracking-wider border transition-all flex items-center justify-between group ${
                      activeSport === sport 
                        ? 'bg-obsidian text-white border-obsidian' 
                        : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                    }`}
                  >
                    {sport}
                    <ChevronRight className={`w-3 h-3 transition-transform ${activeSport === sport ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Accuracy Filter */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-black text-obsidian/40 uppercase tracking-widest italic">PRECISION_MIN_GATE</label>
              <div className="grid grid-cols-2 gap-1">
                {[0, 75, 80, 85].map(val => (
                  <button
                    key={val}
                    onClick={() => setMinAccuracy(val)}
                    className={`py-1.5 text-[9px] font-black italic border transition-all ${
                      minAccuracy === val 
                        ? 'bg-obsidian text-white border-obsidian' 
                        : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                    }`}
                  >
                    {val === 0 ? 'ALL' : `${val}%+`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <div 
              onClick={() => navigate('/register')}
              className="bg-accent text-obsidian p-3 border-2 border-obsidian group cursor-pointer overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
              <div className="relative z-10 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase italic tracking-widest">BECOME_PREDICTOR</span>
              </div>
            </div>
          )}
        </aside>

        {/* Leaderboard Feed */}
        <main className="flex-1 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-obsidian pb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-obsidian" />
              <h2 className="text-sm font-black italic uppercase tracking-tighter">ELITE_ANALYSIS_NODES</h2>
            </div>
            <div className="text-[9px] font-black text-obsidian/40 italic uppercase tracking-widest">
              RESULTS_RETURNED: {isLoading ? '...' : predictors.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-64 bg-workspace border-2 border-obsidian/5 animate-pulse" />
              ))
            ) : (
              predictors.map((predictor: Predictor) => (
                <PredictorCard key={predictor.id} predictor={predictor} />
              ))
            )}
          </div>

          {!isLoading && predictors.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-obsidian/10">
              <Search className="w-8 h-8 text-obsidian/10 mx-auto mb-3" />
              <div className="text-[10px] font-black text-obsidian/40 uppercase italic tracking-widest">NO_OPERATORS_MATCH_PROTOCOL</div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
