import TopPredictors from '../components/TopPredictors'
import PredictionsFeed from '../components/PredictionsFeed'
import LiveGames from '../components/LiveGames'

export default function Home() {
  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Top Predictors */}
        <aside className="lg:col-span-3">
          <TopPredictors />
        </aside>

        {/* Center - Predictions Feed */}
        <main className="lg:col-span-6">
          <PredictionsFeed />
        </main>

        {/* Right Sidebar - Live & Upcoming Games */}
        <aside className="lg:col-span-3">
          <LiveGames />
        </aside>
      </div>
    </div>
  )
}
