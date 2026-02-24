import { Link, NavLink } from 'react-router-dom'
import { Search, Bell, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/live', label: 'Live' },
    { to: '/predictors', label: 'Predictors' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-sm shadow-sm ring-1 ring-primary/20"></div>
              <span className="font-bold text-lg tracking-tight text-secondary">
                Repeek
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `px-3 py-1.5 text-[13px] font-medium transition-colors hover:text-primary ${
                      isActive ? 'text-primary' : 'text-text-muted'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center relative group">
              <Search className="w-4 h-4 text-text-muted absolute left-3" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-workspace border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs w-48 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            <button className="p-2 hover:bg-surface-hover rounded-md transition-colors relative text-text-muted">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-white"></span>
            </button>

            <button className="flex items-center gap-2 bg-white border border-border px-3 py-1.5 rounded-md hover:bg-workspace transition-colors shadow-sm">
              <User className="w-4 h-4 text-text-muted" />
              <span className="hidden sm:inline text-xs font-semibold">Profile</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-text-muted hover:bg-surface-hover rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
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
