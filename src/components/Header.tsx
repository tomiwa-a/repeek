import { Link } from 'react-router-dom'
import { Search, Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary"></div>
            <span className="font-black text-2xl tracking-tighter uppercase text-white">
              Repeek
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/live"
              className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              Live
            </Link>
            <Link
              to="/predictors"
              className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              Predictors
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="hidden md:flex items-center gap-2 bg-surface border border-border px-4 py-2 hover:border-primary transition-colors">
              <Search className="w-4 h-4 text-text-muted" />
              <span className="text-sm text-text-muted">Search...</span>
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-surface rounded transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            {/* User Menu */}
            <button className="flex items-center gap-2 bg-surface border border-border px-4 py-2 hover:border-primary transition-colors">
              <User className="w-4 h-4" />
              <span className="hidden md:inline text-sm font-bold">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
