import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
// Snap import removed — using manual section-by-section navigation instead
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const SECTION_SELECTORS = [
  '#hero-section',
  '#details-section',
  '#breakdown-section',
  '#about',
  '#projects',
  '#skills',
  '#contact',
]

const useSmoothScroll = (enabled = true, scrollContext = null) => {
  const lenisInstanceRef = useRef(null)
  const snapInstanceRef = useRef(null)
  // Store scrollContext in ref to avoid dependency issues
  const scrollContextRef = useRef(scrollContext)
  scrollContextRef.current = scrollContext

  const computeCurrentSection = useCallback((scrollY) => {
    let closest = 0
    let minDist = Infinity

    SECTION_SELECTORS.forEach((sel, i) => {
      const el = document.querySelector(sel)
      if (!el) return
      const elTop = el.getBoundingClientRect().top + scrollY
      const dist = Math.abs(scrollY - elTop)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })
    return closest
  }, [])

  useEffect(() => {
    if (!enabled) {
      if (snapInstanceRef.current) {
        snapInstanceRef.current.destroy()
        snapInstanceRef.current = null
      }
      if (lenisInstanceRef.current) {
        lenisInstanceRef.current.destroy()
        lenisInstanceRef.current = null
        if (scrollContextRef.current?.lenisRef) scrollContextRef.current.lenisRef.current = null
      }
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Track which section we're currently on to enforce one-at-a-time navigation
    let currentSectionIndex = 0
    let isSnapping = false

    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      duration: 1.2,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.5,
      touchMultiplier: 1,
    })

    lenisInstanceRef.current = lenis
    if (scrollContextRef.current?.lenisRef) {
      scrollContextRef.current.lenisRef.current = lenis
    }

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()

      const ctx = scrollContextRef.current
      if (ctx?.updateScroll) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? e.scroll / docHeight : 0
        const section = computeCurrentSection(e.scroll)

        ctx.updateScroll({
          progress,
          currentSection: section,
          direction: e.direction,
          velocity: e.velocity,
        })
      }
    })

    // GSAP ticker drives the RAF loop
    const rafCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Enforce one-section-at-a-time scrolling
    const getSectionTops = () => {
      return SECTION_SELECTORS.map((sel) => {
        const el = document.querySelector(sel)
        return el ? el.offsetTop : null
      }).filter((v) => v !== null)
    }

    const scrollToSection = (index) => {
      const tops = getSectionTops()
      if (index < 0 || index >= tops.length || isSnapping) return
      isSnapping = true
      currentSectionIndex = index
      lenis.scrollTo(tops[index], {
        duration: 1.0,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        onComplete: () => {
          isSnapping = false
        },
      })
    }

    const handleWheel = (e) => {
      if (isSnapping) {
        e.preventDefault()
        return
      }
      e.preventDefault()
      if (e.deltaY > 0) {
        scrollToSection(currentSectionIndex + 1)
      } else if (e.deltaY < 0) {
        scrollToSection(currentSectionIndex - 1)
      }
    }

    const handleKeyDown = (e) => {
      if (isSnapping) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        scrollToSection(currentSectionIndex + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        scrollToSection(currentSectionIndex - 1)
      }
    }

    // Wait for DOM to be ready
    const snapTimer = setTimeout(() => {
      if (prefersReducedMotion) return

      // Determine starting section
      const tops = getSectionTops()
      const scrollY = window.scrollY
      let closestIdx = 0
      let closestDist = Infinity
      tops.forEach((top, i) => {
        const dist = Math.abs(scrollY - top)
        if (dist < closestDist) {
          closestDist = dist
          closestIdx = i
        }
      })
      currentSectionIndex = closestIdx

      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('keydown', handleKeyDown)
    }, 500)

    const handleResize = () => {
      ScrollTrigger.refresh()
      if (snapInstanceRef.current) snapInstanceRef.current.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(snapTimer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      gsap.ticker.remove(rafCallback)
      if (snapInstanceRef.current) {
        snapInstanceRef.current.destroy()
        snapInstanceRef.current = null
      }
      lenis.destroy()
      lenisInstanceRef.current = null
      if (scrollContextRef.current?.lenisRef) scrollContextRef.current.lenisRef.current = null
    }
  }, [enabled, computeCurrentSection])

  return lenisInstanceRef
}

export default useSmoothScroll
