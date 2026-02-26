import { mockPredictors } from '../data/mockPredictors'
import PredictorCard from '../components/PredictorCard'
import { Trophy, Users, Search, Filter, ChevronRight, Activity, Zap, Shield } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function Predictors() {
  const [activeSport, setActiveSport] = useState<string>('ALL_SPORTS')
  const [minAccuracy, setMinAccuracy] = useState<number>(0)
  const [oddsRange, setOddsRange] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPredictors = useMemo(() => {
    return mockPredictors.filter(predictor => {
      const matchesSearch = predictor.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            predictor.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesAccuracy = predictor.winRate >= minAccuracy
      const matchesSport = activeSport === 'ALL_SPORTS' || predictor.specialties.some(s => s.toUpperCase().includes(activeSport))
      
      // Simulating odds range since it's not in the mock data yet
      // In a real app, this would be a real field on the predictor or their active slips
      const matchesOdds = oddsRange === 'ALL' || true 

      return matchesSearch && matchesAccuracy && matchesSport && matchesOdds
    }).sort((a, b) => b.winRate - a.winRate)
  }, [searchQuery, minAccuracy, activeSport, oddsRange])

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-6 flex flex-col h-full bg-white font-sans selection:bg-accent selection:text-obsidian">
      
      {/* Top Protocol Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-obsidian text-white p-4 relative group overflow-hidden">
          <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1 italic">NETWORK_NODES</div>
              <div className="text-3xl font-black italic leading-none">{mockPredictors.length}</div>
            </div>
            <Users className="w-5 h-5 text-accent/20 group-hover:text-accent transition-colors" />
          </div>
        </div>
        
        <div className="bg-white border-2 border-obsidian p-4 group relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="text-[8px] font-black text-obsidian/30 uppercase tracking-[0.2em] mb-1 italic">VERIFIED_SIGNALS</div>
              <div className="text-3xl font-black italic text-obsidian leading-none">
                {mockPredictors.reduce((sum, p) => sum + p.totalSlips, 0).toLocaleString()}
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
                {(mockPredictors.reduce((sum, p) => sum + p.winRate, 0) / mockPredictors.length).toFixed(1)}%
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

            {/* Odds Range */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-black text-obsidian/40 uppercase tracking-widest italic">RISK_PROTOCOL (ODDS)</label>
              <div className="grid grid-cols-3 gap-1">
                {['ALL', 'LOW', 'HIGH'].map(range => (
                  <button
                    key={range}
                    onClick={() => setOddsRange(range)}
                    className={`py-1.5 text-[9px] font-black italic border transition-all ${
                      oddsRange === range 
                        ? 'bg-obsidian text-white border-obsidian' 
                        : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-accent text-obsidian p-3 border-2 border-obsidian group cursor-pointer overflow-hidden relative">
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
            <div className="relative z-10 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase italic tracking-widest">BECOME_PREDICTOR</span>
            </div>
          </div>
        </aside>

        {/* Leaderboard Feed */}
        <main className="flex-1 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-obsidian pb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-obsidian" />
              <h2 className="text-sm font-black italic uppercase tracking-tighter">ELITE_ANALYSIS_NODES</h2>
            </div>
            <div className="text-[9px] font-black text-obsidian/40 italic uppercase tracking-widest">
              RESULTS_RETURNED: {filteredPredictors.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredPredictors.map(predictor => (
              <PredictorCard key={predictor.id} predictor={predictor} />
            ))}
          </div>

          {filteredPredictors.length === 0 && (
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
