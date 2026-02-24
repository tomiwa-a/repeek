import { ExternalLink, Layers, ChevronRight } from 'lucide-react'
import type { Slip } from '../data/mockSlips'

export default function SlipListItem({ slip }: { slip: Slip }) {
  const isWon = slip.status === 'won'
  const isLost = slip.status === 'lost'
  
  // Get first leg info for primary display
  const primaryLeg = slip.legs[0]
  
  return (
    <div className="group bg-white border-2 border-obsidian p-4 shadow-sm hover:border-accent transition-all cursor-pointer">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          {/* Status Indicator */}
          <div className="mt-1">
            <div className={`w-8 h-8 flex items-center justify-center font-black text-[10px] italic border-2 ${
              isWon ? 'bg-accent border-obsidian text-obsidian' : 
              isLost ? 'bg-red-900 border-obsidian text-white' : 
              'bg-workspace border-obsidian/10 text-obsidian/20'
            }`}>
              {primaryLeg.game.league.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[11px] font-black uppercase italic text-obsidian tracking-tighter leading-none">
                {slip.title}
              </h3>
              {slip.legs.length > 1 && (
                <span className="flex items-center gap-1 bg-obsidian text-white text-[8px] font-black px-1.5 py-0.5 leading-none italic">
                  <Layers className="w-2.5 h-2.5" /> {slip.legs.length}_LEGS
                </span>
              )}
            </div>
            <div className="text-[9px] font-bold text-zinc-400 font-mono uppercase">
              {slip.timestamp.toLocaleDateString()} // {slip.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12">
          {/* Odds Section */}
          <div className="text-right">
            <div className="text-[11px] font-black italic text-obsidian leading-none">@{slip.totalOdds}</div>
            <div className="text-[8px] font-bold text-zinc-400 uppercase mt-1">TOTAL_ODDS</div>
          </div>

          {/* Result Badge */}
          <div className={`px-3 py-1 text-[9px] font-black uppercase italic border-2 leading-none ${
            isWon ? 'border-accent text-accent' : 
            isLost ? 'border-red-900 text-red-900' : 
            'border-obsidian/10 text-obsidian/20'
          }`}>
            {slip.status}
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-workspace/50 text-obsidian/20 group-hover:text-accent group-hover:bg-obsidian transition-all">
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
             <ChevronRight className="w-4 h-4 text-obsidian/10 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  )
}
