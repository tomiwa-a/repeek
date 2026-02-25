import { useState, useMemo } from 'react'
import { mockGames } from '../data/mockGames'
import EliteGameRow from '../components/EliteGameRow'
import { Filter, ChevronRight, Activity, Search, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Live() {
  const navigate = useNavigate()
  const [activeSport, setActiveSport] = useState<string>('ALL_SPORTS')
  const [activeLeague, setActiveLeague] = useState<string>('ALL_LEAGUES')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING'>('ALL')
  const [expandedSports, setExpandedSports] = useState<string[]>(['SOCCER'])

  const toggleSport = (key: string) => {
    setExpandedSports((prev: string[]) => 
      prev.includes(key) ? prev.filter((k: string) => k !== key) : [...prev, key]
    )
    setActiveSport(key)
    setActiveLeague('ALL_LEAGUES')
  }

  const processedGames = useMemo(() => {
    return mockGames.filter(game => {
      const matchesSport = activeSport === 'ALL_SPORTS' || 
                           game.sportKey?.toUpperCase() === activeSport ||
                           game.league.toUpperCase().includes(activeSport) ||
                           (activeSport === 'SOCCER' && game.sport === 'soccer')
      
      const matchesLeague = activeLeague === 'ALL_LEAGUES' || 
                            game.league.toUpperCase() === activeLeague.toUpperCase()

      const matchesStatus = statusFilter === 'ALL' || 
                            (statusFilter === 'LIVE' && game.isLive) || 
                            (statusFilter === 'UPCOMING' && !game.isLive)
      
      return matchesSport && matchesLeague && matchesStatus
    }).map(game => ({
      ...game,
      homeScore: game.homeScore ?? 0,
      awayScore: game.awayScore ?? 0,
      time: game.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      predictionCount: Math.floor(Math.random() * 25) + 2 // Simulation
    }))
  }, [activeSport, activeLeague, statusFilter])

  const liveCount = mockGames.filter(g => g.isLive).length

  const sports = [
    { 
      label: 'SOCCER', 
      key: 'SOCCER',
      leagues: ['PREMIER LEAGUE', 'LA LIGA', 'BUNDESLIGA', 'SERIE A', 'LIGUE 1']
    },
    { label: 'NBA_BASKETBALL', key: 'NBA', leagues: [] },
    { label: 'NFL_FOOTBALL', key: 'NFL', leagues: [] },
    { label: 'MLB_BASEBALL', key: 'MLB', leagues: [] },
  ]

  const handleMatchClick = (id: string) => {
    navigate(`/match/${id}`)
  }

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6 bg-white font-sans antialiased min-h-screen">
      
      {/* Sidebar Filters - Technical Grade */}
      <aside className="w-full lg:w-64 space-y-4 shrink-0">
        <div className="border-2 border-obsidian bg-white p-4 space-y-6 sticky top-20">
          <div className="flex items-center gap-2 border-b border-obsidian/10 pb-3 font-black uppercase italic text-[10px]">
            <Filter className="w-3.5 h-3.5" />
            LIVE_PROTOCOLS
          </div>

          {/* Status Selectors */}
          <div className="grid grid-cols-3 gap-1">
            {['ALL', 'LIVE', 'UPCOMING'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
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

          {/* Sport Categories */}
          <div className="space-y-1.5">
            <label className="text-[8px] font-black text-obsidian/40 uppercase tracking-widest italic ml-1">SPORT_NODES</label>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  setActiveSport('ALL_SPORTS')
                  setActiveLeague('ALL_LEAGUES')
                }}
                className={`text-left px-3 py-2 text-[9px] font-black uppercase italic tracking-wider border transition-all flex items-center justify-between group ${
                  activeSport === 'ALL_SPORTS' 
                    ? 'bg-obsidian text-white border-obsidian' 
                    : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                }`}
              >
                ALL_SPORTS
              </button>
              
              {sports.map(sport => (
                <div key={sport.key} className="space-y-1">
                  <button
                    onClick={() => toggleSport(sport.key)}
                    className={`w-full text-left px-3 py-2 text-[9px] font-black uppercase italic tracking-wider border transition-all flex items-center justify-between group ${
                      activeSport === sport.key 
                        ? 'bg-obsidian text-white border-obsidian' 
                        : 'bg-workspace text-obsidian/60 border-transparent hover:border-obsidian/20'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                       {sport.leagues.length > 0 && (
                         <ChevronDown className={`w-3 h-3 transition-transform ${expandedSports.includes(sport.key) ? 'rotate-0' : '-rotate-90'}`} />
                       )}
                       {sport.label}
                    </span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${activeSport === sport.key ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </button>
                  
                  {expandedSports.includes(sport.key) && sport.leagues.length > 0 && (
                    <div className="flex flex-col gap-0.5 ml-3 pl-2 border-l border-obsidian/10">
                      <button
                        onClick={() => setActiveLeague('ALL_LEAGUES')}
                        className={`text-left px-2 py-1.5 text-[8px] font-black uppercase italic tracking-widest transition-all ${
                          activeLeague === 'ALL_LEAGUES' && activeSport === sport.key
                            ? 'text-obsidian' 
                            : 'text-obsidian/30 hover:text-obsidian'
                        }`}
                      >
                        ALL_{sport.key}_LEAGUES
                      </button>
                      {sport.leagues.map(league => (
                        <button
                          key={league}
                          onClick={() => {
                            setActiveSport(sport.key)
                            setActiveLeague(league)
                          }}
                          className={`text-left px-2 py-1.5 text-[8px] font-black uppercase italic tracking-widest transition-all ${
                            activeLeague === league 
                              ? 'text-obsidian' 
                              : 'text-obsidian/30 hover:text-obsidian'
                          }`}
                        >
                          {league}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-workspace p-4 border border-obsidian/5 space-y-3">
             <div className="flex items-center justify-between text-[8px] font-black italic text-obsidian/40">
                <span>NETWORK_UPTIME</span>
                <span className="text-green-600">99.9%</span>
             </div>
             <div className="h-0.5 bg-obsidian/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent w-3/4"></div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Command Center Feed */}
      <main className="flex-1 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-obsidian pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-obsidian" />
            <h1 className="text-lg font-black italic uppercase tracking-tighter">
              LIVESCORE_FEED
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
               <span className="text-[9px] font-black italic uppercase tracking-widest text-obsidian">{liveCount} ACTIVE_NODES</span>
            </div>
            <div className="h-4 w-px bg-obsidian/10"></div>
            <div className="text-[8px] font-mono text-obsidian/30 uppercase tracking-widest italic">REFRESH_RATE: 2s</div>
          </div>
        </div>

        {/* Dense Feed */}
        <div className="space-y-px bg-obsidian/5 border border-obsidian/5">
          {processedGames.length > 0 ? (
            processedGames.map(game => (
              <div key={game.id} onClick={() => handleMatchClick(game.id)}>
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
      </main>
    </div>
  )
}
