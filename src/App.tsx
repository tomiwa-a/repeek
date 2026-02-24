import { useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Live from './pages/Live'
import Predictors from './pages/Predictors'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import { UIProvider, useUI } from './context/UIContext'
import SlipBuilder from './components/SlipBuilder'
import { mockPredictors } from './data/mockPredictors'
import { mockGames } from './data/mockGames'
import { generateMockSlips } from './data/mockSlips'
import Notifications from './pages/Notifications'

function AppContent() {
  const { isSlipBuilderOpen, closeSlipBuilder } = useUI()
  
  // Initialize mock slips once
  const slips = useMemo(() => generateMockSlips(mockPredictors, mockGames), [])
  
  return (
    <div className="min-h-screen flex flex-col bg-workspace text-obsidian selection:bg-accent selection:text-obsidian">
      {/* Technical Dot Matrix Background */}
      <div className="fixed inset-0 dot-matrix opacity-20 pointer-events-none -z-10"></div>
      
      {/* Header */}
      <Header />
      
      <div className="flex flex-1 max-w-[1920px] mx-auto w-full relative border-x border-obsidian/5">
        {/* Sidebar - Desktop Only */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 min-w-0 bg-white shadow-sm border-l border-obsidian/10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<Live />} />
            <Route path="/predictors" element={<Predictors />} />
            <Route path="/profile" element={<Profile slips={slips} />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
      </div>
      
      <Footer />
      
      <SlipBuilder isOpen={isSlipBuilderOpen} onClose={closeSlipBuilder} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <AppContent />
      </UIProvider>
    </BrowserRouter>
  )
}

export default App
