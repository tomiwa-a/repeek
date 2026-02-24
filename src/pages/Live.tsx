import { mockGames } from '../data/mockGames'
import GameCard from '../components/GameCard'
import { Radio, Clock } from 'lucide-react'

export default function Live() {
  const liveGames = mockGames.filter(game => game.isLive)
  const upcomingSoon = mockGames
    .filter(game => !game.isLive)
    .slice(0, 12)

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-8">
      {/* Live Games Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-secondary">
            Live Matches
          </h1>
          <span className="text-sm font-bold text-text-muted bg-workspace px-2 py-0.5 rounded">
            {liveGames.length}
          </span>
        </div>
        
        {liveGames.length > 0 ? (
          <div className="data-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {liveGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-border rounded-xl text-center py-16 shadow-sm">
            <Radio className="w-10 h-10 text-text-muted/30 mx-auto mb-4" />
            <p className="text-sm font-semibold text-text-muted">No live matches at the moment</p>
          </div>
        )}
      </div>

      {/* Upcoming Games Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/5 rounded-lg">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-secondary">
            Upcoming Matches
          </h2>
        </div>
        
        <div className="data-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {upcomingSoon.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}
