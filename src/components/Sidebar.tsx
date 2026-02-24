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
    <aside className="hidden lg:flex flex-col w-20 border-r border-border bg-surface sticky top-16 h-[calc(100vh-4rem)]">
      <nav className="flex flex-col items-center py-6 gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-2 p-3 rounded transition-colors group ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:text-white hover:bg-surface-hover'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
