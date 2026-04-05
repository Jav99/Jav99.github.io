const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Free Resume Audit", href: "#audit" },
  { label: "Contact", href: "mailto:hello@hannahwhitecareers.com" },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          <a
            href="/"
            className="font-serif text-2xl font-semibold tracking-tight text-slate-900"
          >
            Hannah White
          </a>

          <nav
            className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-12"
            aria-label="Footer navigation"
          >
            {footerLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 min-h-[44px] flex items-center"
              >
                {label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-slate-400 mt-16 tracking-wide">
            &copy; {new Date().getFullYear()} Hannah White. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
