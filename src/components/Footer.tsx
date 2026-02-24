export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border py-8 px-4 md:px-6 mt-auto">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary"></div>
            <span className="font-black text-lg tracking-tighter uppercase text-white">
              Repeek
            </span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-text-muted">
            © {currentYear} Repeek. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex gap-6 text-xs uppercase tracking-widest text-text-muted">
            <a href="#" className="hover:text-white transition-colors">
              Legal
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
