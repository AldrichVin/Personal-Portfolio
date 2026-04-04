import { ArrowUpRight, Mail, ArrowUp, Github, Linkedin, MapPin } from 'lucide-react'

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'aldrichvin040205@gmail.com',
    href: 'mailto:aldrichvin040205@gmail.com',
    external: false,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/AldrichVin',
    href: 'https://github.com/AldrichVin',
    external: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/aldrich-vincent',
    href: 'https://linkedin.com/in/aldrich-vincent-4463b2355',
    external: true,
  },
]

const Contact = () => {
  const handleBackToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="contact" className="section">
      {/* Section gradient divider */}
      <div className="section-divider mb-10" />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Section Label */}
          <div className="lg:col-span-2">
            <span className="text-label reveal">Contact</span>
          </div>

          {/* Content — two-zone layout */}
          <div className="lg:col-span-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left zone — headline + message */}
              <div className="reveal delay-1">
                <h2 className="text-h1 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  Let's connect.
                </h2>

                {/* Availability */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-sm font-medium text-emerald-700">
                    Available for opportunities
                  </span>
                </div>

                <p className="text-base text-neutral-500 leading-relaxed max-w-sm">
                  Open to data analyst roles, analytics projects, and opportunities
                  to drive business impact through data.
                </p>
              </div>

              {/* Right zone — contact methods */}
              <div className="reveal delay-2">
                <div className="space-y-0">
                  {CONTACT_METHODS.map(({ icon: Icon, label, value, href, external }) => (
                    <a
                      key={label}
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="contact-row group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-200/60 transition-colors">
                        <Icon size={18} strokeWidth={1.5} className="text-neutral-500" />
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-neutral-900">
                          {label}
                        </span>
                        <span className="block text-sm text-neutral-500 truncate">
                          {value}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="text-neutral-400 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  ))}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mt-6 pt-4">
                  <MapPin size={14} strokeWidth={1.5} className="text-neutral-400" />
                  <span className="text-sm text-neutral-400">
                    Based in Melbourne, Australia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-14 pt-10 border-t border-neutral-200 reveal delay-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            {/* Left — name */}
            <span className="text-[15px] font-semibold text-neutral-900 tracking-tight">
              Aldrich Liem
            </span>

            {/* Center — social links */}
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <a
                href="https://github.com/AldrichVin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 transition-colors"
              >
                GitHub
              </a>
              <span className="text-neutral-300">&middot;</span>
              <a
                href="https://linkedin.com/in/aldrich-vincent-4463b2355"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 transition-colors"
              >
                LinkedIn
              </a>
            </div>

            {/* Right — copyright + back to top */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-400">
                &copy; {new Date().getFullYear()}
              </span>
              <a
                href="#"
                onClick={handleBackToTop}
                className="back-to-top"
              >
                <span>Top</span>
                <ArrowUp size={13} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Built with line */}
          <p className="text-center text-xs text-neutral-300 mt-8">
            Designed & built with React + Tailwind
          </p>
        </footer>
      </div>
    </section>
  )
}

export default Contact
