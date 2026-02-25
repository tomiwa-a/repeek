import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockGames } from '../data/mockGames'
import { 
  ChevronLeft, 
  Activity, 
  Target, 
  Zap, 
  TrendingUp, 
  Clock,
  Share2,
  ChevronRight,
  Plus,
  Filter,
  Search
} from 'lucide-react'
import { useUI } from '../context/UIContext'
import SlipListItem from '../components/SlipListItem'
import type { Slip } from '../data/mockSlips'

interface MatchDetailProps {
  slips?: Slip[]
}

export default function MatchDetail({ slips = [] }: MatchDetailProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addLegToBuilder, openSlipBuilder } = useUI()
  
  // Slips filtering & pagination
  const [slipPage, setSlipPage] = useState(1)
  const itemsPerPage = 5
  const [searchTerm, setSearchTerm] = useState('')

  const matchSlips = useMemo(() => {
    return slips.filter(slip => 
      slip.legs.some(leg => leg.game.id === id)
    )
  }, [slips, id])

  const filteredMatchSlips = useMemo(() => {
    if (!searchTerm) return matchSlips
    const term = searchTerm.toLowerCase()
    return matchSlips.filter(s => 
      s.title.toLowerCase().includes(term) ||
      s.predictor.username.toLowerCase().includes(term)
    )
  }, [matchSlips, searchTerm])

  const paginatedSlips = useMemo(() => {
    const start = (slipPage - 1) * itemsPerPage
    return filteredMatchSlips.slice(start, start + itemsPerPage)
  }, [filteredMatchSlips, slipPage])

  const totalPages = Math.ceil(filteredMatchSlips.length / itemsPerPage)

  const game = useMemo(() => {
    return mockGames.find(g => g.id === id) || mockGames[0]
  }, [id])

  const stats = [
    { label: 'POSSESSION', home: '54%', away: '46%', icon: Activity },
    { label: 'SHOTS_ON_TARGET', home: '6', away: '4', icon: Target },
    { label: 'CORNER_KICKS', home: '8', away: '3', icon: TrendingUp },
    { label: 'EXPECTED_GOALS', home: '2.14', away: '1.42', icon: Zap },
  ]

  const markets = [
    { label: 'HOME_WIN [1]', odds: '2.10', trend: 'up' },
    { label: 'DRAW [X]', odds: '3.40', trend: 'down' },
    { label: 'AWAY_WIN [2]', odds: '3.20', trend: 'stable' }
  ]

  return (
    <div className="max-w-[1400px] mx-auto min-h-screen bg-white font-sans antialiased pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b-2 border-obsidian px-4 md:px-8 py-4 flex items-center justify-between text-obsidian">
        <button 
          onClick={() => navigate('/live')}
          className="flex items-center gap-2 group"
        >
          <div className="p-1.5 border border-obsidian/10 group-hover:bg-obsidian group-hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black italic uppercase tracking-widest text-obsidian/40 group-hover:text-obsidian transition-colors">BACK_TO_LIVE_PROTOCOLS</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
             <div className="text-[8px] font-black text-obsidian/30 uppercase italic">MATCH_ID</div>
             <div className="text-[10px] font-black italic text-obsidian uppercase whitespace-nowrap">{game.id}</div>
          </div>
          <button className="p-2 border border-obsidian/10 hover:bg-workspace transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero: Score & Teams */}
      <section className="px-4 md:px-8 py-10 bg-obsidian text-white relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-6xl">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <span className="px-2 py-0.5 bg-accent text-obsidian text-[10px] font-black italic rounded-sm">{game.league.toUpperCase()}</span>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-[10px] font-black italic tracking-widest text-accent uppercase">
                {game.isLive ? 'LIVE_STREAM_ACTIVE' : 'PRE_MATCH_DOCKET'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 md:gap-16 flex-col md:flex-row mb-12">
            {/* Home Team */}
            <div className="flex-1 text-center md:text-right space-y-2 md:space-y-4">
              <div className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">{game.homeTeam}</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] italic">HOST_ENTITY</div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-4 shrink-0 order-first md:order-none mb-8 md:mb-0">
               <div className="flex items-center gap-3">
                  <div className="text-5xl md:text-8xl font-black italic tracking-tighter bg-white/5 border border-white/10 px-4 md:px-6 py-2 rounded-lg text-white">
                    {game.homeScore ?? 0}
                  </div>
                  <div className="text-2xl font-black text-white/20 italic">:</div>
                  <div className="text-5xl md:text-8xl font-black italic tracking-tighter bg-white/5 border border-white/10 px-4 md:px-6 py-2 rounded-lg text-white">
                    {game.awayScore ?? 0}
                  </div>
               </div>
               <div className="bg-accent/10 border border-accent/20 px-4 py-1.5 flex items-center gap-2 text-accent">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-black italic tabular-nums">{game.matchTime || '00:00'}</span>
               </div>
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center md:text-left space-y-2 md:space-y-4">
              <div className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">{game.awayTeam}</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] italic">VISITOR_ENTITY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Two Columns Swapped */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Main Stage): COMMUNITY_SLIPS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between text-obsidian">
               <h3 className="text-[12px] font-black italic uppercase tracking-widest">COMMUNITY_SIGNALS_FEED</h3>
               <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-obsidian/20" />
                    <span className="text-[10px] font-black italic uppercase text-obsidian/40">ALPHA_SORTED</span>
                 </div>
               </div>
            </div>

            {/* Inner Search/Filter */}
            <div className="relative group text-obsidian">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/20 group-focus-within:text-accent transition-colors" />
               <input 
                 type="text" 
                 value={searchTerm}
                 onChange={(e) => { setSearchTerm(e.target.value); setSlipPage(1); }}
                 placeholder="RESEARCH_PREDICTORS_OR_STRATEGIES..." 
                 className="w-full bg-workspace border-2 border-obsidian/10 focus:border-obsidian px-12 py-4 text-[11px] font-black uppercase italic outline-none transition-all placeholder:text-obsidian/20" 
               />
            </div>

            <div className="flex flex-col gap-3">
               {paginatedSlips.length > 0 ? (
                 paginatedSlips.map(slip => (
                   <SlipListItem key={slip.id} slip={slip} />
                 ))
               ) : (
                 <div className="py-24 text-center bg-workspace border-2 border-dashed border-obsidian/5">
                   <p className="text-[11px] font-black text-obsidian/20 uppercase italic italic tracking-[0.3em]">ZERO_SIGNALS_LOGGED_FOR_THIS_ENTITY</p>
                 </div>
               )}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="bg-obsidian text-white p-5 flex items-center justify-between border-t-4 border-accent">
                <span className="text-[10px] font-black italic text-accent uppercase tracking-widest">
                  TOTAL_SIGNALS: {filteredMatchSlips.length}
                </span>
                <div className="flex items-center gap-6">
                  <button 
                    disabled={slipPage === 1}
                    onClick={() => setSlipPage(p => p - 1)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest hover:text-accent transition-colors disabled:opacity-20"
                  >
                    <ChevronLeft className="w-4 h-4" /> PREV
                  </button>
                  <div className="flex items-center bg-white/10 px-4 py-1.5 border border-white/10">
                    <span className="text-[11px] font-black italic uppercase tracking-tighter">
                      PAGE {slipPage} // {totalPages}
                    </span>
                  </div>
                  <button 
                    disabled={slipPage === totalPages}
                    onClick={() => setSlipPage(p => p + 1)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest hover:text-accent transition-colors disabled:opacity-20"
                  >
                    NEXT <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar): Markets & Stats */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            
            {/* 1. REALTIME_MARKETS (Moved above stats) */}
            <div className="bg-white border-2 border-obsidian shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-obsidian text-white px-4 py-2.5 flex items-center justify-between">
                <span className="text-[10px] font-black italic uppercase tracking-widest text-accent">REALTIME_MARKETS</span>
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="p-4 space-y-2.5">
                {markets.map(market => (
                  <div key={market.label} className="flex items-center justify-between p-3 bg-workspace border border-obsidian/5 hover:border-obsidian transition-all cursor-pointer group text-obsidian">
                    <span className="text-[9px] font-black italic text-obsidian/40 group-hover:text-obsidian uppercase">{market.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[18px] font-black italic text-obsidian tracking-tighter leading-none">@{market.odds}</span>
                      <div className={`p-1 border ${
                         market.trend === 'up' ? 'border-green-500 text-green-500' : 
                         market.trend === 'down' ? 'border-red-500 text-red-500' : 
                         'border-obsidian/20 text-obsidian/20'
                       }`}>
                         {market.trend === 'up' ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingUp className="w-2.5 h-2.5 rotate-180" />}
                       </div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => {
                    addLegToBuilder(game);
                    openSlipBuilder();
                  }}
                  className="w-full mt-4 bg-accent text-obsidian font-black py-4 border-2 border-obsidian shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0 transition-all flex items-center justify-center gap-2 uppercase italic text-xs tracking-widest"
                >
                  <Plus className="w-4 h-4" /> ADD_TO_SLIP
                </button>
              </div>
            </div>

            {/* 2. TECHNICAL_MATRICES (Moved below markets) */}
            <div className="bg-workspace p-5 border-b-4 border-obsidian relative overflow-hidden">
               <div className="flex items-center gap-3 mb-4">
                 <Activity className="w-4 h-4 text-obsidian" />
                 <h2 className="text-[11px] font-black italic uppercase tracking-widest text-obsidian">TECHNICAL_MATRICES</h2>
               </div>
               <div className="space-y-4">
                {stats.map(stat => (
                  <div key={stat.label} className="bg-white border border-obsidian/10 p-3 space-y-2 group hover:border-obsidian transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-obsidian/40 uppercase italic tracking-widest">{stat.label}</span>
                    </div>
                    <div className="flex items-end justify-between">
                       <span className="text-[16px] font-black italic text-obsidian leading-none">{stat.home}</span>
                       <div className="flex-1 h-[2px] bg-obsidian/5 mx-3 mb-1.5 relative overflow-hidden">
                          <div 
                            className="absolute h-full bg-obsidian/40" 
                            style={{ width: stat.home }}
                          ></div>
                       </div>
                       <span className="text-[16px] font-black italic text-obsidian leading-none">{stat.away}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </main>
    </div>
  )
}
