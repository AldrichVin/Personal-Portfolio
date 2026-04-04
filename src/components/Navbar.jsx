import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (path) =>
    location.pathname === path || (path === '/projects' && location.pathname.startsWith('/projects'))

  return (
    <nav
      className={`nav-entrance fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/90 backdrop-blur-md border-b border-neutral-200/60'
          : 'py-5 md:py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-[15px] md:text-[16px] font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          Aldrich Liem
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { to: '/', label: 'Home' },
            { to: '/projects', label: 'Projects' },
            { to: '#contact', label: 'Contact', isAnchor: true },
          ].map(({ to, label, isAnchor }) =>
            isAnchor ? (
              <a
                key={to}
                href={to}
                className="text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
              >
                {label}
              </a>
            ) : (
              <Link
                key={to}
                to={to}
                className={`text-[13px] transition-colors duration-200 ${
                  isActive(to)
                    ? 'text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {label}
              </Link>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container flex flex-col gap-1 pt-4 pb-6">
          {[
            { to: '/', label: 'Home' },
            { to: '/projects', label: 'Projects' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="py-3 text-[15px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="#contact"
            className="py-3 text-[15px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
