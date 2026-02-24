import { mockGames } from '../data/mockGames'
import GameCard from '../components/GameCard'
import { Radio, Terminal } from 'lucide-react'

export default function Live() {
  const liveGames = mockGames.filter(game => game.isLive).map(game => ({
    ...game,
    homeScore: game.homeScore ?? 0,
    awayScore: game.awayScore ?? 0,
    time: game.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    predictionCount: 14
  }))
  
  const upcomingSoon = mockGames
    .filter(game => !game.isLive)
    .slice(0, 12)
    .map(game => ({
      ...game,
      homeScore: game.homeScore ?? 0,
      awayScore: game.awayScore ?? 0,
      time: game.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      predictionCount: 8
    }))

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-8 font-sans antialiased bg-white">
      {/* Live Games Section */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-obsidian">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <h1 className="text-lg font-black italic uppercase tracking-tighter text-obsidian">
              LIVE_MATCH_PROTOCOLS
            </h1>
          </div>
          <div className="bg-obsidian text-white px-2 py-0.5 text-[8px] font-black italic tracking-widest uppercase">
            {liveGames.length}_ACTIVE_SESSIONS
          </div>
        </div>
        
        {liveGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {liveGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="bg-workspace border-2 border-dashed border-obsidian/10 text-center py-16 relative overflow-hidden group">
             <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
            <Radio className="w-10 h-10 text-obsidian/5 mx-auto mb-3 group-hover:text-accent transition-colors duration-500" />
            <p className="text-xs font-black italic text-obsidian/20 uppercase tracking-[0.2em] leading-none">
              NO_ACTIVE_MATCHES_DETECTED
            </p>
          </div>
        )}
      </div>

      {/* Upcoming Games Section */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-obsidian">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-obsidian" />
            <h2 className="text-lg font-black italic uppercase tracking-tighter text-obsidian">
              UPCOMING_CYCLES
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {upcomingSoon.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}
