import { MessageSquare, ChevronRight } from 'lucide-react'

interface GameCardProps {
  game: {
    homeTeam: string
    awayTeam: string
    homeScore: number
    awayScore: number
    league: string
    isLive: boolean
    time: string
    predictionCount: number
  }
  compact?: boolean
}

export default function GameCard({ game, compact = false }: GameCardProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-white border border-obsidian/10 hover:border-obsidian transition-all cursor-pointer group">
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center justify-between pr-4 text-obsidian">
            <span className="text-[11px] font-black italic uppercase tracking-tighter truncate">{game.homeTeam}</span>
            <span className="font-mono text-[11px] font-black">{game.isLive ? game.homeScore : '0'}</span>
          </div>
          <div className="flex items-center justify-between pr-4 text-obsidian">
            <span className="text-[11px] font-black italic uppercase tracking-tighter truncate">{game.awayTeam}</span>
            <span className="font-mono text-[11px] font-black">{game.isLive ? game.awayScore : '0'}</span>
          </div>
        </div>
        {game.isLive && (
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse border border-obsidian/20"></div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-obsidian p-5 shadow-sm hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md transition-all group relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-obsidian/5">
        <span className="text-[10px] font-black text-obsidian/40 tracking-widest uppercase italic">{game.league}</span>
        {game.isLive ? (
          <div className="flex items-center gap-1.5 bg-obsidian px-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-white italic">LIVE MATCH</span>
          </div>
        ) : (
          <div className="bg-workspace border border-obsidian/10 px-2 py-1 text-obsidian/40">
            <span className="text-[9px] font-black uppercase tracking-widest">{game.time}</span>
          </div>
        )}
      </div>

      {/* Match Content */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black italic uppercase tracking-tighter text-obsidian group-hover:text-accent transition-colors">{game.homeTeam}</h3>
          <div className="bg-obsidian text-white w-10 h-10 flex items-center justify-center font-mono text-xl font-black italic">
            {game.isLive ? game.homeScore : '0'}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black italic uppercase tracking-tighter text-obsidian group-hover:text-accent transition-colors">{game.awayTeam}</h3>
          <div className="bg-obsidian text-white w-10 h-10 flex items-center justify-center font-mono text-xl font-black italic">
            {game.isLive ? game.awayScore : '0'}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-4 border-t border-obsidian/5">
        <div className="flex items-center gap-1.5 text-obsidian/40 text-[10px] font-black uppercase italic">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{game.predictionCount} PICKS</span>
        </div>
        <button className="text-[10px] font-black italic uppercase hover:text-accent flex items-center gap-1 text-obsidian">
          MATCH DETAILS <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
