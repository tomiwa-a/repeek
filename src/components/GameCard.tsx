import type { Game } from '../data/mockGames'
import { format } from 'date-fns'
import { MessageSquare } from 'lucide-react'

interface GameCardProps {
  game: Game
  compact?: boolean
}

export default function GameCard({ game, compact = false }: GameCardProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-white border border-border rounded-lg hover:border-primary/30 transition-all cursor-pointer group">
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-[12px] font-semibold text-secondary truncate">{game.homeTeam}</p>
          <p className="text-[12px] font-semibold text-secondary truncate">{game.awayTeam}</p>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          {game.isLive ? (
            <>
              <p className="text-[12px] font-bold text-primary leading-none">{game.homeScore}</p>
              <p className="text-[12px] font-bold text-primary leading-none">{game.awayScore}</p>
            </>
          ) : (
            <span className="text-[10px] font-bold text-text-muted">{format(game.startTime, 'HH:mm')}</span>
          )}
        </div>
      </div>
    )
  }

  if (game.isLive) {
    return (
      <div className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
        {/* Live Indicator */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            {game.league}
          </span>
          <div className="flex items-center gap-2 text-red-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest">{game.matchTime}</span>
          </div>
        </div>

        {/* Teams and Score */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
              {game.homeTeam}
            </span>
            <span className="text-xl font-bold text-secondary">
              {game.homeScore}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
              {game.awayTeam}
            </span>
            <span className="text-xl font-bold text-secondary">
              {game.awayScore}
            </span>
          </div>
        </div>

        {/* Odds */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button className="bg-workspace p-2 rounded-lg text-center transition-colors hover:bg-primary/5">
            <div className="text-[10px] text-text-muted mb-1 font-bold">1</div>
            <div className="font-bold text-primary text-sm">{game.odds.home.toFixed(2)}</div>
          </button>
          {game.odds.draw && (
            <button className="bg-workspace p-2 rounded-lg text-center transition-colors hover:bg-primary/5">
              <div className="text-[10px] text-text-muted mb-1 font-bold">X</div>
              <div className="font-bold text-secondary text-sm">{game.odds.draw.toFixed(2)}</div>
            </button>
          )}
          <button className="bg-workspace p-2 rounded-lg text-center transition-colors hover:bg-primary/5">
            <div className="text-[10px] text-text-muted mb-1 font-bold">2</div>
            <div className="font-bold text-secondary text-sm">{game.odds.away.toFixed(2)}</div>
          </button>
        </div>

        {/* Predictions Count */}
        <div className="flex items-center justify-between text-[11px] font-bold text-text-muted uppercase tracking-widest pt-3 border-t border-border-subtle">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{game.predictionCount} picks</span>
          </div>
          <button className="text-primary hover:underline">
            View Detail
          </button>
        </div>
      </div>
    )
  }

  // Upcoming game
  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
          {game.league}
        </span>
        <span className="text-[11px] font-bold text-text-muted bg-workspace px-2 py-0.5 rounded">
          {format(game.startTime, 'HH:mm')}
        </span>
      </div>

      {/* Teams */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
            {game.homeTeam}
          </span>
          <span className="text-[11px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded leading-none">VS</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
            {game.awayTeam}
          </span>
        </div>
      </div>

      {/* Odds */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button className="bg-workspace p-2 rounded-lg text-center transition-colors hover:bg-primary/5">
          <div className="text-[10px] text-text-muted mb-1 font-bold">1</div>
          <div className="font-bold text-primary text-sm">{game.odds.home.toFixed(2)}</div>
        </button>
        {game.odds.draw && (
          <button className="bg-workspace p-2 rounded-lg text-center transition-colors hover:bg-primary/5">
            <div className="text-[10px] text-text-muted mb-1 font-bold">X</div>
            <div className="font-bold text-secondary text-sm">{game.odds.draw.toFixed(2)}</div>
          </button>
        )}
        <button className="bg-workspace p-2 rounded-lg text-center transition-colors hover:bg-primary/5">
          <div className="text-[10px] text-text-muted mb-1 font-bold">2</div>
          <div className="font-bold text-secondary text-sm">{game.odds.away.toFixed(2)}</div>
        </button>
      </div>

      {/* Predictions Count */}
      <div className="flex items-center justify-between text-[11px] font-bold text-text-muted uppercase tracking-widest pt-3 border-t border-border-subtle">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{game.predictionCount} picks</span>
        </div>
        <button className="text-primary hover:underline">
          Predict Now
        </button>
      </div>
    </div>
  )
}
