import { mockGames } from '../data/mockGames'
import GameCard from '../components/GameCard'
import { Radio, Clock } from 'lucide-react'

export default function Live() {
  const liveGames = mockGames.filter(game => game.isLive)
  const upcomingSoon = mockGames
    .filter(game => !game.isLive)
    .slice(0, 12)

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-6">
      {/* Live Games Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Radio className="w-6 h-6 text-red-500" />
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">
            Live Matches
          </h1>
          <span className="text-text-muted">({liveGames.length})</span>
        </div>
        
        {liveGames.length > 0 ? (
          <div className="data-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {liveGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="compact-card text-center py-12">
            <Radio className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">No live matches at the moment</p>
          </div>
        )}
      </div>

      {/* Upcoming Games Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
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
