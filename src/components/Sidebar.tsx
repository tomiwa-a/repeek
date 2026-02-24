import { NavLink } from 'react-router-dom'
import { Home, Radio, User, Users, Plus, Bell } from 'lucide-react'
import { useUI } from '../context/UIContext'

export default function Sidebar() {
  const { openSlipBuilder } = useUI()
  const menuItems = [
    { icon: Home, label: 'HOME', to: '/' },
    { icon: Radio, label: 'LIVESCORE', to: '/live' },
    { icon: Users, label: 'LEADERBOARD', to: '/predictors' },
    { icon: Bell, label: 'NOTIFICATIONS', to: '/notifications', badge: 2 },
    { icon: User, label: 'PROFILE', to: '/profile' },
  ]

  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-obsidian/10 bg-white sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="p-4 space-y-8 flex-1">
        <div>
          <h3 className="text-[10px] font-black text-obsidian/40 mb-4 px-2 tracking-[0.2em]">MENU</h3>
          <nav className="space-y-1">
            {menuItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  isActive ? 'nav-link-active' : 'nav-link'
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-accent text-obsidian text-[8px] font-black px-1.5 py-0.5 rounded-none leading-none animate-pulse">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <button 
          onClick={openSlipBuilder}
          className="w-full btn-volt py-3 text-xs tracking-widest flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> PREDICT
        </button>

        <div className="pt-4 border-t border-obsidian/5">
          <div className="bg-obsidian text-white p-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-8 h-8 bg-accent -mr-4 -mt-4 rotate-45 group-hover:bg-white transition-colors"></div>
            <h4 className="text-[11px] font-black italic mb-2 tracking-tighter">PRO ACCESS</h4>
            <p className="text-[10px] text-zinc-400 font-bold mb-4 leading-tight">UNLOCK REAL-TIME DATA & PREMIUM PICKS</p>
            <button className="w-full btn-volt py-1.5 text-[10px] tracking-widest">
              UPGRADE - $19
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-obsidian/5 bg-workspace/50">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-text-muted">STATUS:</span>
          <span className="text-accent bg-obsidian px-1 px-1 font-black uppercase">Active</span>
        </div>
      </div>
    </aside>
  )
}
