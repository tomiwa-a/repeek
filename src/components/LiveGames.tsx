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
    <div className="bg-white border-2 border-obsidian p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-obsidian/5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
          <h2 className="text-xs font-black tracking-widest uppercase italic text-obsidian">LIVE GAMES</h2>
        </div>
        <span className="text-[9px] font-mono font-black text-obsidian/40 italic">ACTIVE</span>
      </div>

      <div className="space-y-2">
        {liveGames.length > 0 ? (
          liveGames.map((game) => (
            <GameCard key={game.id} game={game} compact={true} />
          ))
        ) : (
          <div className="py-8 text-center border-2 border-dashed border-obsidian/5">
            <p className="text-[10px] font-black italic text-obsidian/20 uppercase tracking-tighter">
              NO ACTIVE GAMES
            </p>
          </div>
        )}
      </div>

      <button className="w-full mt-6 btn-elite py-2 text-[10px] tracking-widest">
        VIEW ALL GAMES
      </button>
    </div>
  )
}
