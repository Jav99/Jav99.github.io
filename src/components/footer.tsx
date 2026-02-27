export function Footer() {
  return (
    <footer className="border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <a
            href="/"
            className="font-serif text-2xl font-semibold tracking-tight text-slate-900"
          >
            Hannah White
          </a>
          <p className="text-sm text-slate-400 mt-3 max-w-md leading-relaxed">
            Elite Career Strategist &amp; Ex-Recruiter. Turning resumes into
            career-defining assets.
          </p>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 mt-10" aria-label="Footer navigation">
            {["Services", "About", "Resume Audit", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 min-h-[44px] flex items-center"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-6 mt-10">
            <a
              href="#"
              className="text-slate-400 hover:text-slate-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-slate-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-300 mt-12">
            &copy; {new Date().getFullYear()} Hannah White. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
