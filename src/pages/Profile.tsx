import { useState, useMemo } from 'react'
import {
  UserPlus, BarChart3,
  ChevronLeft, ChevronRight,
  Loader2, Search
} from 'lucide-react'
import { useQuery, useConvexAuth } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Slip, Leg } from '../types/slips'

import SlipListItem from '../components/SlipListItem'
import SettingsTab from '../components/profile/SettingsTab'
import { useUI } from '../context/UIContext'

export default function Profile() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth()
  const viewer = useQuery(api.users.getViewer, isAuthenticated ? {} : 'skip')
  
  const isProfileLoading = isAuthLoading || (isAuthenticated && viewer === undefined)

  const user = useMemo(() => ({
    username: viewer?.username || 'ANONYMOUS',
    email: viewer?.email || '',
    isPremium: viewer?.isPremium ?? false,
    followers: 0,
    winRate: viewer?.stats?.winRate || 0,
    totalSlips: viewer?.stats?.totalSlips || 0,
    totalGames: viewer?.stats?.totalGames || 0,
    roi: viewer?.stats?.roi || 0,
    wins: 0,
    losses: 0,
    streak: 0,
    streakType: 'win' as const
  }), [viewer])

  const liveSlips = useQuery(api.slips.getSlipsByUser, {}) || []
  const { openSlipBuilder: _unused_openSlipBuilder } = useUI()
  const [activeTab, setActiveTab] = useState<'ongoing' | 'previous' | 'analysis' | 'settings'>('ongoing')
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  
  const [searchTerm, setSearchTerm] = useState('')
  const [sportFilter, setSportFilter] = useState<'all' | 'soccer' | 'basketball' | 'football'>('all')

  const userSlips = useMemo(() => {
    return liveSlips.map(s => ({
      ...s,
      id: s._id,
      timestamp: new Date(s.timestamp),
      isPremium: s.predictor.isPremium,
      status: s.status === 'OPEN' ? 'pending' : (s.status.toLowerCase() as any),
      legs: s.legs.map((l, i) => ({
        ...l,
        id: `${s._id}-leg-${i}`,
        pickLabel: l.pickType.toUpperCase(),
        confidence: 'high' as const,
        status: s.status === 'OPEN' ? 'pending' : (s.status.toLowerCase() as any),
        game: l.game ? {
          ...l.game,
          id: l.game.id,
          startTime: new Date(l.game.commenceTime),
          sport: 'soccer' as const,
          homeScore: l.game.score?.home ?? 0,
          awayScore: l.game.score?.away ?? 0,
          predictionCount: l.game.slipCount ?? 0,
          odds: { home: 1, away: 1 }
        } : null
      }))
    })) as Slip[]
  }, [liveSlips])

  const ongoingTipsTotal = useMemo(() => userSlips.filter((s: Slip) => s.status === 'pending').length, [userSlips])

  const filteredSlips = useMemo(() => {
    let list = userSlips
    
    // Tab Filter
    if (activeTab === 'ongoing') list = list.filter((s: Slip) => s.status === 'pending')
    if (activeTab === 'previous') list = list.filter((s: Slip) => s.status !== 'pending')
    
    // Search Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      list = list.filter((s: Slip) => 
        s.title.toLowerCase().includes(term) ||
        s.legs.some((leg: Leg) => 
          leg.game?.homeTeam.toLowerCase().includes(term) || 
          leg.game?.awayTeam.toLowerCase().includes(term) ||
          leg.game?.league.toLowerCase().includes(term)
        )
      )
    }
    
    // Sport Filter
    if (sportFilter !== 'all') {
      list = list.filter((s: Slip) => s.legs.some((leg: Leg) => leg.game?.sportKey?.toLowerCase().includes(sportFilter)))
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
          <div className="bg-obsidian p-8 border-b-8 border-accent relative overflow-hidden">
            <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
            <div className="relative z-10 space-y-6 text-white">
                <div className="w-20 h-20 bg-white border-2 border-accent flex items-center justify-center -rotate-2">
                  <span className="font-black text-obsidian text-3xl italic">
                    {isProfileLoading ? (
                      <Loader2 className="w-8 h-8 animate-spin opacity-20" />
                    ) : (
                      (user.username.startsWith('@') ? user.username.charAt(1) : user.username.charAt(0)).toUpperCase()
                    )}
                  </span>
                </div>
                <div>
                  {isProfileLoading ? (
                    <div className="h-8 w-48 bg-white/10 animate-pulse mb-2" />
                  ) : (
                    <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-2 shadow-sm text-white">
                    {user.username}
                  </h1>
                  )}
                  {user.isPremium && <span className="bg-accent text-obsidian px-2 py-0.5 text-[9px] font-black italic">ELITE_OPERATOR</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-2">WIN_RATE</div>
                    <div className="text-2xl font-black italic tabular-nums leading-none tracking-tighter">
                      {isProfileLoading ? '--.-' : user.winRate.toFixed(1)}%
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-2">ROI_ALPHA</div>
                    <div className="text-2xl font-black italic tabular-nums leading-none tracking-tighter text-accent">
                      +{isProfileLoading ? '0.0' : user.roi}%
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase italic">
                    <span className="text-white/40">TOTAL_SLIPS</span>
                    <span className="text-white">{user.totalSlips}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase italic">
                    <span className="text-white/40">TOTAL_GAMES</span>
                    <span className="text-white">{user.totalGames}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase italic">
                    <span className="text-white/40">FOLLOWERS</span>
                    <span className="text-white">{user.followers}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase italic">
                    <span className="text-white/40">CURRENT_STREAK</span>
                    <div className="flex items-center gap-1.5">
                      <span className={user.streakType === 'win' ? 'text-accent' : 'text-red-500'}>
                        {user.streak} {user.streakType.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-accent text-obsidian font-black py-4 border-2 border-obsidian shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0 transition-all flex items-center justify-center gap-2 uppercase italic text-xs tracking-widest">
                  <UserPlus className="w-4 h-4" /> FOLLOW_ANALYST
                </button>
            </div>
          </div>
        </aside>

        {/* MAIN: FEED & TABS */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-obsidian/5 pb-4">
             <div className="flex items-center gap-8">
                {(['ongoing', 'previous', 'analysis', 'settings'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setPage(1); }}
                    className={`text-[11px] font-black uppercase italic tracking-widest transition-all relative py-2 ${
                      activeTab === tab ? 'text-obsidian' : 'text-obsidian/20 hover:text-obsidian/40'
                    }`}
                  >
                    {tab.replace('_', ' ')}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-accent -mb-[2px]"></div>
                    )}
                    {tab === 'ongoing' && ongoingTipsTotal > 0 && (
                      <span className="ml-2 bg-obsidian text-white px-1.5 py-0.5 text-[8px] rounded-sm">{ongoingTipsTotal}</span>
                    )}
                  </button>
                ))}
             </div>
          </div>

          {activeTab === 'settings' ? (
            <SettingsTab viewer={viewer} isProfileLoading={isProfileLoading} />
          ) : (
            <>
              {/* Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-workspace p-4 border border-obsidian/5">
                <div className="relative flex-1 group w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/20 group-focus-within:text-accent transition-colors" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    placeholder="RESEARCH_HISTORY_OR_MARKETS..." 
                    className="w-full bg-white border-2 border-obsidian/10 focus:border-obsidian px-12 py-3 text-[10px] font-black uppercase italic outline-none transition-all placeholder:text-obsidian/20" 
                  />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                  {(['all', 'soccer', 'basketball', 'football'] as const).map(sport => (
                    <button
                      key={sport}
                      onClick={() => { setSportFilter(sport); setPage(1); }}
                      className={`px-4 py-3 text-[9px] font-black italic uppercase tracking-widest border-2 transition-all whitespace-nowrap ${
                        sportFilter === sport ? 'bg-obsidian text-white border-obsidian' : 'bg-white border-obsidian/5 text-obsidian/30 hover:border-obsidian/20'
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed Meta */}
              <div className="flex items-center justify-between text-obsidian px-2">
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <BarChart3 className="w-3.5 h-3.5 opacity-20" />
                       <span className="text-[10px] font-black italic uppercase tracking-widest opacity-40">SORT_BY: RECENCY</span>
                    </div>
                 </div>
                 <div className="text-[10px] font-black italic uppercase opacity-20">
                   {filteredSlips.length} SIGNALS_RECOVERED
                 </div>
              </div>

              {/* Tips Grid */}
              {isProfileLoading ? (
                <div className="py-24 flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-accent" />
                  <p className="text-[10px] font-black italic uppercase tracking-widest opacity-20">SYNCHRONIZING_PROTOCOLS...</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {paginatedSlips.length > 0 ? (
                    paginatedSlips.map((s: Slip) => <SlipListItem key={s.id} slip={s} />)
                  ) : (
                    <div className="py-24 text-center opacity-30 italic border-2 border-dashed border-obsidian/10">
                      <Search className="w-16 h-16 mx-auto mb-6 opacity-5" />
                      <p className="text-[11px] font-black uppercase tracking-[0.3em]">ZERO_SIGNALS_RECOVERED_IN_THIS_SECTOR</p>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-obsidian text-white p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-accent"></div>
                     <span className="text-[10px] font-black italic uppercase tracking-widest text-accent">PAGINATION_ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <button 
                      disabled={page === 1}
                      onClick={() => setPage(p => p - 1)}
                      className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest hover:text-accent transition-colors disabled:opacity-20"
                    >
                      <ChevronLeft className="w-4 h-4" /> PREV
                    </button>
                    <div className="text-[10px] font-black italic tabular-nums bg-white/10 px-4 py-1.5 border border-white/10">
                      PAGE {page} // {totalPages}
                    </div>
                    <button 
                      disabled={page === totalPages}
                      onClick={() => setPage(p => p + 1)}
                      className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest hover:text-accent transition-colors disabled:opacity-20"
                    >
                      NEXT <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
