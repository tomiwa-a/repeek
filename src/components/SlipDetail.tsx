import { X, Shield, Lock, User, Target, BarChart3, Share2 } from 'lucide-react'
import type { Slip } from '../data/mockSlips'

interface SlipDetailProps {
  isOpen: boolean
  onClose: () => void
  slip: Slip | null
}

export default function SlipDetail({ isOpen, onClose, slip }: SlipDetailProps) {
  if (!isOpen || !slip) return null

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
      <div className="relative w-full max-w-2xl bg-white border-l-4 border-obsidian flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header Section */}
        <div className="bg-obsidian text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
          
          <div className="relative z-10 flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-[10px] font-black italic border ${
                  isWon ? 'bg-accent border-accent text-obsidian' : 
                  isLost ? 'bg-red-900 border-red-900 text-white' : 
                  'bg-white/10 border-white/20 text-white/40'
                }`}>
                  {slip.status.toUpperCase()}
                </span>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">ID: {slip.id}</span>
              </div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{slip.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 transition-colors">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="relative z-10 flex items-center gap-12 border-t border-white/10 pt-6">
            <div>
              <div className="text-accent text-3xl font-black italic leading-none">@{slip.totalOdds}</div>
              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-1">TOTAL_CALCULATED_ODDS</div>
            </div>
            <div>
              <div className="text-white text-3xl font-black italic leading-none">{slip.legs.length}</div>
              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-1">ACTIVE_LEGS</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
          
          {/* Predictor Info */}
          <section className="bg-workspace p-6 border-b-4 border-obsidian/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border-2 border-obsidian flex items-center justify-center -rotate-3 group">
                   <User className="w-6 h-6 text-obsidian group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black uppercase italic text-obsidian leading-none mb-1">{slip.predictor.username}</h4>
                  <div className="flex gap-3">
                    <span className="text-[9px] font-black text-accent uppercase italic">{slip.predictor.winRate}%_WIN_RATE</span>
                    <span className="text-[9px] font-black text-zinc-400 uppercase italic">LEVEL_15_ELITE</span>
                  </div>
                </div>
              </div>
              <button className="bg-obsidian text-accent px-4 py-2 text-[10px] font-black uppercase italic hover:bg-accent hover:text-obsidian transition-all">
                VIEW_DOSSIER
              </button>
            </div>
          </section>

          {/* Legs List */}
          <section className="space-y-4">
            <h3 className="text-[11px] font-black text-obsidian/40 uppercase tracking-[0.2em] italic flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> COMPONENT_LEGS_PROTOCOL
            </h3>
            
            <div className="space-y-4">
              {slip.legs.map((leg, idx) => (
                <div key={leg.id} className="border-2 border-obsidian p-6 space-y-4 relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-obsidian text-white text-[9px] font-black px-2 py-0.5 italic">LEG_{idx + 1}</span>
                        <span className="text-[10px] font-black text-obsidian/40 uppercase italic">{leg.game.league}</span>
                      </div>
                      <h4 className="text-xl font-black italic uppercase tracking-tighter text-obsidian">{leg.game.homeTeam} VS {leg.game.awayTeam}</h4>
                    </div>
                    <div className="text-right">
                       <div className="text-lg font-black italic text-obsidian">@{leg.odds}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-accent/10 border border-accent/20 px-4 py-2 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-3.5 h-3.5 text-obsidian" />
                        <span className="text-[9px] font-black uppercase italic text-obsidian/40">PICK_TYPE</span>
                      </div>
                      <div className="text-[13px] font-black uppercase italic text-obsidian">{leg.pickLabel}</div>
                    </div>
                    <div className="bg-obsidian text-white px-4 py-2 flex-1 relative overflow-hidden">
                       <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
                       <div className="relative z-10 flex items-center gap-2 mb-1">
                        <Shield className="w-3.5 h-3.5 text-accent" />
                        <span className="text-[9px] font-black uppercase italic text-accent">CONFIDENCE</span>
                      </div>
                      <div className="relative z-10 text-[13px] font-black uppercase italic">{leg.confidence}_PROTOCOL</div>
                    </div>
                  </div>

                  <div className="bg-workspace p-4">
                    <div className="text-[8px] font-black text-obsidian/20 uppercase tracking-widest mb-1 italic">TECHNICAL_ANALYSIS</div>
                    <p className="text-[11px] font-bold text-zinc-600 leading-relaxed uppercase italic">
                      {leg.analysis}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="bg-white p-8 border-t-4 border-obsidian space-y-4">
           {slip.isPremium ? (
             <div className="bg-obsidian text-white p-6 border-b-4 border-accent relative group overflow-hidden">
               <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-all pointer-events-none"></div>
               <div className="relative z-10 flex items-center justify-between">
                 <div>
                   <div className="flex items-center gap-2 mb-1">
                      <Lock className="w-4 h-4 text-accent" />
                      <h4 className="text-lg font-black italic uppercase italic">ENCRYPTED_SLIP</h4>
                   </div>
                   <p className="text-[10px] font-black text-white/40 uppercase italic">REQUIRES_PREMIUM_CREDENTIALS</p>
                 </div>
                 <button className="btn-volt px-10 py-4 text-xs tracking-widest">
                   UNLOCK_FOR_2.50
                 </button>
               </div>
             </div>
           ) : (
             <div className="flex gap-4">
               <button className="flex-1 btn-volt py-4 text-xs tracking-widest flex items-center justify-center gap-3 italic font-black uppercase">
                 <Target className="w-4 h-4" /> DEPLOY_BET_PROTOCOL
               </button>
               <button className="p-4 bg-obsidian text-white hover:bg-accent hover:text-obsidian transition-all">
                 <Share2 className="w-5 h-5" />
               </button>
             </div>
           )}
           <div className="text-center">
              <span className="text-[9px] font-black text-zinc-400 uppercase italic tracking-[0.2em]">PROTOCOL: ELITE_ALPHA_v4.2</span>
           </div>
        </div>

      </div>
    </div>
  )
}
