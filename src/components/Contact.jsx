import { ArrowUpRight, Mail, ArrowUp, Github, Linkedin, MapPin } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

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
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 1.2,
      ease: 'power2.inOut',
    })
  }

  return (
    <section
      id="contact"
      style={{
        height: '100dvh',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#fff',
        paddingLeft: 'var(--space-xl)',
        paddingRight: 'var(--space-xl)',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
        {/* Label */}
        <div className="reveal" style={{ marginBottom: '2rem' }}>
          <span className="text-label">Contact</span>
        </div>

        {/* Headline */}
        <h2 className="text-h1 reveal delay-1" style={{ marginBottom: '1rem' }}>
          Let's <span className="text-serif-accent">connect</span>.
        </h2>

        {/* Availability */}
        <div
          className="flex items-center justify-center gap-2 reveal delay-1"
          style={{ marginBottom: '1.5rem' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-emerald-700">
            Available for opportunities
          </span>
        </div>

        {/* Description */}
        <p
          className="text-base text-neutral-500 leading-relaxed reveal delay-2"
          style={{ marginBottom: '2.5rem', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          Open to data analyst roles, analytics projects, and opportunities
          to drive business impact through data.
        </p>

        {/* Contact cards — horizontal */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 reveal delay-3"
          style={{ marginBottom: '2rem' }}
        >
          {CONTACT_METHODS.map(({ icon: Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center gap-3 rounded-xl transition-all duration-200 hover:shadow-sm"
              style={{
                padding: '1.25rem 1rem',
                border: '1px solid rgba(0,0,0,0.06)',
                background: 'rgba(0,0,0,0.01)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.025)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.01)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)' }}
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200/60 transition-colors">
                <Icon size={18} strokeWidth={1.5} className="text-neutral-500" />
              </div>
              <div className="text-center">
                <span className="block text-sm font-semibold text-neutral-900">
                  {label}
                </span>
                <span className="block text-xs text-neutral-400 truncate" style={{ maxWidth: '180px' }}>
                  {value}
                </span>
              </div>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="text-neutral-300 group-hover:text-neutral-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </a>
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 reveal delay-4">
          <MapPin size={14} strokeWidth={1.5} className="text-neutral-400" />
          <span className="text-sm text-neutral-400">
            Based in Melbourne, Australia
          </span>
        </div>
      </div>

      {/* Footer — pinned to bottom */}
      <footer
        className="reveal delay-5"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1.5rem var(--space-xl)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[13px] font-semibold text-neutral-900 tracking-tight">
            Aldrich Liem
          </span>

          <span className="text-xs text-neutral-300">
            Designed & built with React + Tailwind
          </span>

          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-400">
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
      </footer>
    </section>
  )
}

export default Contact
