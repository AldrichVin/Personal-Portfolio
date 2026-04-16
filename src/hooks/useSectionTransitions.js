import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  '#hero-section',
  '#details-section',
  '#breakdown-section',
  '#about',
  '#projects',
  '#skills',
  '#contact',
]

/**
 * useSectionTransitions — GSAP ScrollTrigger per-section orchestration
 *
 * Creates:
 * 1. Staggered reveal animations for .reveal elements within each section
 * 2. Crossfade depth effect between consecutive sections
 * 3. Subtle parallax on headings
 */
const useSectionTransitions = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return

    const ctx = gsap.context(() => {
      // ============================================
      // 1. SCROLL-TRIGGERED REVEAL ANIMATIONS
      // Replaces IntersectionObserver with GSAP-driven reveals
      // ============================================
      SECTIONS.forEach((selector) => {
        const section = document.querySelector(selector)
        if (!section) return

        const reveals = section.querySelectorAll('.reveal')
        if (reveals.length === 0) return

        // Set initial state — subtle scale for depth
        gsap.set(reveals, { opacity: 0, y: 24, scale: 0.98 })

        ScrollTrigger.create({
          trigger: section,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(reveals, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: { amount: 0.08 * reveals.length, from: 'start' },
              ease: 'back.out(1.4)',
              overwrite: 'auto',
            })
          },
          onLeaveBack: () => {
            gsap.to(reveals, {
              opacity: 0,
              y: -20,
              scale: 0.98,
              duration: 0.3,
              stagger: 0.04,
              ease: 'power2.in',
              overwrite: 'auto',
            })
          },
        })
      })

      // ============================================
      // 2. CROSSFADE DEPTH BETWEEN SECTIONS
      // Exiting section scales down + blurs, entering section enters clean
      // ============================================
      SECTIONS.forEach((selector, i) => {
        if (i === 0) return // Skip hero (first section)
        const section = document.querySelector(selector)
        const prevSection = document.querySelector(SECTIONS[i - 1])
        if (!section || !prevSection) return

        // Crossfade: previous section fades/scales as this one enters
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top center',
            scrub: 0.5,
          }
        })
        .fromTo(prevSection, {
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
        }, {
          scale: 0.96,
          filter: 'blur(3px)',
          opacity: 0.4,
          ease: 'none',
        }, 0)
      })

      // ============================================
      // 3. PARALLAX ON SECTION HEADINGS
      // Headings move slightly faster than scroll for depth
      // ============================================
      SECTIONS.forEach((selector) => {
        const section = document.querySelector(selector)
        if (!section) return

        const headings = section.querySelectorAll('.text-h1, .text-display')
        if (headings.length === 0) return

        headings.forEach((heading) => {
          gsap.to(heading, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3,
            }
          })
        })
      })

      // ============================================
      // 4. HR-GROW ANIMATION
      // ============================================
      const hrElements = document.querySelectorAll('.hr-grow')
      hrElements.forEach((hr) => {
        ScrollTrigger.create({
          trigger: hr,
          start: 'top 85%',
          onEnter: () => hr.classList.add('active'),
          onLeaveBack: () => hr.classList.remove('active'),
        })
      })

      // ============================================
      // 5. CLIP REVEAL ANIMATIONS
      // ============================================
      const clipReveals = document.querySelectorAll('.clip-reveal-child')
      clipReveals.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => el.classList.add('active'),
          onLeaveBack: () => el.classList.remove('active'),
        })
      })
    })

    return () => ctx.revert()
  }, [enabled])
}

export default useSectionTransitions
