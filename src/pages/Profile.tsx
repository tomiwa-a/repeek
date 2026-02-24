import { useState, useMemo } from 'react'
import { mockPredictors } from '../data/mockPredictors'
import { 
  Target, 
  Share2, UserPlus, BarChart3, 
  ChevronLeft, ChevronRight, Filter, Search,
  Trophy, Clock, Activity, Plus
} from 'lucide-react'
import { useUI } from '../context/UIContext'

import SlipListItem from '../components/SlipListItem'
import type { Slip } from '../data/mockSlips'

export default function Profile({ slips = [] }: { slips?: Slip[] }) {
  const user = mockPredictors[0]
  const { openSlipBuilder } = useUI()
  const [activeTab, setActiveTab] = useState<'ongoing' | 'previous' | 'analysis'>('ongoing')
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  
  // Advanced Filters State
  const [searchTerm, setSearchTerm] = useState('')
  const [sportFilter, setSportFilter] = useState<'all' | 'soccer' | 'basketball' | 'football'>('all')

  const userSlips = useMemo(
    () => slips.filter(s => s.predictor.id === user.id),
    [slips, user.id]
  )

  const ongoingTipsTotal = useMemo(() => userSlips.filter(s => s.status === 'pending').length, [userSlips])
  const previousTipsTotal = useMemo(() => userSlips.filter(s => s.status !== 'pending').length, [userSlips])

  const filteredSlips = useMemo(() => {
    let list = userSlips
    
    // Tab Filter
    if (activeTab === 'ongoing') list = list.filter(s => s.status === 'pending')
    if (activeTab === 'previous') list = list.filter(s => s.status !== 'pending')
    
    // Search Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      list = list.filter(s => 
        s.title.toLowerCase().includes(term) ||
        s.legs.some(leg => 
          leg.game.homeTeam.toLowerCase().includes(term) || 
          leg.game.awayTeam.toLowerCase().includes(term) ||
          leg.game.league.toLowerCase().includes(term)
        )
      )
    }
    
    // Sport Filter
    if (sportFilter !== 'all') {
      list = list.filter(s => s.legs.some(leg => leg.game.sport === sportFilter))
    }
    
    return list
  }, [userSlips, activeTab, searchTerm, sportFilter])

  const paginatedSlips = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return filteredSlips.slice(start, start + itemsPerPage)
  }, [filteredSlips, page, itemsPerPage])

  const totalPages = Math.ceil(filteredSlips.length / itemsPerPage)

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR: INFO & STATS */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Identity Card - Fixed Name Visibility */}
          <div className="bg-obsidian p-8 border-b-8 border-accent relative overflow-hidden">
            <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white border-2 border-accent flex items-center justify-center -rotate-2">
                  <span className="font-black text-obsidian text-3xl italic">
                    {user.username.charAt(1).toUpperCase()}
                  </span>
                </div>
                <div>
                  {/* Explicit text-white for maximum contrast */}
                  <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-2 text-white shadow-sm">
                    {user.username}
                  </h1>
                  {user.isPremium && <span className="bg-accent text-obsidian px-2 py-0.5 text-[9px] font-black italic">ELITE_OPERATOR</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <div className="text-accent text-xl font-black italic leading-none">{user.followers.toLocaleString()}</div>
                  <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-1">FOLLOWERS</div>
                </div>
                <div>
                  <div className="text-white text-xl font-black italic leading-none">{user.totalPredictions}</div>
                  <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-1">TOTAL PICKS</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 btn-volt py-3 text-xs tracking-widest flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" /> CONNECT
                </button>
                <button className="bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-colors">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>

              <button 
                onClick={openSlipBuilder}
                className="w-full bg-accent text-obsidian font-black py-4 px-6 border-2 border-obsidian flex items-center justify-center gap-3 hover:bg-obsidian hover:text-accent transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                <span className="text-xs tracking-[0.2em] italic">PROPOSE_NEW_SLIP</span>
              </button>
            </div>
          </div>

          {/* Compact 2x2 Stats Grid */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-obsidian/40 uppercase tracking-[0.2em] px-2 italic">PERFORMANCE_SUMMARY</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Success Rate */}
              <div className="bg-white border-2 border-obsidian p-4 shadow-sm group hover:border-accent transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <Target className="w-3.5 h-3.5 text-obsidian/40 group-hover:text-obsidian transition-colors" />
                  <span className="text-[8px] font-black text-text-muted uppercase italic">STRIKE</span>
                </div>
                <div className="text-xl font-black italic text-obsidian">{user.winRate.toFixed(1)}%</div>
                <div className="text-[9px] font-bold text-zinc-400 uppercase mt-1">{user.wins}W / {user.losses}L</div>
              </div>

              {/* Trend */}
              <div className="bg-white border-2 border-obsidian p-4 shadow-sm group">
                <div className="flex justify-between items-center mb-2">
                  <Activity className="w-3.5 h-3.5 text-obsidian/40 group-hover:text-obsidian transition-colors" />
                  <span className="text-[8px] font-black text-text-muted uppercase italic">TREND</span>
                </div>
                <div className={`text-xl font-black italic mb-0 ${user.streakType === 'win' ? 'text-obsidian' : 'text-red-900'}`}>
                  {user.streak}{user.streakType[0].toUpperCase()}
                </div>
                <div className="text-[8px] font-black text-accent uppercase italic mt-1">
                  {user.streakType === 'win' ? 'ON FIRE' : 'VARIANCE'}
                </div>
              </div>

              {/* Ranking */}
              <div className="bg-white border-2 border-obsidian p-4 shadow-sm group">
                <div className="flex justify-between items-center mb-2">
                  <Trophy className="w-3.5 h-3.5 text-obsidian/40 group-hover:text-obsidian transition-colors" />
                  <span className="text-[8px] font-black text-text-muted uppercase italic">RANK</span>
                </div>
                <div className="text-xl font-black italic text-obsidian">#14B</div>
                <div className="text-[8px] font-black text-zinc-400 uppercase italic mt-1">TOP 1.5%</div>
              </div>

              {/* Service */}
              <div className="bg-white border-2 border-obsidian p-4 shadow-sm group">
                <div className="flex justify-between items-center mb-2">
                  <Clock className="w-3.5 h-3.5 text-obsidian/40 group-hover:text-obsidian transition-colors" />
                  <span className="text-[8px] font-black text-text-muted uppercase italic">TENURE</span>
                </div>
                <div className="text-xl font-black italic text-obsidian">2.1Y</div>
                <div className="text-[8px] font-black text-zinc-400 uppercase italic mt-1">EST. 2024</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN AREA: TABS & FEEDS */}
        <main className="lg:col-span-8 space-y-6">
          {/* Tab Switcher */}
          <div className="bg-white border-2 border-obsidian">
            <div className="flex border-b-2 border-obsidian bg-workspace/50 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => { setActiveTab('ongoing'); setPage(1); }}
                className={`flex-1 min-w-[120px] px-6 py-4 text-xs font-black uppercase italic tracking-widest transition-all ${
                  activeTab === 'ongoing' ? 'bg-obsidian text-accent' : 'text-obsidian hover:bg-workspace'
                }`}
              >
                ONGOING <span className="text-[10px] ml-1 opacity-50">[{ongoingTipsTotal}]</span>
              </button>
              <button 
                onClick={() => { setActiveTab('previous'); setPage(1); }}
                className={`flex-1 min-w-[120px] px-6 py-4 text-xs font-black uppercase italic tracking-widest transition-all border-x-2 border-obsidian ${
                  activeTab === 'previous' ? 'bg-obsidian text-accent' : 'text-obsidian hover:bg-workspace'
                }`}
              >
                HISTORY <span className="text-[10px] ml-1 opacity-50">[{previousTipsTotal}]</span>
              </button>
              <button 
                onClick={() => { setActiveTab('analysis'); setPage(1); }}
                className={`flex-1 min-w-[120px] px-6 py-4 text-xs font-black uppercase italic tracking-widest transition-all ${
                  activeTab === 'analysis' ? 'bg-obsidian text-accent' : 'text-obsidian hover:bg-workspace'
                }`}
              >
                AUDIT_LOG
              </button>
            </div>

            {/* Advanced Filter Bar */}
            {(activeTab === 'ongoing' || activeTab === 'previous') && (
              <div className="bg-white p-4 flex flex-wrap items-center gap-4 border-b border-obsidian/5">
                {/* Search */}
                <div className="flex-1 min-w-[200px] relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/20 group-focus-within:text-accent transition-colors" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    placeholder="SEARCH_TEAM_OR_MARKET..." 
                    className="w-full bg-workspace border-2 border-obsidian/5 focus:border-obsidian px-10 py-2.5 text-[10px] font-black uppercase italic outline-none transition-all placeholder:text-obsidian/20" 
                  />
                </div>

                {/* Sport Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-obsidian/40 uppercase italic">SPORT:</span>
                  <div className="flex bg-workspace border-2 border-obsidian/5 p-1 rounded-sm">
                    {['all', 'soccer', 'basketball'].map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSportFilter(s as any); setPage(1); }}
                        className={`px-3 py-1 text-[9px] font-black uppercase italic transition-all ${
                          sportFilter === s ? 'bg-obsidian text-white' : 'text-obsidian/40 hover:text-obsidian'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Trigger / Export */}
                <button className="bg-obsidian text-white p-2.5 hover:bg-accent hover:text-obsidian transition-all group">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Content Feed */}
            <div className="p-1 min-h-[500px]">
              {activeTab === 'analysis' ? (
                <div className="p-8 space-y-8">
                  <div className="bg-obsidian text-white p-8 border-l-8 border-accent relative">
                    <div className="absolute top-4 right-4 text-[10px] font-black text-accent/40 italic uppercase italic">SYSTEM_STATUS: NOMINAL</div>
                    <div className="flex items-center gap-4 mb-8">
                      <BarChart3 className="w-6 h-6 text-accent" />
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter">TECHNICAL_AUDIT_PROTOCOL</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase italic tracking-widest">EXPECTED_V</span>
                        <div className="text-3xl font-black italic text-accent">+12.4%</div>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase italic tracking-widest">SHARPE_R</span>
                        <div className="text-3xl font-black italic text-white">1.84</div>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase italic tracking-widest">MAX_DD</span>
                        <div className="text-3xl font-black italic text-red-500">4.2%</div>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase italic tracking-widest">RELIABILITY</span>
                        <div className="text-3xl font-black italic text-white">99.8%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-workspace p-6 border-b-4 border-obsidian/10">
                      <h4 className="text-[11px] font-black uppercase italic mb-6 border-b border-obsidian/5 pb-2">STRATEGY_OVERVIEW</h4>
                      <p className="text-[11px] font-bold text-zinc-600 leading-relaxed uppercase italic">
                        DYNAMIC POSITIONING BASED ON MARKET LIQUIDITY AND XG_CONVERGENCE. <br />
                        RISK NEUTRAL PROTOCOL ACTIVATED FOR LOW VOLATILITY MARKETS.
                      </p>
                    </div>
                    <div className="bg-workspace p-6 border-b-4 border-obsidian/10">
                      <h4 className="text-[11px] font-black uppercase italic mb-6 border-b border-obsidian/5 pb-2">DATA_DISTRIBUTION</h4>
                      <div className="flex items-end gap-2 h-20 pt-4">
                        {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                          <div key={i} className="flex-1 bg-obsidian/10 relative group">
                            <div style={{ height: `${h}%` }} className="bg-obsidian group-hover:bg-accent transition-all"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {paginatedSlips.length > 0 ? (
                    paginatedSlips.map(s => <SlipListItem key={s.id} slip={s} />)
                  ) : (
                    <div className="py-24 text-center opacity-30 italic">
                      <Search className="w-16 h-16 mx-auto mb-6 opacity-5" />
                      <p className="text-sm uppercase font-black tracking-widest">ZERO_RECORDS_MATCHING_FILTER</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Digital Pagination */}
            {(activeTab === 'ongoing' || activeTab === 'previous') && filteredSlips.length > 0 && (
              <div className="bg-obsidian text-white p-5 flex items-center justify-between border-t-4 border-accent">
                <span className="text-[10px] font-black italic text-accent uppercase tracking-widest">
                  LIST_TOTAL: {filteredSlips.length} NODES
                </span>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest hover:text-accent transition-colors disabled:opacity-20"
                  >
                    <ChevronLeft className="w-4 h-4" /> PREV
                  </button>
                  <div className="flex items-center bg-white/10 px-4 py-1.5 border border-white/10">
                    <span className="text-[11px] font-black italic uppercase tracking-tighter">
                      PAGE {page} // {totalPages}
                    </span>
                  </div>
                  <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest hover:text-accent transition-colors disabled:opacity-20"
                  >
                    NEXT <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  )
}
