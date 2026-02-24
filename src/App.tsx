import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Live from './pages/Live'
import Predictors from './pages/Predictors'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-workspace">
        {/* Subtle Grid Background */}
        <div className="fixed inset-0 grid-pattern opacity-40 pointer-events-none -z-10"></div>
        
        {/* Header */}
        <Header />
        
        <div className="flex flex-1 max-w-[1920px] mx-auto w-full relative">
          {/* Sidebar - Desktop Only */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live" element={<Live />} />
              <Route path="/predictors" element={<Predictors />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
