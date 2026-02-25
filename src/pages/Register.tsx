import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, ChevronRight, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuthActions } from "@convex-dev/auth/react"
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function Register() {
  const { isAuthenticated } = useConvexAuth()
  const viewer = useQuery(api.users.getViewer, isAuthenticated ? {} : 'skip')
  const { signIn } = useAuthActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isActuallyLoading = loading || (isAuthenticated && viewer === undefined)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn("password", { email, password, flow: "signUp" })
      // No manual navigate here - let AuthGuard handle it
    } catch {
      setError("Registration failed. This email may already be in use.")
      setLoading(false)
    }
  }

  async function handleGoogleSignUp() {
    setError(null)
    try {
      await signIn("google")
    } catch {
      setError("Google sign-up failed. Please try again.")
    }
  }

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
                NEW OPERATOR ENROLLMENT
              </div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-obsidian leading-none mb-2">
                SIGN UP
              </h1>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest">
                JOIN THE ELITE ANALYST NETWORK
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 flex items-center gap-3 bg-red-50 border-l-4 border-red-600 px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <p className="text-[10px] font-black uppercase text-red-700 tracking-widest">{error}</p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-obsidian tracking-widest ml-1">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/30" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="operator@repeek.com"
                    className="w-full bg-workspace border-2 border-obsidian px-10 py-3 text-sm font-bold focus:outline-none focus:bg-white focus:border-accent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-obsidian tracking-widest ml-1">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/30" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-workspace border-2 border-obsidian px-10 py-3 text-sm font-bold focus:outline-none focus:bg-white focus:border-accent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-obsidian/30 hover:text-obsidian transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input type="checkbox" required className="mt-1 accent-obsidian" id="terms" />
                <label htmlFor="terms" className="text-[10px] font-bold text-text-muted leading-tight uppercase">
                  I AGREE TO THE <Link to="/terms" className="text-obsidian underline">TERMS OF SERVICE</Link> AND <Link to="/privacy" className="text-obsidian underline">DATA PRIVACY PROTOCOL</Link>.
                </label>
              </div>

              <button 
                type="submit"
                disabled={isActuallyLoading}
                className="w-full btn-volt py-4 text-base tracking-widest flex items-center justify-center gap-2 group mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isActuallyLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> INITIALIZING_OPERATOR...</>
                ) : (
                  <>CREATE ACCOUNT <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-[1px] bg-obsidian/10 flex-1"></div>
              <span className="text-[10px] font-black text-obsidian/20 italic">OR USE GOOGLE</span>
              <div className="h-[1px] bg-obsidian/10 flex-1"></div>
            </div>

            {/* Social Auth */}
            <button 
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full bg-white border-2 border-obsidian p-3 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-workspace transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Quick Registration
            </button>

            {/* Footer Link */}
            <div className="mt-10 text-center">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                ALREADY ENROLLED? <Link to="/login" className="text-obsidian border-b border-obsidian ml-1 hover:text-accent hover:border-accent transition-colors">LOGIN HERE</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

