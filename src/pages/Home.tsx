import TopPredictors from '../components/TopPredictors'
import PredictionsFeed from '../components/PredictionsFeed'
import LiveGames from '../components/LiveGames'

export default function Home() {
  return (
    <div className="px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar - Top Predictors */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 order-2 lg:order-1">
          <TopPredictors />
        </aside>

        {/* Center - Predictions Feed */}
        <main className="lg:col-span-6 order-1 lg:order-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-secondary">Latest Peeks</h1>
              <div className="flex gap-2">
                <button className="text-xs font-semibold px-3 py-1.5 bg-white border border-border rounded-full hover:bg-workspace transition-colors">🔥 Trending</button>
                <button className="text-xs font-semibold px-3 py-1.5 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors">✨ Newest</button>
              </div>
            </div>
            <PredictionsFeed />
          </div>
        </main>

        {/* Right Sidebar - Live Games */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 order-3">
          <LiveGames />
        </aside>
      </div>
    </div>
  )
}
