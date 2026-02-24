import { TrendingUp, UserPlus } from 'lucide-react'

interface PredictorCardProps {
  predictor: {
    username: string
    displayName: string
    winRate: number
    followers: number
    specialties: string[]
    isPremium: boolean
    streak: number
  }
  compact?: boolean
}

export default function PredictorCard({ predictor, compact = false }: PredictorCardProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-white border border-obsidian/10 hover:border-obsidian transition-all group cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-workspace border border-obsidian/5 flex items-center justify-center font-black text-[10px] italic text-obsidian">
            {predictor.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[11px] font-black uppercase italic text-obsidian leading-none mb-1">
              {predictor.username}
            </p>
            <span className="text-[9px] font-bold text-text-muted">{predictor.winRate}% WR</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3 h-3 text-accent bg-obsidian" />
          <span className="text-[10px] font-mono font-black text-obsidian">+{predictor.streak}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-obsidian p-5 shadow-sm hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md transition-all group relative overflow-hidden">
      {/* Absolute Rank Mark */}
      <div className="absolute top-0 right-0 bg-obsidian text-white px-2 py-1 text-[9px] font-black italic tracking-tighter z-10">
        TOP ANALYST
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-workspace border-2 border-obsidian flex items-center justify-center text-xl font-black italic group-hover:bg-accent transition-colors text-obsidian">
            {predictor.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-base font-black uppercase italic tracking-tighter leading-none mb-1 text-obsidian">
              {predictor.username}
            </h3>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{predictor.displayName}</p>
          </div>
        </div>
        {predictor.isPremium && <span className="text-xl">💎</span>}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-workspace border border-obsidian/10 p-3">
          <span className="text-[9px] font-black text-text-muted uppercase tracking-widest block mb-1">ACCURACY</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black italic text-obsidian">{predictor.winRate}%</span>
            {predictor.winRate > 80 && <span className="text-[9px] font-black text-accent bg-obsidian px-1">ELITE</span>}
          </div>
        </div>
        <div className="bg-workspace border border-obsidian/10 p-3">
          <span className="text-[9px] font-black text-text-muted uppercase tracking-widest block mb-1">FOLLOWERS</span>
          <span className="text-xl font-black italic text-obsidian">{predictor.followers.toLocaleString()}</span>
        </div>
      </div>

      {/* Specialty Tags */}
      <div className="flex flex-wrap gap-1 mb-6">
        {predictor.specialties.map((specialty, index) => (
          <span key={index} className="text-[9px] font-black text-obsidian uppercase italic border border-obsidian/10 px-1.5 py-0.5 group-hover:border-obsidian transition-colors">
            {specialty}
          </span>
        ))}
      </div>

      {/* Follow Action */}
      <button className="w-full btn-volt py-2.5 flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform">
        <UserPlus className="w-4 h-4" />
        CHOOSE PREDICTOR
      </button>
    </div>
  )
}
