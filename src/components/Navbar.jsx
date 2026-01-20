import { useState, useEffect } from 'react'

/**
 * Navbar - Premium Editorial Navigation
 *
 * Design improvements:
 * - Larger, more intentional typography
 * - Better spacing and visual weight
 * - Refined scroll state with subtle shadow
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
          ? 'py-4 bg-[#FAFAFA]/95 backdrop-blur-md shadow-sm shadow-neutral-900/[0.03]'
          : 'py-6 md:py-8'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo - Stronger presence */}
        <a
          href="#"
          onClick={handleScrollToTop}
          className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          Aldrich Liem
        </a>

        {/* Navigation Links - Better sizing and spacing */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="text-base font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            className="text-base font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Work
          </a>
          <a
            href="#skills"
            onClick={(e) => handleNavClick(e, '#skills')}
            className="text-base font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-base font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Status indicator - Better visual balance */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-base font-medium text-neutral-500 hidden sm:inline">
            Available
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
