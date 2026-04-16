import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useScroll } from '../context/ScrollContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { progress, scrollTo } = useScroll()

  // Derive scrolled state from scroll progress
  useEffect(() => {
    setScrolled(progress > 0.01)
  }, [progress])

  // Fallback scroll listener for non-homepage routes
  useEffect(() => {
    if (location.pathname === '/') return
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (path) =>
    location.pathname === path || (path === '/projects' && location.pathname.startsWith('/projects'))

  const handleContactClick = (e) => {
    e.preventDefault()
    setMobileOpen(false)
    if (location.pathname === '/') {
      scrollTo('#contact', { duration: 1.2 })
    } else {
      window.location.href = '/#contact'
    }
  }

  return (
    <nav
      className={`nav-entrance fixed top-0 left-0 right-0 z-40 transition-all duration-300 glass-contain ${
        scrolled
          ? 'py-2.5 bg-[rgba(255,255,255,0.72)] backdrop-blur-xl backdrop-saturate-[180%] border-b border-black/[0.06]'
          : 'py-4 md:py-5'
      }`}
    >
      <div className="container relative flex items-center justify-between">
        <Link
          to="/"
          className="text-[21px] md:text-[24px] font-semibold text-[#1d1d1f] hover:text-[#1d1d1f]/60 transition-colors"
          style={{ letterSpacing: '-0.02em' }}
        >
          Aldrich Liem
        </Link>

        <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {[
            { to: '/', label: 'Home' },
            { to: '/projects', label: 'Projects' },
            { to: '#contact', label: 'Contact', isAnchor: true },
          ].map(({ to, label, isAnchor }) =>
            isAnchor ? (
              <a
                key={to}
                href={to}
                onClick={handleContactClick}
                className="nav-link-active text-[12px] text-[rgba(0,0,0,0.48)] hover:text-[#1d1d1f] transition-colors duration-200"
                style={{ letterSpacing: '-0.01em' }}
              >
                {label}
              </a>
            ) : (
              <Link
                key={to}
                to={to}
                className={`nav-link-active text-[12px] transition-colors duration-200 ${
                  isActive(to)
                    ? 'text-[#1d1d1f] active'
                    : 'text-[rgba(0,0,0,0.48)] hover:text-[#1d1d1f]'
                }`}
                style={{ letterSpacing: '-0.01em' }}
              >
                {label}
              </Link>
            )
          )}
        </div>

        <button
          className="md:hidden p-2 text-[#1d1d1f]/60 hover:text-[#1d1d1f] transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container flex flex-col pt-3 pb-5">
          {[
            { to: '/', label: 'Home' },
            { to: '/projects', label: 'Projects' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="py-2.5 text-[14px] font-medium text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="#contact"
            className="py-2.5 text-[14px] font-medium text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors"
            onClick={handleContactClick}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
