import { useState, useMemo, useEffect } from 'react'
import { type Game } from '../data/mockGames'
import EliteGameRow from '../components/EliteGameRow'
import TechnicalSpinner from '../components/TechnicalSpinner'
import { Filter, ChevronRight, Activity, Search, ChevronDown, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUI } from '../context/UIContext'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function Live() {
  const navigate = useNavigate()
  const { addLegToBuilder, openSlipBuilder } = useUI()
  const [activeTab, setActiveTab] = useState<string>('ALL_SPORTS')
  const [activeSportKey, setActiveSportKey] = useState<string | null>(null)
  
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING'>('ALL')
  const [expandedSports, setExpandedSports] = useState<string[]>([])
  
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  const rawSportsFromDB = useQuery(api.sports.getActiveSports, {})
  const [cachedSports, setCachedSports] = useState<any[]>(() => {
    const saved = localStorage.getItem('REPEEK_SPORTS_CACHE')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    if (rawSportsFromDB) {
      setCachedSports(rawSportsFromDB)
      localStorage.setItem('REPEEK_SPORTS_CACHE', JSON.stringify(rawSportsFromDB))
    }
  }, [rawSportsFromDB])

  const [cachedGamesResponse, setCachedGamesResponse] = useState<any>(() => {
    const saved = localStorage.getItem('REPEEK_GAMES_FEED_CACHE')
    return saved ? JSON.parse(saved) : null
  })

  const convexData = useQuery(api.games.getGames, {
    sportKey: activeSportKey || undefined,
    group: activeTab === 'ALL_SPORTS' ? undefined : activeTab,
    status: statusFilter,
    limit: pageSize,
    offset: (currentPage - 1) * pageSize
  })

  useEffect(() => {
    if (convexData) {
      setCachedGamesResponse(convexData)
      localStorage.setItem('REPEEK_GAMES_FEED_CACHE', JSON.stringify(convexData))
    }
  }, [convexData])

  // Local Group Derivation
  const sportsByGroup = useMemo(() => {
    const groups: Record<string, any[]> = {}
    cachedSports.forEach(sport => {
      if (!groups[sport.group]) groups[sport.group] = []
      groups[sport.group].push(sport)
    })
    return groups
  }, [cachedSports])

  const sportGroups = useMemo(() => Object.keys(sportsByGroup).sort(), [sportsByGroup])

  const handleGroupExpand = (e: React.MouseEvent, group: string) => {
    e.stopPropagation()
    setExpandedSports(prev => 
      prev.includes(group) ? prev.filter(k => k !== group) : [...prev, group]
    )
  }

  const handleGroupSelect = (group: string) => {
    setActiveTab(group)
    setActiveSportKey(null) 
    setCurrentPage(1)
    // Also expand if it's not already
    if (!expandedSports.includes(group)) {
      setExpandedSports(prev => [...prev, group])
    }
  }

  const dataToProcess = convexData || cachedGamesResponse

  const processedGames = useMemo(() => {
    if (!dataToProcess) return []
    
    return dataToProcess.games.map((g: any) => ({
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
  }, [dataToProcess])

  const totalPages = Math.ceil((dataToProcess?.total || 0) / pageSize)

  const handleMatchClick = (game: Game) => {
    navigate(`/match/${game.id}`, { state: { game } })
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
                  setActiveTab('ALL_SPORTS')
                  setActiveSportKey(null)
                  setCurrentPage(1)
                }}
                className={`text-left px-3 py-2 text-[9px] font-black uppercase italic tracking-wider border transition-all flex items-center justify-between group ${
                  activeTab === 'ALL_SPORTS' 
                    ? 'bg-obsidian text-white border-obsidian' 
                    : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                }`}
              >
                ALL_SPORTS
              </button>
              
              {sportGroups.map(groupName => (
                <div key={groupName} className="space-y-1">
                  <button
                    onClick={() => handleGroupSelect(groupName)}
                    className={`w-full text-left px-3 py-2 text-[9px] font-black uppercase italic tracking-wider border transition-all flex items-center justify-between group ${
                      activeTab === groupName 
                        ? 'bg-obsidian text-white border-obsidian' 
                        : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                       <div 
                         onClick={(e) => handleGroupExpand(e, groupName)}
                         className="p-1 -ml-1 hover:bg-white/10 transition-colors"
                       >
                         <ChevronDown className={`w-3 h-3 transition-transform ${expandedSports.includes(groupName) ? 'rotate-0' : '-rotate-90'}`} />
                       </div>
                       {groupName.replace(/_/g, ' ')}
                    </span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${activeTab === groupName ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </button>
                  
                  {expandedSports.includes(groupName) && sportsByGroup[groupName] && (
                    <div className="flex flex-col gap-0.5 ml-3 pl-2 border-l border-obsidian/10">
                      <button
                        onClick={() => { setActiveTab(groupName); setActiveSportKey(null); setCurrentPage(1); }}
                        className={`text-left px-2 py-1.5 text-[8px] font-black uppercase italic tracking-widest transition-all ${
                          activeTab === groupName && !activeSportKey
                            ? 'text-obsidian' 
                            : 'text-obsidian/30 hover:text-obsidian'
                        }`}
                      >
                        ALL_{groupName.toUpperCase()}
                      </button>
                      {sportsByGroup[groupName].map((sport: any) => (
                        <button
                          key={sport.key}
                          onClick={() => {
                            setActiveSportKey(sport.key)
                            setActiveTab(groupName)
                            setCurrentPage(1)
                          }}
                          className={`text-left px-2 py-1.5 text-[8px] font-black uppercase italic tracking-widest transition-all ${
                            activeSportKey === sport.key 
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

      {/* Main Command Center Feed */}
      <main className="flex-1 space-y-4 text-obsidian">
        <div className="flex items-center justify-between border-b-2 border-obsidian pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-obsidian" />
            <h1 className="text-lg font-black italic uppercase tracking-tighter">
              LIVESCORE_FEED
            </h1>
          </div>
          {dataToProcess && (
             <div className="flex items-center gap-4">
                {!convexData && (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-accent animate-ping rounded-full"></div>
                    <span className="text-[8px] font-black italic text-accent uppercase">SYNCING...</span>
                  </div>
                )}
                <div className="text-[9px] font-black italic uppercase tracking-widest">
                  {dataToProcess.total} GAMES_IDENTIFIED
                </div>
             </div>
          )}
        </div>

        <div className="space-y-px bg-obsidian/5 border border-obsidian/5 min-h-[400px]">
          {convexData === undefined ? (
             <div className="flex flex-col h-[400px] items-center justify-center">
               <TechnicalSpinner label="INITIALIZING_CORE_FEED" />
             </div>
          ) : processedGames.length > 0 ? (
            processedGames.map(game => (
              <div key={game.id} onClick={() => handleMatchClick(game)} className="cursor-pointer">
                <EliteGameRow 
                  game={game} 
                  onAdd={() => {
                    addLegToBuilder(game);
                    openSlipBuilder();
                  }}
                />
              </div>
            ))
          ) : (
            <div className="h-[400px] text-center flex flex-col items-center justify-center gap-4">
              <Search className="w-8 h-8 text-obsidian/5" />
              <p className="text-[10px] font-black italic uppercase text-obsidian/20 tracking-widest">
                NO_GAMES_FOUND_IN_PROTOCOL
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
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
