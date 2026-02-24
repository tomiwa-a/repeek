import { mockGames } from '../data/mockGames'
import GameCard from './GameCard'

export default function LiveGames() {
  const liveGames = mockGames.filter(game => game.isLive)
  const upcomingGames = mockGames.filter(game => !game.isLive).slice(0, 8)

  return (
    <div className="space-y-8">
      {/* Live Section */}
      {liveGames.length > 0 && (
        <div className="bg-white border border-border rounded-xl px-4 py-5 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-secondary">
              Live Matches
            </h2>
            <span className="text-[11px] font-bold text-text-muted bg-workspace px-1.5 py-0.5 rounded leading-none">
              {liveGames.length}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {liveGames.slice(0, 3).map(game => (
              <GameCard key={game.id} game={game} compact />
            ))}
          </div>
          {liveGames.length > 1 && (
            <button className="w-full mt-4 py-2 text-[11px] font-bold text-primary uppercase tracking-widest border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors">
              View All Live
            </button>
          )}
        </div>
      )}

      {/* Upcoming Section */}
      <div className="bg-white border border-border rounded-xl px-4 py-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-secondary">
            Upcoming
          </h2>
          <button className="text-[11px] font-bold text-primary uppercase tracking-widest hover:underline">
            Full Schedule
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {upcomingGames.slice(0, 5).map(game => (
            <GameCard key={game.id} game={game} compact />
          ))}
        </div>
      </div>
    </div>
  )
}
