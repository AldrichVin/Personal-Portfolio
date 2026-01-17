import { useState, useEffect } from 'react'

/**
 * Navbar - Premium Editorial Navigation
 *
 * Design: Intentional presence with clear hierarchy
 * Fixed position with background on scroll
 */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-5 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-neutral-100'
          : 'py-8'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo - Intentional, premium */}
        <a
          href="#"
          onClick={handleScrollToTop}
          className="text-lg font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          Aldrich Liem
        </a>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="text-[0.9375rem] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            className="text-[0.9375rem] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Work
          </a>
          <a
            href="#skills"
            onClick={(e) => handleNavClick(e, '#skills')}
            className="text-[0.9375rem] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-[0.9375rem] font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Status indicator - subtle but present */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-neutral-500 hide-mobile">
            Available
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
