import { useState, useMemo } from 'react'
import { X, Trash2, Calculator, Shield, DollarSign, Activity, Target, Zap } from 'lucide-react'
import { useUI } from '../context/UIContext'

interface SlipBuilderProps {
  isOpen: boolean
  onClose: () => void
}

export default function SlipBuilder({ isOpen, onClose }: SlipBuilderProps) {
  const { 
    builderLegs, 
    removeLegFromBuilder, 
    updateLegInBuilder 
  } = useUI()
  
  const [price, setPrice] = useState('0.00')
  const [isLocked, setIsLocked] = useState(false)
  const [editingAnalysisId, setEditingAnalysisId] = useState<string | null>(null)

  const activeLegForAnalysis = useMemo(() => 
    builderLegs.find(l => l.game.id === editingAnalysisId),
    [editingAnalysisId, builderLegs]
  )

  const totalOdds = useMemo(() => {
    return builderLegs.reduce((acc, leg) => {
      const odd = leg.game.odds[leg.pick] || 1
      return acc * odd
    }, 1).toFixed(2)
  }, [builderLegs])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-obsidian/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer - Synchronized width and style with SlipDetail */}
      <div className="relative w-full max-w-md bg-white border-l-4 border-obsidian flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header - High Density */}
        <div className="bg-obsidian text-white p-4 relative overflow-hidden shrink-0">
          <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 text-[8px] font-black italic border bg-white/10 border-white/20 text-white/40">
                  DRAFT_STAGING
                </span>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest italic">VERSION: 2.1</span>
              </div>
              <h2 className="text-xl font-black italic uppercase tracking-tighter leading-none">PROPOSE_NEW_SLIP</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          
          {/* Active Legs - Compact & Dense */}
          <section className="space-y-3">
            <h3 className="text-[9px] font-black text-obsidian/40 uppercase tracking-[0.2em] italic flex items-center gap-1.5">
              <Activity className="w-3 h-3" /> COMPONENT_LEGS
            </h3>
            
            {builderLegs.length === 0 ? (
              <div className="py-12 border border-dashed border-obsidian/10 flex flex-col items-center justify-center opacity-20">
                <Calculator className="w-8 h-8 mb-2" />
                <p className="text-[8px] font-black uppercase tracking-widest italic">ZERO_ACTIVE_LEGS</p>
              </div>
            ) : (
              <div className="space-y-2">
                {builderLegs.map((leg, idx) => (
                  <div key={leg.game.id} className="border border-obsidian p-3 space-y-2.5 relative group">
                    <button 
                      onClick={() => removeLegFromBuilder(leg.game.id)}
                      className="absolute top-2 right-2 text-obsidian/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <span className="bg-obsidian text-white text-[7px] font-black px-1 py-0.5 italic leading-none">L_{idx + 1}</span>
                      <span className="text-[8px] font-black text-obsidian/30 uppercase italic">{leg.game.league}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1.5">
                      <h4 className="text-sm font-black italic uppercase tracking-tighter text-obsidian leading-none pr-6 truncate flex-1">{leg.game.homeTeam} VS {leg.game.awayTeam}</h4>
                      <button
                        onClick={() => setEditingAnalysisId(leg.game.id)}
                        className={`p-1.5 border transition-all flex items-center gap-1.5 ${
                          leg.analysis.trim() 
                            ? 'bg-accent border-accent text-obsidian shadow-[0_0_10px_rgba(163,255,0,0.3)]' 
                            : 'bg-white border-obsidian/10 text-obsidian/20 hover:border-obsidian hover:text-obsidian'
                        }`}
                      >
                        <Zap className={`w-3 h-3 ${leg.analysis.trim() ? 'fill-obsidian' : ''}`} />
                        <span className="text-[7px] font-black uppercase italic tracking-widest">
                          {leg.analysis.trim() ? 'ANALYSIS_ATTACHED' : 'ADD_ANALYSIS'}
                        </span>
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {(['home', 'draw', 'away'] as const).map(option => (
                        <button
                          key={option}
                          onClick={() => updateLegInBuilder(leg.game.id, { pick: option })}
                          className={`py-1.5 text-[9px] font-black uppercase italic border transition-all ${
                            leg.pick === option 
                              ? 'bg-obsidian border-obsidian text-accent' 
                              : 'bg-white border-obsidian/10 text-obsidian/40 hover:border-obsidian'
                          }`}
                        >
                          {option} (@{leg.game.odds[option]})
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer Fixed Section - High Density Configuration */}
        <div className="bg-white border-t-4 border-obsidian shrink-0">
          {/* Access Configuration - Fixed at bottom of content scroll */}
          <div className="p-4 bg-workspace/50 border-b-2 border-obsidian/5 grid grid-cols-2 gap-3">
             <button 
                onClick={() => setIsLocked(!isLocked)}
                className={`flex items-center justify-between p-3 border transition-all ${
                  isLocked ? 'bg-obsidian border-obsidian' : 'bg-white border-obsidian/20'
                }`}
              >
                <div className="text-left">
                  <div className={`text-[8px] font-black uppercase italic ${isLocked ? 'text-accent' : 'text-obsidian'}`}>VISIBILITY</div>
                  <div className={`text-[7px] font-bold uppercase leading-none mt-0.5 ${isLocked ? 'text-white/40' : 'text-zinc-400'}`}>
                    {isLocked ? 'PREMIUM_ONLY' : 'PUBLIC_ACCESS'}
                  </div>
                </div>
                <Shield className={`w-3.5 h-3.5 ${isLocked ? 'text-accent' : 'text-obsidian/20'}`} />
              </button>

              <div className={`bg-white border p-2.5 flex items-center justify-between transition-all ${isLocked ? 'border-obsidian/20' : 'border-obsidian/5 opacity-50'}`}>
                <div>
                  <div className="text-[8px] font-black uppercase italic text-obsidian mb-0.5">ACCESS_FEE</div>
                  <div className="flex items-center">
                    <DollarSign className={`w-3 h-3 ${isLocked ? 'text-obsidian/40' : 'text-obsidian/20'}`} />
                    <input 
                      type="text" 
                      value={price}
                      disabled={!isLocked}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-transparent font-black text-sm outline-none italic w-16 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="text-left">
              <div className="text-[8px] font-black text-obsidian/40 uppercase italic tracking-widest leading-none">CALCULATED_ODDS</div>
              <div className="text-2xl font-black italic text-obsidian mt-1 leading-none">@{totalOdds}</div>
            </div>
            <button 
              disabled={builderLegs.length === 0}
              className="btn-volt py-3 px-8 text-[10px] tracking-widest flex items-center gap-2 font-black italic disabled:opacity-20 transition-all uppercase"
              onClick={onClose}
            >
              DEPLOY_PROTOCOL <Target className="w-4 h-4" />
            </button>
          </div>
          
          <div className="pb-4 text-center">
             <span className="text-[8px] font-black text-zinc-300 uppercase italic tracking-[0.2em]">OPERATIONAL_STATUS: READY</span>
          </div>
        </div>

      </div>

      {/* Analysis Modal Overlay */}
      {editingAnalysisId && activeLegForAnalysis && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-obsidian/40 backdrop-blur-sm transition-all animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white border-2 border-obsidian relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200">
             <div className="bg-obsidian text-white p-3 flex justify-between items-center border-b border-accent">
                <div className="flex items-center gap-2">
                   <Zap className="w-3 h-3 text-accent fill-accent" />
                   <span className="text-[10px] font-black uppercase italic tracking-widest">TECHNICAL_ANALYSIS_MODAL</span>
                </div>
                <button onClick={() => setEditingAnalysisId(null)} className="p-1 hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
             </div>
             <div className="p-4 space-y-4">
                <div className="space-y-1">
                   <div className="text-[8px] font-black text-obsidian/40 uppercase italic">{activeLegForAnalysis.game.league}</div>
                   <div className="text-sm font-black text-obsidian uppercase italic">{activeLegForAnalysis.game.homeTeam} VS {activeLegForAnalysis.game.awayTeam}</div>
                </div>
                <textarea 
                  autoFocus
                  value={activeLegForAnalysis.analysis}
                  onChange={(e) => updateLegInBuilder(activeLegForAnalysis.game.id, { analysis: e.target.value })}
                  placeholder="ENTER_PROTOCOL_INTEL_HERE..."
                  className="w-full bg-workspace border border-obsidian/10 p-4 text-[11px] font-bold uppercase italic outline-none focus:border-obsidian min-h-[160px] no-scrollbar resize-none"
                />
                <button 
                  onClick={() => setEditingAnalysisId(null)}
                  className="w-full btn-volt py-3 text-[10px] font-black uppercase italic tracking-widest"
                >
                  SAVE_PROTOCOL_REPORT
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}
