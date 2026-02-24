import { Link } from 'react-router-dom'
import { Mail, ChevronRight, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Auth Container */}
        <div className="bg-white border-2 border-obsidian shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden p-8 md:p-10">
          <div className="absolute inset-0 dot-matrix opacity-5 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="inline-block bg-obsidian text-accent px-3 py-1 text-[10px] font-black italic mb-4">
                ACCESS RECOVERY PROTOCOL
              </div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-obsidian leading-none mb-2">
                RECOVER
              </h1>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest">
                RESET YOUR SECURITY PASSCODE
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-obsidian tracking-widest ml-1">
                  REGISTERED EMAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/30" />
                  <input 
                    type="email" 
                    placeholder="operator@repeek.com"
                    className="w-full bg-workspace border-2 border-obsidian px-10 py-3 text-sm font-bold focus:outline-none focus:bg-white focus:border-accent transition-all"
                  />
                </div>
              </div>

              <button className="w-full btn-volt py-4 text-base tracking-widest flex items-center justify-center gap-2 group">
                SEND RESET LINK <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-10 text-center border-t border-obsidian/5 pt-6">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-[10px] font-black text-obsidian uppercase tracking-widest hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> BACK TO LOGIN
              </Link>
            </div>
          </div>
        </div>

        {/* Support Notice */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold text-obsidian/40 uppercase italic tracking-widest">
            HAVING TROUBLE? <Link to="/support" className="text-obsidian underline decoration-accent underline-offset-4">CONTACT SYSTEM ADMIN</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
