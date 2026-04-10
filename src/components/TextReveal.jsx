import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * TextReveal — Premium mask-reveal text animation
 *
 * Each line slides up from behind an overflow:hidden mask.
 * Uses GSAP ScrollTrigger for scroll-position-aware triggering.
 */
const TextReveal = ({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.08,
  triggerStart = 'top 85%',
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const lines = container.querySelectorAll('.text-reveal-line')
    if (lines.length === 0) return

    gsap.set(lines, { yPercent: 110 })

    const st = ScrollTrigger.create({
      trigger: container,
      start: triggerStart,
      onEnter: () => {
        gsap.to(lines, {
          yPercent: 0,
          duration: 0.7,
          stagger,
          delay,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      },
      onLeaveBack: () => {
        gsap.to(lines, {
          yPercent: -110,
          duration: 0.4,
          stagger: 0.04,
          ease: 'power2.in',
          overwrite: 'auto',
        })
      },
    })

    return () => st.kill()
  }, [delay, stagger, triggerStart])

  // Split children into lines (wrap each child/string in mask)
  const content = typeof children === 'string'
    ? children.split('\n').map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden', lineHeight: 1.1 }}>
          <span className="text-reveal-line" style={{ display: 'block' }}>
            {line}
          </span>
        </span>
      ))
    : Array.isArray(children)
      ? children.map((child, i) => (
          <span key={i} style={{ display: 'block', overflow: 'hidden', lineHeight: 1.1 }}>
            <span className="text-reveal-line" style={{ display: 'block' }}>
              {child}
            </span>
          </span>
        ))
      : (
          <span style={{ display: 'block', overflow: 'hidden', lineHeight: 1.1 }}>
            <span className="text-reveal-line" style={{ display: 'block' }}>
              {children}
            </span>
          </span>
        )

  return (
    <Tag ref={containerRef} className={className}>
      {content}
    </Tag>
  )
}

export default TextReveal
