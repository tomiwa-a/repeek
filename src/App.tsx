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
      <div className="min-h-screen flex flex-col">
        {/* Grid Background */}
        <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none -z-10"></div>
        
        {/* Header */}
        <Header />
        
        {/* Main Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live" element={<Live />} />
              <Route path="/predictors" element={<Predictors />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
