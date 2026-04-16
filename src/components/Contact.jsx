import { ArrowUpRight, ArrowUp, MapPin } from 'lucide-react'
import { useScroll } from '../context/ScrollContext'

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'aldrichvin040205@gmail.com',
    href: 'mailto:aldrichvin040205@gmail.com',
    external: false,
  },
  {
    label: 'GitHub',
    value: 'AldrichVin',
    href: 'https://github.com/AldrichVin',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'aldrich-vincent',
    href: 'https://linkedin.com/in/aldrich-vincent-4463b2355',
    external: true,
  },
]

const Contact = () => {
  const { scrollTo } = useScroll()

  const handleBackToTop = (e) => {
    e.preventDefault()
    scrollTo(0, { duration: 1.2 })
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
      <div className="container" style={{ maxWidth: '540px', textAlign: 'center' }}>
        {/* Label */}
        <div className="reveal" style={{ marginBottom: '2rem' }}>
          <span className="text-label">Contact</span>
        </div>

        {/* Headline */}
        <h2 className="text-h1 reveal delay-1" style={{ marginBottom: '1rem' }}>
          Let's <span className="text-serif-accent text-[#4f46e5]">connect</span>.
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
          style={{ marginBottom: '2.5rem', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          Open to data analyst roles, analytics projects, and opportunities
          to drive business impact through data.
        </p>

        {/* Contact links — clean inline list */}
        <div className="reveal delay-3" style={{ marginBottom: '2rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              maxWidth: '380px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {CONTACT_LINKS.map(({ label, value, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between transition-colors duration-200 hover:bg-neutral-50"
                style={{
                  padding: '0.875rem 0.75rem',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                <span
                  className="text-xs text-neutral-400 uppercase tracking-widest"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", minWidth: '72px', textAlign: 'left' }}
                >
                  {label}
                </span>
                <span className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900 transition-colors">
                  {value}
                </span>
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="text-neutral-300 group-hover:text-neutral-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ml-3 flex-shrink-0"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 reveal delay-4">
          <MapPin size={14} strokeWidth={1.5} className="text-neutral-400" />
          <span className="text-sm text-neutral-400">
            Based in Melbourne, Australia
          </span>
        </div>
      </div>

      {/* Footer */}
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
