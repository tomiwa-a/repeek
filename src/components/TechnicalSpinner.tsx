import { Activity } from 'lucide-react'

export default function TechnicalSpinner({ label = "SCANNING_NETWORK" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 select-none pointer-events-none">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-2 border-obsidian/10 border-t-accent rounded-full animate-spin"></div>
        
        {/* Inner Glitch Ring */}
        <div className="absolute inset-2 border border-obsidian/5 border-b-accent/40 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        
        {/* Core Icon */}
        <Activity className="w-5 h-5 text-obsidian/80" />
        
        {/* Scanning Beam */}
        <div className="absolute -inset-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-1 w-[200%] -translate-x-1/4 animate-[scan_2s_ease-in-out_infinite]"></div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-[10px] font-black italic text-obsidian uppercase tracking-[0.3em] animate-pulse">
           {label}
        </div>
        <div className="flex gap-1">
           {Array.from({ length: 5 }).map((_, i) => (
             <div 
               key={i} 
               className="w-1.5 h-0.5 bg-obsidian/20 animate-pulse" 
               style={{ animationDelay: `${i * 0.1}s` }}
             ></div>
           ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-40px) translateX(-25%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(40px) translateX(-25%); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
