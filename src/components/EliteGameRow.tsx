import { MessageSquare, ChevronRight, Plus } from 'lucide-react'

interface EliteGameRowProps {
  game: {
    homeTeam: string
    awayTeam: string
    homeScore?: number
    awayScore?: number
    league: string
    isLive: boolean
    time?: string
    predictionCount: number
    sportKey?: string
    id: string
    odds?: any
  }
  onAdd?: (e: React.MouseEvent) => void
}

export default function EliteGameRow({ game, onAdd }: EliteGameRowProps) {
  return (
    <div className="group relative bg-white border border-obsidian/10 hover:border-obsidian transition-all cursor-pointer flex items-center h-10 overflow-hidden select-none">
      {/* Time / Status Side-rail */}
      <div className={`w-12 h-full flex flex-col items-center justify-center border-r border-obsidian/5 shrink-0 ${game.isLive ? 'bg-obsidian text-accent' : 'bg-workspace text-obsidian/40'}`}>
        {game.isLive ? (
          <div className="flex flex-col items-center leading-none">
            <span className="text-[7px] font-black uppercase tracking-tighter animate-pulse text-white">LIVE</span>
            <span className="text-[10px] font-black italic">''42</span>
          </div>
        ) : (
          <span className="text-[9px] font-mono font-bold tracking-tighter">{game.time || '--:--'}</span>
        )}
      </div>

      {/* League Badge - High Density */}
      <div className="hidden md:flex w-16 border-r border-obsidian/5 items-center px-2 shrink-0 overflow-hidden">
        <span className="text-[7px] font-black uppercase italic text-obsidian/30 truncate tracking-widest">{game.league}</span>
      </div>

      {/* Teams & Scores Feed */}
      <div className="flex-1 flex items-center px-2 md:px-4 gap-2 md:gap-4">
        <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-end min-w-0">
          <span className="text-[10px] md:text-[11px] font-black italic uppercase tracking-tighter text-obsidian truncate group-hover:text-accent transition-colors">{game.homeTeam}</span>
          <span className={`font-mono text-[12px] md:text-[13px] font-black w-5 md:w-6 text-center shrink-0 ${game.isLive ? 'text-obsidian' : 'text-obsidian/20'}`}>
            {game.isLive ? game.homeScore : '-'}
          </span>
        </div>
        
        <div className="text-[7px] md:text-[8px] font-black text-obsidian/10 italic shrink-0">VS</div>
        
        <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-start min-w-0">
          <span className={`font-mono text-[12px] md:text-[13px] font-black w-5 md:w-6 text-center shrink-0 ${game.isLive ? 'text-obsidian' : 'text-obsidian/20'}`}>
            {game.isLive ? game.awayScore : '-'}
          </span>
          <span className="text-[10px] md:text-[11px] font-black italic uppercase tracking-tighter text-obsidian truncate group-hover:text-accent transition-colors">{game.awayTeam}</span>
        </div>
      </div>

      {/* Prediction Intel */}
      <div className="hidden md:flex w-24 border-l border-obsidian/5 items-center justify-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
        <MessageSquare className="w-2.5 h-2.5" />
        <span className="text-[9px] font-black italic tracking-tighter">{game.predictionCount} SIGNALS</span>
      </div>

      {/* Action Indicators */}
      <div className="flex h-full border-l border-obsidian/5">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.(e);
          }}
          className="w-8 h-full flex items-center justify-center bg-workspace/0 hover:bg-accent group/add transition-colors border-r border-obsidian/5"
        >
          <Plus className="w-3.5 h-3.5 text-obsidian/40 group-hover/add:text-obsidian transition-colors" />
        </button>
        <div className="w-8 h-full flex items-center justify-center bg-workspace/0 group-hover:bg-workspace transition-colors">
          <ChevronRight className="w-3 h-3 text-obsidian transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Active Scanline Effect (Hover Only) */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
    </div>
  )
}
