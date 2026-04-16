import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
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
      if (lenisInstanceRef.current) {
        lenisInstanceRef.current.destroy()
        lenisInstanceRef.current = null
        if (scrollContextRef.current?.lenisRef) scrollContextRef.current.lenisRef.current = null
      }
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let currentSectionIndex = 0
    let isSnapping = false

    // Lenis with ALL user input disabled — we control scrolling entirely
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.08,
      duration: 1.2,
      smoothWheel: false,
      smoothTouch: false,
      wheelMultiplier: 0,
      touchMultiplier: 0,
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
        duration: 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        onComplete: () => {
          isSnapping = false
        },
      })
    }

    // Intercept ALL wheel events — block native scroll, trigger section nav
    const handleWheel = (e) => {
      e.preventDefault()
      if (isSnapping) return
      if (e.deltaY > 0) {
        scrollToSection(currentSectionIndex + 1)
      } else if (e.deltaY < 0) {
        scrollToSection(currentSectionIndex - 1)
      }
    }

    // Intercept touch for mobile swipe
    let touchStartY = 0
    const SWIPE_THRESHOLD = 50

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isSnapping) return
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return
      if (deltaY > 0) {
        scrollToSection(currentSectionIndex + 1)
      } else {
        scrollToSection(currentSectionIndex - 1)
      }
    }

    // Block native touchmove scroll
    const handleTouchMove = (e) => {
      e.preventDefault()
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

    // Wait for DOM to be ready, then attach listeners
    const snapTimer = setTimeout(() => {
      if (prefersReducedMotion) return

      // Determine starting section from current scroll position
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
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('keydown', handleKeyDown)
    }, 500)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(snapTimer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
      lenisInstanceRef.current = null
      if (scrollContextRef.current?.lenisRef) scrollContextRef.current.lenisRef.current = null
    }
  }, [enabled, computeCurrentSection])

  return lenisInstanceRef
}

export default useSmoothScroll
