import { useState, useEffect } from 'react'
import { User, ChevronRight, Check, AlertCircle, Loader2 } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [debouncedUsername, setDebouncedUsername] = useState('')
  const [isDebouncing, setIsDebouncing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setUsernameMutation = useMutation(api.users.setUsername)

  // Debounce username input by 600ms
  useEffect(() => {
    if (username.length < 4) {
      setDebouncedUsername('')
      setIsDebouncing(false)
      return
    }
    setIsDebouncing(true)
    const timer = setTimeout(() => {
      setDebouncedUsername(username)
      setIsDebouncing(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [username])

  // Live availability check — only fires when debouncedUsername is set
  const availabilityResult = useQuery(
    api.users.checkUsername,
    debouncedUsername.length >= 4 ? { username: debouncedUsername } : 'skip'
  )

  const isChecking = isDebouncing || (debouncedUsername.length >= 4 && availabilityResult === undefined)
  const isAvailable = !isChecking && debouncedUsername.length >= 4 ? (availabilityResult?.available ?? null) : null
  const reason = availabilityResult?.reason

  const handleUsernameChange = (val: string) => {
    const cleanVal = val.toLowerCase().replace(/[^a-z0-9_]/g, '')
    setUsername(cleanVal)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!isAvailable || isChecking) return
    setSubmitting(true)
    setError(null)
    try {
      await setUsernameMutation({ username })
      navigate('/')
    } catch (e: any) {
      setError(e.message ?? 'Failed to set username. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-workspace flex items-center justify-center p-4">
      <div className="absolute inset-0 dot-matrix opacity-10 pointer-events-none"></div>
      
      <div className="w-full max-w-lg relative">
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-obsidian/5 rounded-full blur-3xl"></div>
        
        <div className="bg-white border-2 border-obsidian shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-10">
              <div className="inline-block bg-accent text-obsidian px-3 py-1 text-[10px] font-black italic mb-4">
                IDENTITY_INITIALIZATION
              </div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-obsidian leading-none mb-4">
                SELECT YOUR <br />
                <span className="text-accent underline decoration-4 underline-offset-4">HANDLE</span>
              </h1>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest leading-relaxed max-w-xs">
                CHOOSE A UNIQUE OPERATOR NAME TO BE IDENTIFIED WITHIN THE ALPHA POOL.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black uppercase text-obsidian tracking-widest">
                    UNIQUE_USER_IDENTIFIER
                  </label>
                  {isChecking && <span className="text-[8px] font-black text-obsidian/40 animate-pulse italic">CHECKING_AVAILABILITY...</span>}
                  {isAvailable === true && !isChecking && (
                    <span className="flex items-center gap-1 text-[8px] font-black text-green-600 italic">
                      <Check className="w-2.5 h-2.5" /> ID_AVAILABLE
                    </span>
                  )}
                  {isAvailable === false && !isChecking && (
                    <span className="flex items-center gap-1 text-[8px] font-black text-red-600 italic">
                      <AlertCircle className="w-2.5 h-2.5" /> {reason ?? 'ID_RESERVED'}
                    </span>
                  )}
                </div>
                
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-obsidian/20 font-black text-xl italic select-none">@</span>
                  </div>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    placeholder="alpha_one"
                    maxLength={15}
                    className={`w-full bg-workspace border-2 px-10 py-5 text-xl font-black italic focus:outline-none transition-all ${
                      isAvailable === true ? 'border-green-600 bg-green-50/10' : 
                      isAvailable === false ? 'border-red-600 bg-red-50/10' : 
                      'border-obsidian focus:bg-white focus:border-accent shadow-inner'
                    }`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {isChecking
                      ? <Loader2 className="w-5 h-5 text-obsidian/30 animate-spin" />
                      : <User className={`w-5 h-5 transition-colors ${isAvailable === true ? 'text-green-600' : 'text-obsidian/10'}`} />
                    }
                  </div>
                </div>
                <p className="text-[9px] font-medium text-text-muted italic px-1">
                  * LENGTH: 4-15 CHARACTERS // A-Z, 0-9, UNDERSCORE ONLY
                </p>

                {error && (
                  <div className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase px-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {error}
                  </div>
                )}
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!isAvailable || isChecking || submitting}
                className={`w-full py-5 text-lg font-black italic tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
                  isAvailable && !isChecking && !submitting
                  ? 'btn-volt shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0' 
                  : 'bg-zinc-200 text-zinc-400 border-2 border-zinc-300 cursor-not-allowed uppercase'
                }`}
              >
                {submitting
                  ? <><Loader2 className="w-5 h-5 animate-spin" /> INITIALIZING...</>
                  : <>INITIALIZE_ACCOUNT <ChevronRight className={`w-6 h-6 ${isAvailable ? 'animate-bounce-x' : ''}`} /></>
                }
              </button>
            </div>
          </div>
        </div>
        
        {/* System Logs (Visual purely) */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-[8px] font-black text-obsidian/30 uppercase italic flex items-center gap-2">
            <div className="w-1 h-1 bg-accent rounded-full"></div>
            ENCRYPTION: AES-256
          </div>
          <div className="text-[8px] font-black text-obsidian/30 uppercase italic flex items-center gap-2 justify-end text-right">
            PROTO: REP_NODE
            <div className="w-1 h-1 bg-obsidian/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}


