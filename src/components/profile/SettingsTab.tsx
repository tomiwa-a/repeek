import { useState } from 'react'
import { 
  User, 
  Mail, 
  Shield, 
  Trash2, 
  Globe, 
  Lock,
  ExternalLink,
  ChevronRight,
  X,
  AlertTriangle
} from 'lucide-react'

export default function SettingsTab({ email }: { email?: string }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')

  return (
    <div className="p-8 space-y-12">
      {/* Account Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-obsidian flex items-center justify-center -rotate-3">
            <User className="w-4 h-4 text-accent" />
          </div>
          <h3 className="text-xl font-black italic uppercase tracking-tighter">ACCOUNT_IDENTITY</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-workspace p-6 border-b-4 border-obsidian/10 space-y-2">
            <span className="text-[9px] font-black text-zinc-500 uppercase italic tracking-widest flex items-center gap-2">
              <Mail className="w-3 h-3" /> REGISTERED_EMAIL
            </span>
            <div className="text-sm font-black italic text-obsidian">{email || 'INITIALIZING...'}</div>
          </div>
          <div className="bg-workspace p-6 border-b-4 border-obsidian/10 space-y-2">
            <span className="text-[9px] font-black text-zinc-500 uppercase italic tracking-widest flex items-center gap-2">
              <Globe className="w-3 h-3" /> COUNTRY_ORIGIN
            </span>
            <div className="text-sm font-black italic text-obsidian">UNITED_KINGDOM</div>
          </div>
        </div>
      </section>

      {/* Security & Identity Linking */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-obsidian flex items-center justify-center rotate-3">
            <Shield className="w-4 h-4 text-accent" />
          </div>
          <h3 className="text-xl font-black italic uppercase tracking-tighter">SECURITY_&_IDENTITY</h3>
        </div>

        <div className="space-y-4">
          {/* Google Link */}
          <div className="bg-white border-2 border-obsidian p-5 flex items-center justify-between group hover:bg-workspace transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-workspace flex items-center justify-center border border-obsidian/5">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase italic text-obsidian">IDENTITY_PROVIDER</div>
                <div className="text-xs font-bold text-text-muted uppercase italic">GOOGLE_OAUTH_CONNECTED</div>
              </div>
            </div>
            <button className="text-[9px] font-black transition-colors text-obsidian/20 hover:text-red-600 uppercase italic flex items-center gap-1">
              DISCONNECT <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Password Change */}
          <div className="bg-white border-2 border-obsidian p-5 flex items-center justify-between group hover:bg-workspace transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-workspace flex items-center justify-center border border-obsidian/5">
                <Lock className="w-5 h-5 text-obsidian/40" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase italic text-obsidian">SECURITY_PASSCODE</div>
                <div className="text-xs font-bold text-text-muted uppercase italic">LAST_MODIFIED: 42_DAYS_AGO</div>
              </div>
            </div>
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className="bg-obsidian text-accent px-4 py-2 text-[9px] font-black italic uppercase hover:scale-105 transition-transform flex items-center gap-2"
            >
              CHANGE_PASSWORD <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50/30 border-2 border-red-900/10 p-8 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <Trash2 className="w-5 h-5 text-red-600" />
          <h3 className="text-xl font-black italic uppercase tracking-tighter text-red-900 underline decoration-red-600 decoration-2 underline-offset-4">DANGER_PROTOCOL</h3>
        </div>
        <p className="text-[10px] font-bold text-red-900/60 uppercase tracking-widest leading-relaxed max-w-xl">
          INITIATING THE TERMINATION SEQUENCE WILL PERMANENTLY ERASE ALL ELITE STANDINGS, HISTORY, AND PREMIUM SUBSCRIPTION DATA. THIS ACTION IS IRREVERSIBLE.
        </p>
        <button 
          onClick={() => setIsDeleteModalOpen(true)}
          className="bg-red-900 text-white px-6 py-4 text-[10px] font-black italic uppercase tracking-[0.2em] hover:bg-red-700 transition-colors shadow-[6px_6px_0px_0px_rgba(153,27,27,0.3)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0"
        >
          TERMINATE_ACCOUNT_v4.2
        </button>
      </section>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm" onClick={() => setIsPasswordModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white border-4 border-obsidian p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <button 
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-workspace transition-colors"
            >
              <X className="w-5 h-5 text-obsidian" />
            </button>
            
            <div className="mb-8">
              <div className="inline-block bg-accent text-obsidian px-2 py-0.5 text-[9px] font-black italic mb-2">AUTH_ROTATION</div>
              <h4 className="text-2xl font-black italic uppercase tracking-tighter text-obsidian">CHANGE_PASSCODE</h4>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-obsidian tracking-widest ml-1">CURRENT_PASSCODE</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-workspace border-2 border-obsidian px-4 py-3 text-sm font-bold focus:outline-none focus:border-accent transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-obsidian tracking-widest ml-1">NEW_PASSCODE</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-workspace border-2 border-obsidian px-4 py-3 text-sm font-bold focus:outline-none focus:border-accent transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-obsidian tracking-widest ml-1">CONFIRM_NEW_PASSCODE</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-workspace border-2 border-obsidian px-4 py-3 text-sm font-bold focus:outline-none focus:border-accent transition-all"
                />
              </div>

              <button className="w-full btn-volt py-4 text-xs font-black uppercase italic tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
                UPDATE_CREDENTIALS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terminate Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-red-950/90 backdrop-blur-md" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white border-4 border-red-900 p-8 md:p-10 shadow-[16px_16px_0px_0px_rgba(153,27,27,1)]">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5 text-red-900" />
            </button>
            
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-900 flex items-center justify-center -rotate-6">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="inline-block bg-red-100 text-red-900 px-2 py-0.5 text-[9px] font-black italic mb-1 uppercase">TERMINATION_PROTOCOL_DE01</div>
                <h4 className="text-3xl font-black italic uppercase tracking-tighter text-red-900 leading-none">ARE_YOU_SURE?</h4>
              </div>
            </div>

            <div className="bg-red-50 p-6 border-l-4 border-red-900 mb-8">
              <p className="text-[11px] font-bold text-red-900 uppercase italic leading-relaxed">
                THIS ACTION IS DESTRUCTIVE AND IRREVERSIBLE. YOU WILL LOSE ACCESS TO THE ALPHA NETWORK, ALL HISTORICAL NODES, AND ACTIVE PREMIUM STATUS.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                <label className="block mb-2 text-[10px] font-black uppercase text-red-900 tracking-widest leading-none">
                  TYPE <span className="text-red-600 underline">TERMINATE</span> TO CONFIRM
                </label>
                <input 
                  type="text" 
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="TYPE_HERE..."
                  className="w-full bg-white border-2 border-red-900/20 focus:border-red-900 px-4 py-4 text-sm font-black italic uppercase tracking-widest focus:outline-none transition-all placeholder:text-red-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="py-4 text-[10px] font-black uppercase italic tracking-widest border-2 border-obsidian hover:bg-workspace transition-all"
                >
                  ABORT_MISSION
                </button>
                <button 
                  disabled={deleteConfirmText !== 'TERMINATE'}
                  className={`py-4 text-[10px] font-black uppercase italic tracking-widest transition-all ${
                    deleteConfirmText === 'TERMINATE' 
                    ? 'bg-red-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-1px] translate-y-[-1px] hover:translate-x-0 hover:translate-y-0' 
                    : 'bg-zinc-100 text-zinc-300 border-2 border-zinc-200 cursor-not-allowed'
                  }`}
                >
                  CONFIRM_DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
