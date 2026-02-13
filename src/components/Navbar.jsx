import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={`nav-entrance fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-5 bg-[#FAFAF8]/95 backdrop-blur-md shadow-sm shadow-neutral-900/[0.03]'
          : 'py-7 md:py-10'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-[22px] md:text-[26px] font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          Aldrich Liem
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-[15px] font-medium transition-colors duration-200 ${
                location.pathname === to || (to === '/projects' && location.pathname.startsWith('/projects'))
                  ? 'text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side: status + hamburger */}
        <div className="flex items-center gap-4">
          {/* Status indicator */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[13px] font-medium text-neutral-500 hidden sm:inline">
              Available
            </span>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container flex flex-col gap-1 pt-4 pb-6 bg-[#FAFAF8]/95 backdrop-blur-md">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="py-3 text-lg font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
