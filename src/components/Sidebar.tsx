import { NavLink } from 'react-router-dom'
import { Home, Radio, Trophy, User } from 'lucide-react'

export default function Sidebar() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/live', icon: Radio, label: 'Live' },
    { to: '/predictors', icon: Trophy, label: 'Predictors' },
    { to: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <aside className="hidden lg:flex flex-col w-56 border-r border-border bg-white sticky top-14 h-[calc(100vh-3.5rem)] py-6 px-3">
      <nav className="flex flex-col gap-1">
        <label className="px-3 mb-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
          Main Menu
        </label>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'nav-link-active' : 'nav-link'
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3">
        <div className="bg-workspace rounded-lg p-3 border border-border">
          <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Upgrade</p>
          <p className="text-xs text-secondary font-medium leading-tight mb-3">Get unlimited access to premium peeks.</p>
          <button className="w-full btn-primary text-xs py-1.5">Go Pro</button>
        </div>
      </div>
    </aside>
  )
}
