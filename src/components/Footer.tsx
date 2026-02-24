export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-border py-12 px-4 md:px-6 mt-auto">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-primary rounded-sm shadow-sm ring-1 ring-primary/20"></div>
              <span className="font-bold text-lg tracking-tight text-secondary">
                Repeek
              </span>
            </div>
            <div className="text-[13px] font-medium text-text-muted">
              © {currentYear} Repeek. Built for the modern predictor.
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-[13px] font-semibold text-text-muted">
            <a href="#" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Predictors
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Legal
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
