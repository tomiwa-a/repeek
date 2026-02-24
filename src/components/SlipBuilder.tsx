import { useState, useMemo } from 'react'
import { X, Search, Plus, Trash2, Calculator, Shield, ShieldOff, DollarSign } from 'lucide-react'
import { mockGames } from '../data/mockGames'
import { useUI } from '../context/UIContext'

interface SlipBuilderProps {
  isOpen: boolean
  onClose: () => void
}

export default function SlipBuilder({ isOpen, onClose }: SlipBuilderProps) {
  const { 
    builderLegs, 
    addLegToBuilder, 
    removeLegFromBuilder, 
    updateLegInBuilder 
  } = useUI()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [price, setPrice] = useState('2.00')
  const [isLocked, setIsLocked] = useState(true)

  // Filter games based on search
  const availableGames = useMemo(() => {
    return mockGames.filter(g => 
      !g.isLive && 
      (g.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) || 
       g.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
       g.league.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !builderLegs.find(l => l.game.id === g.id)
    ).slice(0, 5)
  }, [searchTerm, builderLegs])

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
        className="absolute inset-0 bg-obsidian/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-xl bg-white border-l-4 border-obsidian flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-obsidian text-white p-6 flex justify-between items-center border-b-4 border-accent">
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter leading-none mb-1">PROPOSE_NEW_SLIP</h2>
            <div className="flex gap-4">
              <span className="text-[10px] font-black text-accent uppercase italic">PROTOCOL: V.2.1</span>
              <span className="text-[10px] font-black text-white/40 uppercase italic">OPERATOR: {builderLegs.length > 0 ? `${builderLegs.length}_LEGS` : 'EMPTY'}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          
          {/* Game Selection */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-obsidian/40 uppercase tracking-[0.2em] italic">SEARCH_GAME_FEED</h3>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/20 group-focus-within:text-accent transition-colors" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="FIND_TEAMS_LEAGUES..." 
                className="w-full bg-workspace border-2 border-obsidian px-10 py-3 text-[11px] font-black uppercase italic outline-none focus:border-accent transition-all" 
              />
            </div>

            {searchTerm && availableGames.length > 0 && (
              <div className="bg-obsidian border-2 border-accent p-1 space-y-1 mt-2">
                {availableGames.map(game => (
                  <button 
                    key={game.id}
                    onClick={() => {
                        addLegToBuilder(game);
                        setSearchTerm('');
                    }}
                    className="w-full flex justify-between items-center p-3 bg-white hover:bg-workspace transition-colors group"
                  >
                    <div className="text-left">
                      <div className="text-[10px] font-black uppercase italic text-obsidian">{game.homeTeam} VS {game.awayTeam}</div>
                      <div className="text-[8px] font-bold text-zinc-500 uppercase">{game.league}</div>
                    </div>
                    <Plus className="w-4 h-4 text-obsidian/20 group-hover:text-accent group-hover:scale-125 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Added Legs */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-obsidian/40 uppercase tracking-[0.2em] italic">ACTIVE_PROTOCOL_LEGS</h3>
            
            {builderLegs.length === 0 ? (
              <div className="py-20 border-2 border-dashed border-obsidian/10 flex flex-col items-center justify-center opacity-30">
                <Calculator className="w-12 h-12 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest">ZERO_ACTIVE_LEGS_DETECTED</p>
              </div>
            ) : (
              <div className="space-y-4">
                {builderLegs.map((leg, idx) => (
                  <div key={leg.game.id} className="bg-workspace border-l-4 border-obsidian p-4 space-y-4 relative group">
                    <button 
                      onClick={() => removeLegFromBuilder(leg.game.id)}
                      className="absolute top-4 right-4 text-obsidian/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black text-white bg-obsidian px-1.5 py-0.5 italic leading-none">LEG_{idx + 1}</span>
                      <span className="text-[11px] font-black uppercase italic text-obsidian">{leg.game.homeTeam} VS {leg.game.awayTeam}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {(['home', 'draw', 'away'] as const).map(option => (
                        <button
                          key={option}
                          onClick={() => updateLegInBuilder(leg.game.id, { pick: option })}
                          className={`py-2 text-[10px] font-black uppercase italic border-2 transition-all ${
                            leg.pick === option 
                              ? 'bg-obsidian border-obsidian text-accent' 
                              : 'bg-white border-obsidian/5 text-obsidian/40 hover:border-obsidian hover:text-obsidian shadow-sm'
                          }`}
                        >
                          {option} (@{leg.game.odds[option]})
                        </button>
                      ))}
                    </div>

                    <textarea 
                      value={leg.analysis}
                      onChange={(e) => updateLegInBuilder(leg.game.id, { analysis: e.target.value })}
                      placeholder="ENTER_TECHNICAL_ANALYSIS_PROTOCOL..."
                      className="w-full bg-white border border-obsidian/10 p-3 text-[10px] font-bold uppercase italic outline-none focus:border-obsidian min-h-[80px] no-scrollbar"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Pricing & Visibility */}
          <section className="pt-8 border-t-2 border-obsidian/5 space-y-6">
            <h3 className="text-[10px] font-black text-obsidian/40 uppercase tracking-[0.2em] italic">ACCESS_CONFIGURATION</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Toggle Lock */}
              <button 
                onClick={() => setIsLocked(!isLocked)}
                className={`flex items-center justify-between p-4 border-2 transition-all ${
                  isLocked ? 'bg-obsidian border-obsidian' : 'bg-white border-obsidian'
                }`}
              >
                <div className="text-left">
                  <div className={`text-[10px] font-black uppercase italic ${isLocked ? 'text-accent' : 'text-obsidian'}`}>ENCRYPTION</div>
                  <div className={`text-[8px] font-bold uppercase ${isLocked ? 'text-white/40' : 'text-zinc-400'}`}>
                    {isLocked ? 'PROTOCOL: LOCKED' : 'PROTOCOL: PUBLIC'}
                  </div>
                </div>
                {isLocked ? <Shield className="w-5 h-5 text-accent" /> : <ShieldOff className="w-5 h-5 text-obsidian/20" />}
              </button>

              {/* Price Input */}
              <div className="bg-white border-2 border-obsidian p-4 relative">
                <div className="text-[10px] font-black uppercase italic text-obsidian mb-1">PRICE_UNIT</div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-obsidian" />
                  <input 
                    type="text" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full font-black text-lg outline-none italic"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer / Summary */}
        <div className="bg-workspace p-6 border-t-4 border-obsidian flex items-center justify-between">
          <div className="text-left">
            <div className="text-[10px] font-black text-obsidian/40 uppercase italic tracking-widest">TOTAL_CALCULATED_ODDS</div>
            <div className="text-3xl font-black italic text-obsidian leading-none">@{totalOdds}</div>
          </div>
          <button 
            disabled={builderLegs.length === 0}
            className="btn-volt py-4 px-10 text-xs tracking-widest flex items-center gap-3 disabled:opacity-20 disabled:grayscale transition-all"
            onClick={onClose}
          >
            INITIATE_PROTOCOL <Plus className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  )
}
