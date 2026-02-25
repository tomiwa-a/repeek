import { useState } from 'react'
import { X, Shield, Lock, User, Target, Share2, ChevronDown, ChevronUp, Zap, Activity } from 'lucide-react'
import type { Slip } from '../data/mockSlips'

interface SlipDetailProps {
  isOpen: boolean
  onClose: () => void
  slip: Slip | null
}

export default function SlipDetail({ isOpen, onClose, slip: rawSlip }: SlipDetailProps) {
  const [expandedLegs, setExpandedLegs] = useState<Record<string, boolean>>({})

  const toggleLeg = (id: string) => {
    setExpandedLegs(prev => ({ ...prev, [id]: !prev[id] }))
  }

  if (!isOpen || !rawSlip) return null

  // Normalization Layer: Handle both Slip and PredictionEquivalent
  const slip: Slip = (rawSlip as any).legs ? (rawSlip as Slip) : {
    id: (rawSlip as any).slipId || rawSlip.id,
    title: (rawSlip as any).pickLabel || 'PREDICTION_PROTOCOL',
    predictor: (rawSlip as any).predictor,
    legs: [rawSlip as any], // The prediction itself acts as the single leg
    totalOdds: (rawSlip as any).odds || 0,
    status: (rawSlip as any).status || 'pending',
    isPremium: (rawSlip as any).isPremium || false,
    timestamp: (rawSlip as any).timestamp || new Date(),
    price: (rawSlip as any).isPremium ? 2.50 : 0
  }

  const isWon = slip.status === 'won'
  const isLost = slip.status === 'lost'

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-obsidian/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white border-l-4 border-obsidian flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header Section */}
        <div className="bg-obsidian text-white p-4 relative overflow-hidden">
          <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 blur-3xl rounded-full -mr-12 -mt-12"></div>
          
          <div className="relative z-10 flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`px-1.5 py-0.5 text-[8px] font-black italic border ${
                  isWon ? 'bg-accent border-accent text-obsidian' : 
                  isLost ? 'bg-red-900 border-red-900 text-white' : 
                  'bg-white/10 border-white/20 text-white/40'
                }`}>
                  {slip.status.toUpperCase()}
                </span>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest italic">ID: {slip.id}</span>
              </div>
              <h2 className="text-xl font-black italic uppercase tracking-tighter leading-none">{slip.title}</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative z-10 flex items-center gap-8 border-t border-white/5 pt-3">
            <div>
              <div className="text-accent text-xl font-black italic leading-none">@{slip.totalOdds}</div>
              <div className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">TOTAL_ODDS</div>
            </div>
            <div>
              <div className="text-white text-xl font-black italic leading-none">{slip.legs.length}</div>
              <div className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">LEGS</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          
          {/* Predictor Info */}
          <section className="bg-workspace p-3 border-b border-obsidian/10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white border border-obsidian flex items-center justify-center -rotate-3 group shrink-0">
                   <User className="w-4 h-4 text-obsidian group-hover:scale-110 transition-transform" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] font-black uppercase italic text-obsidian leading-none mb-1 truncate">{slip.predictor.username}</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[8px] font-black text-obsidian uppercase italic">{slip.predictor.winRate}%_WR</span>
                    <span className="text-[8px] font-black text-zinc-400 uppercase italic">ELITE_OP</span>
                  </div>
                </div>
              </div>
              <button className="bg-obsidian text-accent px-2 py-1 text-[8px] font-black uppercase italic hover:bg-accent hover:text-obsidian transition-all shrink-0">
                DOSSIER
              </button>
            </div>
          </section>

          {/* Legs List */}
          <section className="space-y-3">
            <h3 className="text-[9px] font-black text-obsidian/40 uppercase tracking-[0.2em] italic flex items-center gap-1.5">
              <Activity className="w-3 h-3" /> COMPONENT_LEGS
            </h3>
            
            <div className="space-y-2.5">
              {slip.legs.map((leg, idx) => {
                const isExpanded = expandedLegs[leg.id]
                const confColor = 
                  leg.confidence === 'high' ? 'text-accent border-accent bg-accent/5' :
                  leg.confidence === 'medium' ? 'text-orange-500 border-orange-500 bg-orange-500/5' :
                  'text-zinc-600 border-zinc-600 bg-zinc-600/5'
                
                // Concise market label
                const concisePick = leg.pickLabel
                  .replace(/OVER /g, 'O')
                  .replace(/UNDER /g, 'U')
                  .replace(/ GOALS/g, '')

                return (
                <div key={leg.id} className="border border-obsidian p-3 space-y-2.5 relative group">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="bg-obsidian text-white text-[7px] font-black px-1 py-0.5 italic leading-none">L_{idx + 1}</span>
                        <span className="text-[8px] font-black text-obsidian/30 uppercase italic">{leg.game.league}</span>
                      </div>
                      <h4 className="text-base font-black italic uppercase tracking-tighter text-obsidian leading-none">{leg.game.homeTeam} VS {leg.game.awayTeam}</h4>
                    </div>
                    <div className="text-right">
                       <div className="text-sm font-black italic text-obsidian leading-none">@{leg.odds}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="bg-workspace border border-obsidian/5 px-2 py-1.5 flex-1 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Target className="w-2.5 h-2.5 text-obsidian/40" />
                        <span className="text-[10px] font-black uppercase italic text-obsidian">{concisePick}</span>
                      </div>
                    </div>
                    <div className={`border px-2 py-1.5 flex-1 flex items-center justify-between ${confColor}`}>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-2.5 h-2.5" />
                        <span className="text-[10px] font-black uppercase italic">{leg.confidence}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => toggleLeg(leg.id)}
                    className="w-full bg-workspace/40 py-1.5 px-2 flex items-center justify-between group/btn hover:bg-obsidian transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-2.5 h-2.5 text-obsidian/20 group-hover/btn:text-accent" />
                      <span className="text-[8px] font-black uppercase italic text-obsidian/40 group-hover/btn:text-white/40 tracking-widest">TECHNICAL_REPORT</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-3 h-3 text-obsidian/20 group-hover/btn:text-white" /> : <ChevronDown className="w-3 h-3 text-obsidian/20 group-hover/btn:text-white" />}
                  </button>

                  {isExpanded && (
                    <div className="px-2 pt-1 border-l-2 border-obsidian/10">
                      <p className="text-[9px] font-bold text-zinc-500 leading-relaxed uppercase italic">
                        {leg.analysis}
                      </p>
                    </div>
                  )}
                </div>
              )})}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="bg-white p-6 border-t-4 border-obsidian space-y-3">
           {slip.isPremium ? (
             <div className="bg-white text-obsidian p-4 border-2 border-obsidian relative group overflow-hidden">
               <div className="absolute inset-0 bg-obsidian/5 group-hover:bg-obsidian/10 transition-all pointer-events-none"></div>
               <div className="relative z-10 flex flex-col gap-3">
                 <div className="flex items-center justify-between">
                   <div>
                     <div className="flex items-center gap-2 mb-0.5">
                        <Lock className="w-3.5 h-3.5 text-obsidian" />
                        <h4 className="text-sm font-black italic uppercase">ENCRYPTED_SLIP</h4>
                     </div>
                     <p className="text-[8px] font-black text-obsidian/40 uppercase italic">PREMIUM_CREDENTIALS_REQUIRED</p>
                   </div>
                   <div className="text-right">
                     <div className="text-[7px] font-black text-obsidian/40 uppercase italic mb-0.5">ACCESS_FEE</div>
                     <div className="text-lg font-black italic text-obsidian">$2.50</div>
                   </div>
                 </div>
                 <button className="btn-volt w-full py-3 text-[10px] tracking-widest uppercase font-black italic">
                   UNLOCK_ACCESS_PROTOCOL
                 </button>
               </div>
             </div>
           ) : (
             <div className="flex gap-3">
               <button className="flex-1 btn-volt py-3 text-[10px] tracking-widest flex items-center justify-center gap-2 italic font-black uppercase">
                 <Target className="w-3.5 h-3.5" /> DEPLOY_BET
               </button>
               <button className="p-3 bg-obsidian text-white hover:bg-accent hover:text-obsidian transition-all">
                 <Share2 className="w-4 h-4" />
               </button>
             </div>
           )}
           <div className="text-center">
               <span className="text-[9px] font-black text-zinc-400 uppercase italic tracking-[0.2em]">PROTOCOL: ELITE_ALPHA</span>
           </div>
        </div>

      </div>
    </div>
  )
}
