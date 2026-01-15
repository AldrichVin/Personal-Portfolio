import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detect active section
      const sections = navItems.map((item) => item.href.slice(1))
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 glass border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-display text-2xl font-bold gradient-text-static">
              AVL
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-white/5 -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:block px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-glow transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden pt-20 glass"
          >
            <div className="flex flex-col items-center gap-4 py-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-2xl font-medium ${
                    activeSection === item.href.slice(1)
                      ? 'gradient-text-static'
                      : 'text-white/70 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-4 px-8 py-3 rounded-full text-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
