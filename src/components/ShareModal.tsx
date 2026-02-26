import { useState } from 'react'
import { X, Copy, Check, Send, MessageCircle } from 'lucide-react'
import { useUI } from '../context/UIContext'

export default function ShareModal() {
  const { isShareModalOpen, closeShareModal, shareData } = useUI()
  const [copied, setCopied] = useState(false)

  if (!isShareModalOpen || !shareData) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const shareLinks = [
    {
      name: 'X',
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
          <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      ),
      url: `https://x.com/intent/tweet?text=${encodeURIComponent(shareData.text || shareData.title)}&url=${encodeURIComponent(shareData.url)}`,
      color: 'hover:text-black'
    },
    {
      name: 'TELEGRAM',
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text || shareData.title)}`,
      color: 'hover:text-[#0088cc]'
    },
    {
      name: 'WHATSAPP',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent((shareData.text || shareData.title) + ' ' + shareData.url)}`,
      color: 'hover:text-[#25D366]'
    }
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-obsidian/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={closeShareModal}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-white border-4 border-obsidian shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 dot-matrix opacity-5 pointer-events-none"></div>
        
        {/* Header */}
        <div className="bg-obsidian text-white p-4 flex items-center justify-between relative z-10">
          <h2 className="text-xs font-black italic uppercase tracking-[0.2em] text-accent">SHARE_DEPLOYMENT</h2>
          <button 
            onClick={closeShareModal}
            className="p-1 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 relative z-10">
          {/* Content Preview */}
          <div>
            <div className="text-[10px] font-black text-obsidian/20 uppercase tracking-widest mb-1.5 italic">ENTITY_TITLE</div>
            <div className="text-base font-black italic uppercase text-obsidian leading-none tracking-tighter">
              {shareData.title}
            </div>
          </div>

          {/* Copy Link Section */}
          <div className="space-y-2 text-obsidian">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic">DIRECT_LINK_ACCESS</div>
            <div className="flex gap-2">
              <div className="flex-1 bg-workspace border border-obsidian/10 px-4 py-3 text-[10px] font-mono truncate text-obsidian/60">
                {shareData.url}
              </div>
              <button 
                onClick={handleCopy}
                className={`px-4 py-3 border-2 border-obsidian transition-all ${
                  copied ? 'bg-accent text-obsidian' : 'bg-white hover:bg-workspace'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Social Grid */}
          <div className="space-y-2 text-obsidian">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic">DISTRIBUTION_CHANNELS</div>
            <div className="grid grid-cols-3 gap-3">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-2 p-4 bg-workspace border border-obsidian/5 hover:border-obsidian transition-all group ${link.color}`}
                >
                  <link.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="text-[7px] font-black tracking-widest uppercase italic">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-2 bg-accent"></div>
      </div>
    </div>
  )
}
