import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockGames } from '../data/mockGames'
import { 
  ChevronLeft, 
  Activity, 
  Target, 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock,
  BarChart3,
  MessageSquare,
  Share2,
  ChevronRight,
  User
} from 'lucide-react'

export default function MatchDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'ANALYSIS' | 'SIGNALS' | 'MARKETS'>('ANALYSIS')

  const game = useMemo(() => {
    return mockGames.find(g => g.id === id) || mockGames[0]
  }, [id])

  const stats = [
    { label: 'POSSESSION', home: '54%', away: '46%', icon: Activity },
    { label: 'SHOTS_ON_TARGET', home: '6', away: '4', icon: Target },
    { label: 'CORNER_KICKS', home: '8', away: '3', icon: TrendingUp },
    { label: 'EXPECTED_GOALS', home: '2.14', away: '1.42', icon: Zap },
  ]

  const mockSignals = [
    { id: 1, user: '@ALPHA_ONE', pick: 'HOME_WIN', odds: '2.10', confidence: '92%', status: 'VERIFIED' },
    { id: 2, user: '@BETA_OPS', pick: 'OVER_2.5', odds: '1.85', confidence: '88%', status: 'STABLE' },
    { id: 3, user: '@DELTA_X', pick: 'BTTS_YES', odds: '1.70', confidence: '85%', status: 'VERIFIED' },
  ]

  return (
    <div className="max-w-[1400px] mx-auto min-h-screen bg-white font-sans antialiased pb-20">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b-2 border-obsidian px-4 md:px-8 py-4 flex items-center justify-between">
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
             <div className="text-[10px] font-black italic text-obsidian uppercase">{game.id}</div>
          </div>
          <button className="p-2 border border-obsidian/10 hover:bg-workspace transition-colors">
            <Share2 className="w-4 h-4 text-obsidian" />
          </button>
        </div>
      </header>

      {/* Hero: Score & Teams */}
      <section className="px-4 md:px-8 pt-10 pb-16 bg-obsidian text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center gap-12 max-w-4xl mx-auto">
          
          <div className="flex items-center gap-4">
            <span className="px-2 py-0.5 bg-accent text-obsidian text-[10px] font-black italic rounded-sm">{game.league.toUpperCase()}</span>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-[10px] font-black italic tracking-widest text-accent uppercase">
                {game.isLive ? 'LIVE_STREAM_ACTIVE' : 'PRE_MATCH_DOCKET'}
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-8 md:gap-16">
            {/* Home Team */}
            <div className="flex-1 text-center md:text-right space-y-4">
              <div className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">{game.homeTeam}</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] italic">HOST_ENTITY</div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-4 shrink-0">
               <div className="flex items-center gap-3">
                  <div className="text-6xl md:text-8xl font-black italic tracking-tighter bg-white/5 border border-white/10 px-6 py-2 rounded-lg">
                    {game.homeScore ?? 0}
                  </div>
                  <div className="text-2xl font-black text-white/20 italic">:</div>
                  <div className="text-6xl md:text-8xl font-black italic tracking-tighter bg-white/5 border border-white/10 px-6 py-2 rounded-lg">
                    {game.awayScore ?? 0}
                  </div>
               </div>
               <div className="bg-accent/10 border border-accent/20 px-4 py-1.5 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[12px] font-black italic text-accent tabular-nums">{game.matchTime || '00:00'}</span>
               </div>
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">{game.awayTeam}</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] italic">VISITOR_ENTITY</div>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/5 p-4 space-y-2 group hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <stat.icon className="w-3.5 h-3.5 text-white/20 group-hover:text-accent transition-colors" />
                  <span className="text-[8px] font-black text-white/20 uppercase italic tracking-widest">{stat.label}</span>
                </div>
                <div className="flex items-end justify-between">
                   <span className="text-lg font-black italic text-white/80">{stat.home}</span>
                   <div className="flex-1 h-[2px] bg-white/5 mx-3 mb-2 relative overflow-hidden">
                      <div 
                        className="absolute h-full bg-accent transition-all duration-1000" 
                        style={{ width: stat.home }}
                      ></div>
                   </div>
                   <span className="text-lg font-black italic text-white/40">{stat.away}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Tabs */}
      <main className="px-4 md:px-8 -mt-8 relative z-20">
        <div className="bg-white border-2 border-obsidian shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] min-h-[600px]">
          {/* Tab Selector */}
          <div className="flex border-b-2 border-obsidian overflow-x-auto no-scrollbar">
            {[
              { id: 'ANALYSIS', icon: BarChart3, label: 'TECHNICAL_ANALYSIS' },
              { id: 'SIGNALS', icon: MessageSquare, label: 'PREDICTION_SIGNALS' },
              { id: 'MARKETS', icon: TrendingUp, label: 'MARKET_ODDS' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[160px] flex items-center justify-center gap-3 py-6 px-4 group transition-all relative ${
                  activeTab === tab.id 
                    ? 'bg-obsidian text-white' 
                    : 'bg-workspace text-obsidian/40 hover:bg-obsidian/5 hover:text-obsidian'
                }`}
              >
                <tab.icon className={`w-4 h-4 transition-colors ${activeTab === tab.id ? 'text-accent' : 'text-obsidian/20'}`} />
                <span className="text-[10px] font-black italic uppercase tracking-widest">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-accent"></div>
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'ANALYSIS' && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                      <Shield className="w-5 h-5 text-accent" />
                      DEFENSIVE_POSTURE
                    </h3>
                    <p className="text-sm font-bold text-text-muted leading-relaxed uppercase italic">
                      HOME_ENTITY IS OPERATING AT 84% DEFENSIVE EFFICIENCY. 
                      EXPECTED_CONCESSION RATE REMAINS LOW AT 0.12 PER 15 MIN_NODES.
                    </p>
                    <div className="space-y-3">
                      <div className="h-2 bg-workspace rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-obsidian w-3/4"></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-black italic text-obsidian/40 uppercase">
                        <span>THREAT_LEVEL: MODERATE</span>
                        <span>75/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                      <Target className="w-5 h-5 text-accent" />
                      ATTACK_VECTORS
                    </h3>
                    <p className="text-sm font-bold text-text-muted leading-relaxed uppercase italic">
                      VISITOR_ENTITY DEPLOYING HIGH-PRESS PROTOCOL. 
                      62% OF ATTACKS ORIGINATING FROM FLANK_NODES.
                    </p>
                    <div className="space-y-3">
                      <div className="h-2 bg-workspace rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-accent w-[62%]"></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-black italic text-obsidian/40 uppercase">
                        <span>FLANK_PRESSURE: CRITICAL</span>
                        <span>62/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-obsidian/5 bg-workspace p-6">
                   <h3 className="text-[10px] font-black italic uppercase tracking-[0.3em] text-obsidian/30 mb-4">SYSTEM_COMMENTARY</h3>
                   <p className="text-xs font-mono text-obsidian/60 leading-relaxed uppercase">
                     [NODE_742]: MATCH DYNAMICS SHIFTED AT 24' AFTER HOME GOAL. <br />
                     [NODE_811]: ODDS VOLATILITY INCREASED IN 1X2 MARKETS. <br />
                     [NODE_905]: HIGH CORRELATION DETECTED BETWEEN SHOTS AND SUCCESSFUL SIGNALS.
                   </p>
                </div>
              </div>
            )}

            {activeTab === 'SIGNALS' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-[10px] font-black italic uppercase tracking-[0.3em] text-obsidian/30">VERIFIED_SIGNALS_FEED</h3>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-[10px] font-black italic uppercase text-obsidian/40 leading-none">REALTIME_MATCHING</span>
                   </div>
                </div>
                
                <div className="space-y-px bg-obsidian/5 border border-obsidian/5">
                  {mockSignals.map(signal => (
                    <div key={signal.id} className="bg-white hover:bg-workspace p-4 flex items-center justify-between group transition-all group border-b border-obsidian/5">
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 bg-workspace flex items-center justify-center border border-obsidian/5 group-hover:bg-white transition-all">
                          <User className="w-5 h-5 text-obsidian/20 group-hover:text-obsidian transition-colors" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black italic text-obsidian leading-none mb-1">{signal.user}</div>
                          <div className="text-[8px] font-bold text-text-muted uppercase italic tracking-widest">STATUS: {signal.status}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-12">
                        <div className="text-center">
                          <div className="text-[10px] font-black italic text-obsidian uppercase tracking-widest">{signal.pick}</div>
                          <div className="text-[8px] font-bold text-accent uppercase italic">CONFIDENCE: {signal.confidence}</div>
                        </div>
                        <div className="text-right min-w-[60px]">
                           <div className="text-xl font-black italic text-obsidian leading-none">@{signal.odds}</div>
                        </div>
                        <button className="bg-obsidian text-white p-2 group-hover:bg-accent group-hover:text-obsidian transition-all">
                           <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-4 border-2 border-dashed border-obsidian/10 text-[10px] font-black italic text-obsidian/20 uppercase tracking-[0.3em] hover:bg-workspace hover:text-obsidian transition-all">
                  SCAN_FOR_MORE_SIGNALS...
                </button>
              </div>
            )}

            {activeTab === 'MARKETS' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'HOME_WIN [1]', odds: '2.10', trend: 'up' },
                  { label: 'DRAW [X]', odds: '3.40', trend: 'down' },
                   { label: 'AWAY_WIN [2]', odds: '3.20', trend: 'stable' }
                ].map(market => (
                  <div key={market.label} className="bg-workspace p-6 border-b-4 border-obsidian/10 space-y-4 hover:scale-105 transition-all cursor-pointer">
                    <div className="text-[10px] font-black italic text-obsidian/40 uppercase tracking-widest leading-none">{market.label}</div>
                    <div className="flex items-end justify-between">
                       <div className="text-4xl font-black italic text-obsidian tracking-tighter leading-none">@{market.odds}</div>
                       <div className={`p-1.5 border ${
                         market.trend === 'up' ? 'border-green-500 text-green-500' : 
                         market.trend === 'down' ? 'border-red-500 text-red-500' : 
                         'border-obsidian/20 text-obsidian/20'
                       }`}>
                         {market.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Status Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-obsidian text-white px-6 py-3 border-2 border-white/10 shadow-2xl flex items-center gap-4">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-[10px] font-black italic uppercase tracking-widest">SIGNAL_LOCK_ACTIVE</span>
           </div>
           <div className="h-4 w-px bg-white/10"></div>
           <div className="text-[10px] font-black italic text-accent tracking-tighter">ELITE_HUB // CRYPTO_SECURE</div>
        </div>
      </div>
    </div>
  )
}
