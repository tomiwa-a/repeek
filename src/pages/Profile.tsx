import { mockPredictors } from '../data/mockPredictors'
import { TrendingUp, TrendingDown, Target, Award, Calendar, Share2, UserPlus, Shield } from 'lucide-react'

export default function Profile() {
  // Show the first predictor's profile as example
  const user = mockPredictors[0]

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Profile Header */}
      <section className="bg-obsidian text-white p-8 md:p-12 border-b-8 border-accent relative overflow-hidden group">
        <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          {/* Avatar Area */}
          <div className="w-32 h-32 bg-white border-4 border-accent flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <span className="font-black text-obsidian text-5xl italic">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Info Area */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">{user.username}</h1>
              {user.isPremium && <span className="bg-accent text-obsidian px-3 py-1 text-xs font-black italic">PREMIUM</span>}
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
              {user.specialties.map((specialty, index) => (
                <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-black uppercase italic text-zinc-400">
                  {specialty}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-10">
              <div className="flex flex-col">
                <span className="text-accent text-2xl font-black italic">
                  {user.followers.toLocaleString()}
                </span>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">FOLLOWERS</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-10">
                <span className="text-white text-2xl font-black italic">{user.totalPredictions}</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">TOTAL PICKS</span>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="btn-volt px-12 py-4 text-base tracking-widest flex items-center justify-center gap-3">
              <UserPlus className="w-5 h-5" />
              CONNECT
            </button>
            <div className="flex gap-3">
              <button className="flex-1 bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-colors flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </button>
              <button className="flex-1 bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-colors flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Win Rate */}
        <div className="bg-white border-2 border-obsidian p-8 shadow-sm group hover:border-accent transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">SUCCESS RATE</h3>
            <Target className="w-5 h-5 text-obsidian/20 group-hover:text-accent font-black" />
          </div>
          <div className="text-4xl font-black italic text-obsidian mb-2">{user.winRate.toFixed(1)}%</div>
          <div className="flex justify-between items-center text-[10px] font-black uppercase italic border-t border-obsidian/5 pt-4">
            <div className="flex flex-col">
              <span className="text-text-muted">WINS</span>
              <span className="text-black text-sm">{user.wins}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-text-muted">LOSSES</span>
              <span className="text-zinc-400 text-sm">{user.losses}</span>
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-white border-2 border-obsidian p-8 shadow-sm group">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">CURRENT TREND</h3>
            {user.streakType === 'win' ? (
              <TrendingUp className="w-5 h-5 text-accent" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className={`text-4xl font-black italic mb-2 ${
            user.streakType === 'win' ? 'text-obsidian' : 'text-red-900'
          }`}>
            {user.streak} <span className="text-xl">{user.streakType.toUpperCase()}</span>
          </div>
          <div className="text-[10px] font-black text-text-muted uppercase italic border-t border-obsidian/5 pt-4">
            {user.streakType === 'win' ? '🔥 CURRENTLY ON FIRE' : 'STANDARD VARIANCE MAINTAINED'}
          </div>
        </div>

        {/* Global Rank */}
        <div className="bg-white border-2 border-obsidian p-8 shadow-sm group">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">GLOBAL RANK</h3>
            <Award className="w-5 h-5 text-obsidian/20 group-hover:text-accent transition-colors" />
          </div>
          <div className="text-4xl font-black italic text-obsidian mb-2">TOP 1.5%</div>
          <div className="text-[10px] font-black text-text-muted uppercase italic border-t border-obsidian/5 pt-4">
            GLOBAL LEADERBOARD
          </div>
        </div>

        {/* History */}
        <div className="bg-white border-2 border-obsidian p-8 shadow-sm group">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">SERVICE_TIME</h3>
            <Calendar className="w-5 h-5 text-obsidian/20 group-hover:text-accent transition-colors" />
          </div>
          <div className="text-4xl font-black italic text-obsidian mb-2">2.1Y</div>
          <div className="text-[10px] font-black text-text-muted uppercase italic border-t border-obsidian/5 pt-4">
            FIRST_LOGIN: JAN_2024
          </div>
        </div>
      </div>

      {/* Activity Feed Placeholder */}
      <div className="bg-workspace border-2 border-obsidian p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
        <Award className="w-16 h-16 text-obsidian/5 mx-auto mb-6" />
        <h2 className="text-xl font-black italic uppercase tracking-tighter text-obsidian mb-2">ACTIVITY LOGS</h2>
        <p className="text-[10px] font-black text-text-muted uppercase italic tracking-widest">
          DATA CURRENTLY BEING PROCESSED
        </p>
      </div>
    </div>
  )
}
