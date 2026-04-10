import { useState, useEffect, useRef } from 'react'
import { useScroll } from '../context/ScrollContext'

const SECTION_LABELS = [
  'Hero',
  'Expertise',
  'Stats',
  'About',
  'Projects',
  'Skills',
  'Contact',
]

const SECTION_SELECTORS = [
  '#hero-section',
  '#details-section',
  '#breakdown-section',
  '#about',
  '#projects',
  '#skills',
  '#contact',
]

/**
 * ScrollProgress — Vertical dot navigation on right edge
 * Shows active section, clickable to navigate, with label tooltips
 */
const ScrollProgress = () => {
  const { currentSection, scrollTo, progress } = useScroll()
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef(null)

  // Show after first scroll, hide at top
  useEffect(() => {
    if (progress > 0.02) {
      setIsVisible(true)
    } else {
      // Delay hide to prevent flicker
      timeoutRef.current = setTimeout(() => setIsVisible(false), 300)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [progress])

  const handleDotClick = (index) => {
    const el = document.querySelector(SECTION_SELECTORS[index])
    if (el) scrollTo(el, { duration: 1.2 })
  }

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-0 transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      {/* Connector line */}
      <div
        className="absolute"
        style={{
          width: '1px',
          top: '4px',
          bottom: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.06)',
        }}
      />

      {/* Progress fill */}
      <div
        className="absolute"
        style={{
          width: '1px',
          top: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(79, 70, 229, 0.35)',
          height: `${(currentSection / (SECTION_LABELS.length - 1)) * 100}%`,
          transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {SECTION_LABELS.map((label, i) => {
        const isActive = currentSection === i
        const isHovered = hoveredIndex === i

        return (
          <button
            key={label}
            onClick={() => handleDotClick(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(-1)}
            className="relative flex items-center justify-center group"
            style={{
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            aria-label={`Scroll to ${label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Dot */}
            <span
              style={{
                width: isActive ? '8px' : '4px',
                height: isActive ? '8px' : '4px',
                borderRadius: '50%',
                background: isActive ? '#4f46e5' : 'rgba(0,0,0,0.15)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered && !isActive ? 'scale(1.5)' : 'scale(1)',
              }}
            />

            {/* Label tooltip */}
            <span
              className="absolute right-full mr-3 text-xs font-medium whitespace-nowrap pointer-events-none"
              style={{
                color: '#1d1d1f',
                opacity: isHovered || isActive ? 1 : 0,
                transform: isHovered || isActive ? 'translateX(0)' : 'translateX(4px)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontSize: '10px',
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default ScrollProgress
