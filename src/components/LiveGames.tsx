import { mockGames } from '../data/mockGames'
import GameCard from './GameCard'
import { Radio } from 'lucide-react'

export default function LiveGames() {
  const liveGames = mockGames.filter(game => game.isLive)
  const upcomingGames = mockGames.filter(game => !game.isLive).slice(0, 8)

  return (
    <div className="space-y-6">
      {/* Live Section */}
      {liveGames.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-black uppercase tracking-tight text-white">
              Live Now
            </h2>
            <span className="text-xs text-text-muted">
              ({liveGames.length})
            </span>
          </div>
          <div className="data-grid grid-cols-1">
            {liveGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black uppercase tracking-tight text-white">
            Upcoming Games
          </h2>
          <button className="text-xs text-primary font-bold uppercase tracking-wider hover:underline">
            View All →
          </button>
        </div>
        <div className="data-grid grid-cols-1">
          {upcomingGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}
