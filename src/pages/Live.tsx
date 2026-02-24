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
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Live Games Section */}
      <div>
        <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-obsidian">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-obsidian">
              LIVE MATCHES
            </h1>
          </div>
          <div className="bg-obsidian text-white px-3 py-1 text-[10px] font-black italic">
            {liveGames.length} ACTIVE GAMES
          </div>
        </div>
        
        {liveGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {liveGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-obsidian/10 text-center py-20 shadow-sm relative overflow-hidden group">
             <div className="absolute inset-0 dot-matrix opacity-5 pointer-events-none"></div>
            <Radio className="w-12 h-12 text-obsidian/10 mx-auto mb-4 group-hover:text-accent transition-colors" />
            <p className="text-base font-black italic text-obsidian/40 uppercase tracking-tighter leading-none">
              NO ACTIVE MATCHES DETECTED
            </p>
          </div>
        )}
      </div>

      {/* Upcoming Games Section */}
      <div>
        <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-obsidian">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-obsidian" />
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-obsidian">
              UPCOMING MATCHES
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {upcomingSoon.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}
