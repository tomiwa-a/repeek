import type { Game } from '../data/mockGames'
import { format } from 'date-fns'
import { MessageSquare } from 'lucide-react'

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  if (game.isLive) {
    return (
      <div className="compact-card hover:border-primary transition-colors cursor-pointer group">
        {/* Live Indicator */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider text-text-muted">
            {game.league}
          </span>
          <div className="flex items-center gap-2">
            <div className="live-dot"></div>
            <span className="text-xs font-bold text-red-500 uppercase">
              {game.matchTime}
            </span>
          </div>
        </div>

        {/* Teams and Score */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white group-hover:text-primary transition-colors">
              {game.homeTeam}
            </span>
            <span className="text-2xl font-black text-white">
              {game.homeScore}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white group-hover:text-primary transition-colors">
              {game.awayTeam}
            </span>
            <span className="text-2xl font-black text-white">
              {game.awayScore}
            </span>
          </div>
        </div>

        {/* Odds */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-background p-2 text-center">
            <div className="text-xs text-text-muted mb-1">1</div>
            <div className="font-black text-primary">{game.odds.home.toFixed(2)}</div>
          </div>
          {game.odds.draw && (
            <div className="bg-background p-2 text-center">
              <div className="text-xs text-text-muted mb-1">X</div>
              <div className="font-black text-white">{game.odds.draw.toFixed(2)}</div>
            </div>
          )}
          <div className="bg-background p-2 text-center">
            <div className="text-xs text-text-muted mb-1">2</div>
            <div className="font-black text-white">{game.odds.away.toFixed(2)}</div>
          </div>
        </div>

        {/* Predictions Count */}
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            <span>{game.predictionCount} predictions</span>
          </div>
          <button className="text-primary font-bold uppercase tracking-wider hover:underline">
            View →
          </button>
        </div>
      </div>
    )
  }

  // Upcoming game
  return (
    <div className="compact-card hover:border-primary transition-colors cursor-pointer group">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-text-muted">
          {game.league}
        </span>
        <span className="text-xs font-bold text-text-muted">
          {format(game.startTime, 'HH:mm')}
        </span>
      </div>

      {/* Teams */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white group-hover:text-primary transition-colors">
            {game.homeTeam}
          </span>
          <span className="text-sm font-black text-primary">vs</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-white group-hover:text-primary transition-colors">
            {game.awayTeam}
          </span>
        </div>
      </div>

      {/* Odds */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-background p-2 text-center">
          <div className="text-xs text-text-muted mb-1">1</div>
          <div className="font-black text-primary">{game.odds.home.toFixed(2)}</div>
        </div>
        {game.odds.draw && (
          <div className="bg-background p-2 text-center">
            <div className="text-xs text-text-muted mb-1">X</div>
            <div className="font-black text-white">{game.odds.draw.toFixed(2)}</div>
          </div>
        )}
        <div className="bg-background p-2 text-center">
          <div className="text-xs text-text-muted mb-1">2</div>
          <div className="font-black text-white">{game.odds.away.toFixed(2)}</div>
        </div>
      </div>

      {/* Predictions Count */}
      <div className="flex items-center justify-between text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <MessageSquare className="w-3 h-3" />
          <span>{game.predictionCount} predictions</span>
        </div>
        <button className="text-primary font-bold uppercase tracking-wider hover:underline">
          Predict →
        </button>
      </div>
    </div>
  )
}
