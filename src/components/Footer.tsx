export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-obsidian text-white border-t-4 border-accent py-16 px-4 md:px-6 mt-10">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Mark */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-accent"></div>
              <span className="font-black text-4xl tracking-tighter uppercase italic">
                REPEEK
              </span>
            </div>
            <p className="text-zinc-500 font-bold text-sm leading-tight max-w-sm mb-8">
              ELITE SPORTS ANALYSIS PLATFORM. <br />
              REAL-TIME MARKET VERIFICATION. <br />
              PROFESSIONAL INSIGHTS ONLY.
            </p>
            <div className="flex gap-4">
              <div className="p-2 border border-accent/20 hover:border-accent transition-colors cursor-pointer text-accent">
                <span className="text-[10px] font-black italic">X / TWITTER</span>
              </div>
              <div className="p-2 border border-accent/20 hover:border-accent transition-colors cursor-pointer">
                <span className="text-[10px] font-black italic">DISCORD</span>
              </div>
            </div>
          </div>

          {/* Technical Stats */}
          <div>
            <h3 className="text-[11px] font-black text-accent mb-6 tracking-widest uppercase">MARKET STATS</h3>
            <ul className="space-y-4 text-[10px] font-mono text-zinc-400">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>ACTIVE MARKETS:</span>
                <span className="text-white">1,248</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>TOTAL PICKS:</span>
                <span className="text-white">842.1K</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>UPTIME:</span>
                <span className="text-accent underline">99.9%</span>
              </li>
            </ul>
          </div>

          {/* Navigation discovery */}
          <div>
            <h3 className="text-[11px] font-black text-accent mb-6 tracking-widest uppercase">QUICK LINKS</h3>
            <ul className="space-y-4 text-[11px] font-black italic uppercase">
              <li className="hover:text-accent cursor-pointer transition-colors">ALL MARKETS</li>
              <li className="hover:text-accent cursor-pointer transition-colors">LIVESCORE</li>
              <li className="hover:text-accent cursor-pointer transition-colors">PREDICTORS</li>
              <li className="hover:text-accent cursor-pointer transition-colors">SUPPORT</li>
            </ul>
          </div>
        </div>

        {/* Legal & Anchor */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-black text-zinc-600 tracking-tighter uppercase italic">
            © {currentYear} REPEEK // PROFESSIONAL SPORTS ANALYSIS
          </div>
          <div className="flex gap-6 text-[10px] font-black text-zinc-600 uppercase italic">
            <span className="hover:text-white cursor-pointer transition-colors">TERMS</span>
            <span className="hover:text-white cursor-pointer transition-colors">PRIVACY</span>
            <span className="hover:text-white cursor-pointer transition-colors">COMPLIANCE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
