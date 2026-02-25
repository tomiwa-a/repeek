import { Plus, Layout } from 'lucide-react'
import { useUI } from '../context/UIContext'

export default function FloatingSlipButton() {
  const { 
    openSlipBuilder, 
    builderLegs, 
    isSlipBuilderOpen, 
    isSlipDetailOpen,
    isSidebarOpen 
  } = useUI()
  
  const activeLegsCount = builderLegs.length
  
  // Hide if any sidebar/drawer/menu is open
  if (isSlipBuilderOpen || isSlipDetailOpen || isSidebarOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-[60] group">
      {/* Badge */}
      {activeLegsCount > 0 && (
        <div className="absolute -top-2 -right-1 bg-accent text-obsidian text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-none border-2 border-obsidian z-10 animate-in zoom-in duration-300">
          {activeLegsCount}
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={openSlipBuilder}
        className="bg-obsidian text-white p-3.5 shadow-[3px_3px_0px_0px_rgba(163,255,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all border-2 border-obsidian relative overflow-hidden flex items-center justify-center group/btn"
      >
        <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
        
        {activeLegsCount > 0 ? (
          <Layout className="w-5 h-5 group-hover/btn:text-accent transition-colors" />
        ) : (
          <Plus className="w-5 h-5 group-hover/btn:text-accent transition-colors" />
        )}
      </button>
    </div>
  )
}
