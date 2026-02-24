import { useState, useMemo } from 'react'
import { 
  Bell, Search, ChevronLeft, ChevronRight, 
  CheckCircle2, AlertCircle, Info, ExternalLink 
} from 'lucide-react'
import { mockNotifications } from '../data/mockNotifications'
import type { Notification } from '../data/mockNotifications'

export default function Notifications() {
  const [filter, setFilter] = useState<'all' | 'system' | 'activity' | 'result'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  const filteredNotifications = useMemo(() => {
    return mockNotifications.filter(n => {
      const matchesFilter = filter === 'all' || n.type === filter
      const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           n.message.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [filter, searchTerm])

  const paginatedNotifications = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return filteredNotifications.slice(start, start + itemsPerPage)
  }, [filteredNotifications, page])

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'result': return <CheckCircle2 className="w-4 h-4 text-accent" />
      case 'activity': return <Info className="w-4 h-4 text-blue-500" />
      case 'system': return <AlertCircle className="w-4 h-4 text-obsidian/40" />
    }
  }

  return (
    <div className="flex flex-col h-full bg-workspace">
      {/* Header Section */}
      <div className="bg-obsidian text-white p-8">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-6 h-6 text-accent" />
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">SYSTEM_NOTIFICATIONS</h1>
        </div>
        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">MONITOR_REALTIME_ALERTS_PROTOCOL</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b-4 border-obsidian p-4 sticky top-0 z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative group w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/20 group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="FILTER_MESSAGES..." 
              className="w-full bg-workspace border-2 border-obsidian px-10 py-2.5 text-[11px] font-black uppercase italic outline-none focus:border-accent transition-all" 
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'result', 'activity', 'system'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 text-[10px] font-black uppercase italic border-2 transition-all ${
                  filter === type 
                    ? 'bg-obsidian border-obsidian text-accent' 
                    : 'bg-white border-obsidian/10 text-obsidian/40 hover:border-obsidian hover:text-obsidian'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2 no-scrollbar">
        {paginatedNotifications.length > 0 ? (
          paginatedNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`bg-white border-2 border-obsidian p-4 flex items-start gap-4 transition-all hover:translate-x-1 ${
                !notif.isRead ? 'border-l-8 border-l-accent shadow-sm' : 'opacity-70'
              }`}
            >
              <div className="mt-1">{getTypeIcon(notif.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[11px] font-black uppercase italic text-obsidian leading-none">{notif.title}</h3>
                  <span className="text-[9px] font-bold text-zinc-400 font-mono">
                    {notif.timestamp.toLocaleDateString()} // {notif.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase italic leading-relaxed max-w-2xl">{notif.message}</p>
              </div>
              {notif.link && (
                <button className="p-2 hover:bg-workspace transition-colors">
                  <ExternalLink className="w-4 h-4 text-obsidian/20" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
            <Bell className="w-16 h-16 mb-4" />
            <p className="text-xl font-black italic uppercase tracking-widest">ZERO_ALERTS_DETECTED</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="bg-obsidian p-6 mt-auto">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-black text-accent uppercase italic tracking-widest">
            LIST_TOTAL: {filteredNotifications.length} NODES
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-obsidian text-white/40 hover:text-accent disabled:opacity-0 transition-colors flex items-center gap-2 text-[10px] font-black italic uppercase"
            >
              <ChevronLeft className="w-4 h-4" /> PREV
            </button>
            <div className="bg-white/10 px-6 py-2 border-x border-white/5">
              <span className="text-white text-[11px] font-black italic uppercase">PAGE {page} // {totalPages || 1}</span>
            </div>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="px-4 py-2 bg-obsidian text-white/40 hover:text-accent disabled:opacity-0 transition-colors flex items-center gap-2 text-[10px] font-black italic uppercase"
            >
              NEXT <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
