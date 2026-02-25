import { useState, useMemo } from 'react'
import { type Game } from '../data/mockGames'
import EliteGameRow from '../components/EliteGameRow'
import { Filter, ChevronRight, Activity, Search, ChevronDown, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function Live() {
  const navigate = useNavigate()
  const [activeSport, setActiveSport] = useState<string>('ALL_SPORTS')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING'>('ALL')
  const [expandedSports, setExpandedSports] = useState<string[]>([])
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  // Live Convex Data - Unified Query
  const convexData = useQuery(api.games.getGames, {
    sportKey: activeSport === 'ALL_SPORTS' ? undefined : activeSport,
    status: statusFilter,
    limit: pageSize,
    offset: (currentPage - 1) * pageSize
  })

  const convexSports = useQuery(api.sports.getActiveSports, {}) || []
  const convexGroups = useQuery(api.sports.getActiveSportGroups, {}) || []

  const toggleSport = (key: string) => {
    setExpandedSports((prev: string[]) => 
      prev.includes(key) ? prev.filter((k: string) => k !== key) : [...prev, key]
    )
    setActiveSport(key)
    setCurrentPage(1) // Reset pagination on filter change
  }

  const processedGames = useMemo(() => {
    if (!convexData) return []
    
    return convexData.games.map(g => ({
      id: g.id,
      homeTeam: g.homeTeam,
      awayTeam: g.awayTeam,
      league: g.league,
      sport: 'soccer' as const,
      startTime: new Date(g.commenceTime),
      isLive: g.isLive,
      homeScore: g.score?.home ?? 0,
      awayScore: g.score?.away ?? 0,
      matchTime: g.isLive ? "LIVE" : undefined,
      time: new Date(g.commenceTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      odds: { home: 1.85, draw: 3.40, away: 4.20 },
      predictionCount: Math.floor(Math.random() * 50) + 10,
      sportKey: g.sportKey
    })) as Game[]
  }, [convexData])

  const totalPages = Math.ceil((convexData?.total || 0) / pageSize)

  // Group sports by their "group"
  const sportsByGroup = useMemo(() => {
    const groups: Record<string, typeof convexSports> = {}
    convexSports.forEach(sport => {
      if (!groups[sport.group]) groups[sport.group] = []
      groups[sport.group].push(sport)
    })
    return groups
  }, [convexSports])

  const handleMatchClick = (id: string) => {
    navigate(`/match/${id}`)
  }

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6 bg-white font-sans antialiased min-h-screen">
      
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 space-y-4 shrink-0">
        <div className="border-2 border-obsidian bg-white p-4 space-y-6 sticky top-20">
          <div className="flex items-center gap-2 border-b border-obsidian/10 pb-3 font-black uppercase italic text-[10px]">
            <Filter className="w-3.5 h-3.5" />
            LIVE_PROTOCOLS
          </div>

          <div className="grid grid-cols-3 gap-1">
            {['ALL', 'LIVE', 'UPCOMING'].map(status => (
              <button
                key={status}
                onClick={() => { setStatusFilter(status as any); setCurrentPage(1); }}
                className={`py-2 text-[8px] font-black italic border transition-all ${
                  statusFilter === status 
                    ? 'bg-obsidian text-white border-obsidian' 
                    : 'bg-workspace text-obsidian/40 border-transparent hover:border-obsidian/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-[8px] font-black text-obsidian/40 uppercase tracking-widest italic ml-1">SPORT_NODES</label>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  setActiveSport('ALL_SPORTS')
                  setCurrentPage(1)
                }}
                className={`text-left px-3 py-2 text-[9px] font-black uppercase italic tracking-wider border transition-all flex items-center justify-between group ${
                  activeSport === 'ALL_SPORTS' 
                    ? 'bg-obsidian text-white border-obsidian' 
                    : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                }`}
              >
                ALL_SPORTS
              </button>
              
              {convexGroups.map(groupName => (
                <div key={groupName} className="space-y-1">
                  <button
                    onClick={() => toggleSport(groupName)}
                    className={`w-full text-left px-3 py-2 text-[9px] font-black uppercase italic tracking-wider border transition-all flex items-center justify-between group ${
                      activeSport === groupName 
                        ? 'bg-obsidian text-white border-obsidian' 
                        : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                       <ChevronDown className={`w-3 h-3 transition-transform ${expandedSports.includes(groupName) ? 'rotate-0' : '-rotate-90'}`} />
                       {groupName.replace(/_/g, ' ')}
                    </span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${activeSport === groupName ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </button>
                  
                  {expandedSports.includes(groupName) && sportsByGroup[groupName] && (
                    <div className="flex flex-col gap-0.5 ml-3 pl-2 border-l border-obsidian/10">
                      <button
                        onClick={() => { setActiveSport(groupName); setCurrentPage(1); }}
                        className={`text-left px-2 py-1.5 text-[8px] font-black uppercase italic tracking-widest transition-all ${
                          activeSport === groupName
                            ? 'text-obsidian' 
                            : 'text-obsidian/30 hover:text-obsidian'
                        }`}
                      >
                        ALL_{groupName.toUpperCase()}
                      </button>
                      {sportsByGroup[groupName].map(sport => (
                        <button
                          key={sport.key}
                          onClick={() => {
                            setActiveSport(sport.key)
                            setCurrentPage(1)
                          }}
                          className={`text-left px-2 py-1.5 text-[8px] font-black uppercase italic tracking-widest transition-all ${
                            activeSport === sport.key 
                              ? 'text-obsidian' 
                              : 'text-obsidian/30 hover:text-obsidian'
                          }`}
                        >
                          {sport.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Feed */}
      <main className="flex-1 space-y-4 text-obsidian">
        <div className="flex items-center justify-between border-b-2 border-obsidian pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-obsidian" />
            <h1 className="text-lg font-black italic uppercase tracking-tighter">
              LIVESCORE_FEED
            </h1>
          </div>
          {convexData && (
            <div className="text-[9px] font-black italic uppercase tracking-widest text-obsidian">{convexData.total} TOTAL_NODES_IDENTIFIED</div>
          )}
        </div>

        <div className="space-y-px bg-obsidian/5 border border-obsidian/5">
          {processedGames.length > 0 ? (
            processedGames.map(game => (
              <div key={game.id} onClick={() => handleMatchClick(game.id)} className="cursor-pointer">
                <EliteGameRow game={game} />
              </div>
            ))
          ) : (
            <div className="py-32 text-center bg-white border border-obsidian/10 flex flex-col items-center gap-4">
              <Search className="w-8 h-8 text-obsidian/5" />
              <p className="text-[10px] font-black italic uppercase text-obsidian/20 tracking-widest">
                NO_SIGNALS_FOUND_IN_PROTOCOL
              </p>
            </div>
          )}
        </div>

        {/* Global Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-8 border-t border-obsidian/5">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 border border-obsidian hover:bg-obsidian hover:text-white transition-all disabled:opacity-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-[10px] font-black italic uppercase tracking-widest">
              NODE_BUCKET_{currentPage}_OF_{totalPages}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 border border-obsidian hover:bg-obsidian hover:text-white transition-all disabled:opacity-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
