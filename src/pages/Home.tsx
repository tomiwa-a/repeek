import { useMemo } from 'react'
import { mockPredictors } from '../data/mockPredictors'
import { mockGames } from '../data/mockGames'
import { generateMockSlips, flattenSlips } from '../data/mockSlips'
import PredictionCard from '../components/PredictionCard'
import LiveGames from '../components/LiveGames'
import TopPredictors from '../components/TopPredictors'

export default function Home() {
  const predictions = useMemo(
    () => flattenSlips(generateMockSlips(mockPredictors, mockGames)),
    []
  )

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      {/* Hero / CTA Section */}
      <section className="bg-obsidian text-white p-8 md:p-12 border-b-8 border-accent relative overflow-hidden group">
        <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-accent text-obsidian px-2 py-0.5 text-[10px] font-black italic">VERIFIED OPERATORS</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.9]">
            THE ELITE SPORTS <br />
            <span className="text-accent underline decoration-4 underline-offset-8">PREDICTION</span> HUB
          </h1>
          <p className="text-zinc-400 font-bold text-base mb-10 max-w-lg leading-tight italic uppercase">
            REAL-TIME DATA VERIFICATION. 0% NOISE. <br />
            JOIN THE TOP 1% OF PREDICTORS TODAY.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-volt text-base px-8 py-3">VIEW MARKETS</button>
            <button className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-obsidian transition-all px-8 py-3 font-black italic uppercase text-base">
              LEARN MORE
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 -mr-20 -mb-20 blur-3xl rounded-full"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-obsidian">
              <h2 className="text-xl font-black italic uppercase tracking-tighter text-obsidian">LATEST PREDICTIONS</h2>
              <div className="flex gap-2">
                <button className="stat-badge bg-obsidian text-white">ALL PICKS</button>
                <button className="stat-badge hover:bg-workspace">PREMIUM</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predictions.slice(0, 6).map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <aside className="lg:col-span-4 space-y-8">
          <LiveGames />
          <TopPredictors />
          
          <div className="bg-workspace border-2 border-obsidian p-6">
            <h3 className="text-[11px] font-black tracking-widest uppercase italic mb-4 text-obsidian">PLATFORM STATUS</h3>
            <p className="text-[10px] font-bold text-text-muted italic leading-tight mb-6">
              REPEEK v4.2.0 <br />
              UPTIME: 99.99%
            </p>
            <div className="w-full h-1 bg-obsidian/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent animate-[pulse_2s_infinite]"></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
