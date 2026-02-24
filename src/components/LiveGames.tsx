import { mockGames } from '../data/mockGames'
import GameCard from './GameCard'

export default function LiveGames() {
  const liveGames = mockGames.filter(game => game.isLive).map(game => ({
    ...game,
    homeScore: game.homeScore ?? 0,
    awayScore: game.awayScore ?? 0,
    time: game.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    predictionCount: 12
  }))

  return (
    <div className="bg-white border-2 border-obsidian p-4 shadow-sm font-sans antialiased">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-obsidian/5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
          <h2 className="text-[10px] font-black tracking-[0.2em] uppercase italic text-obsidian">LIVE_GAMES</h2>
        </div>
        <span className="text-[8px] font-black text-obsidian/20 italic tracking-widest">ACTIVE_NODES</span>
      </div>

      <div className="space-y-1.5">
        {liveGames.length > 0 ? (
          liveGames.map((game) => (
            <GameCard key={game.id} game={game} compact={true} />
          ))
        ) : (
          <div className="py-6 text-center border-2 border-dashed border-obsidian/5">
            <p className="text-[8px] font-black italic text-obsidian/20 uppercase tracking-tighter">
              NO_ACTIVE_SESSION
            </p>
          </div>
        )}
      </div>

      <button className="w-full mt-4 bg-obsidian text-white py-2 text-[8px] font-black uppercase italic tracking-widest hover:bg-accent hover:text-obsidian transition-all">
        VIEW_ALL_GAMES_PROTOCOL
      </button>
    </div>
  )
}
