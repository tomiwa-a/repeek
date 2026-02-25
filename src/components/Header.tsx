import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Bell, User, Menu, X, LogOut } from 'lucide-react'
import { useUI } from '../context/UIContext'
import { useConvexAuth, useQuery } from 'convex/react'
import { useAuthActions } from '@convex-dev/auth/react'
import { api } from '../../convex/_generated/api'

export default function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useUI()
  const { isAuthenticated, isLoading } = useConvexAuth()
  const viewer = useQuery(api.users.getViewer, isAuthenticated ? {} : 'skip')
  const { signOut } = useAuthActions()
  const navigate = useNavigate()

  const isAuthLoading = isLoading || (isAuthenticated && viewer === undefined)

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/live', label: 'LIVE' },
    { to: '/predictors', label: 'PREDICTORS' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-obsidian">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-5 h-5 bg-obsidian group-hover:bg-accent transition-colors"></div>
              <span className="font-black text-xl tracking-tighter uppercase italic text-obsidian">
                REPEEK
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `text-[11px] font-black tracking-widest transition-all hover:text-accent group flex flex-col items-center ${
                      isActive ? 'text-obsidian' : 'text-text-muted'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      <div className={`h-0.5 w-full bg-obsidian mt-0.5 transition-all ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}></div>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center relative">
              <Search className="w-3.5 h-3.5 text-obsidian absolute left-3" />
              <input 
                type="text" 
                placeholder="SEARCH MARKETS..." 
                className="bg-workspace border border-obsidian/20 px-9 py-1 text-[10px] font-mono w-64 focus:outline-none focus:border-obsidian focus:bg-white transition-all"
              />
            </div>

            <button className="p-2 hover:bg-workspace border border-transparent hover:border-obsidian transition-all relative text-obsidian">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent border border-obsidian"></span>
            </button>

            {isAuthLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-16 h-8 bg-obsidian/5 border border-obsidian/10 animate-pulse"></div>
                <div className="hidden sm:block w-20 h-8 bg-obsidian/5 border border-obsidian/10 animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <>
                <Link to="/profile" className="hidden sm:flex items-center gap-2 btn-elite px-4 py-1.5 uppercase">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-[10px] leading-none">PROFILE</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hidden sm:flex items-center gap-2 btn-volt px-4 py-1.5 uppercase"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="text-[10px] leading-none">LOGOUT</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden sm:flex items-center gap-2 btn-elite px-4 py-1.5 uppercase">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-[10px] leading-none">LOGIN</span>
                </Link>
                <Link to="/register" className="hidden sm:flex items-center gap-2 btn-volt px-4 py-1.5 uppercase">
                  <span className="text-[10px] leading-none">SIGN UP</span>
                </Link>
              </>
            )}
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-obsidian hover:bg-workspace border border-transparent hover:border-obsidian"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isSidebarOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => 
                  `px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'bg-primary/5 text-primary' : 'text-text-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
