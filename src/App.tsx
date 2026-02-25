import { useMemo } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
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
import Onboarding from './pages/Onboarding'
import { UIProvider, useUI } from './context/UIContext'
import SlipBuilder from './components/SlipBuilder'
import SlipDetail from './components/SlipDetail'
import ScrollToTop from './components/ScrollToTop'
import FloatingSlipButton from './components/FloatingSlipButton'
import { mockPredictors } from './data/mockPredictors'
import { mockGames } from './data/mockGames'
import { generateMockSlips } from './data/mockSlips'
import Notifications from './pages/Notifications'
import MatchDetail from './pages/MatchDetail'

// Redirects unauthenticated users away from protected routes,
// and authenticated-but-not-onboarded users to /onboarding
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const location = useLocation()

  const viewer = useQuery(
    api.users.getViewer,
    isAuthenticated ? {} : 'skip'
  )

  const authOnlyPaths = ['/login', '/register', '/forgot-password', '/onboarding']
  const protectedPaths = ['/profile', '/notifications']
  const isAuthOnlyPath = authOnlyPaths.includes(location.pathname)
  const isProtectedRoute = protectedPaths.includes(location.pathname)

  // While auth or viewer is loading, just show the page (no blank flash)
  if (isLoading || (isAuthenticated && viewer === undefined)) {
    return <>{children}</>
  }

  // Unauthenticated → redirect away from protected routes
  if (!isAuthenticated && isProtectedRoute) {
    return <Navigate to="/login" replace />
  }

  // Authenticated but no username → force onboarding
  if (isAuthenticated && !viewer?.username && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  // Authenticated and onboarded → redirect away from auth/onboarding pages
  if (isAuthenticated && viewer?.username && isAuthOnlyPath) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function AppContent() {
  const { isSlipBuilderOpen, closeSlipBuilder, isSlipDetailOpen, closeSlipDetail, selectedSlip } = useUI()
  
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
          <AuthGuard>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live" element={<Live />} />
              <Route path="/predictors" element={<Predictors />} />
              <Route path="/profile" element={<Profile slips={slips} />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/match/:id" element={<MatchDetail />} />
            </Routes>
          </AuthGuard>
        </main>
      </div>
      
      <Footer />
      
      <SlipBuilder isOpen={isSlipBuilderOpen} onClose={closeSlipBuilder} />
      <SlipDetail isOpen={isSlipDetailOpen} onClose={closeSlipDetail} slip={selectedSlip} />
      <FloatingSlipButton />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <UIProvider>
        <AppContent />
      </UIProvider>
    </BrowserRouter>
  )
}

export default App

