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

    // Smooth scrolling with reduced multiplier to prevent section-skipping
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      duration: 1.2,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    })

    lenisInstanceRef.current = lenis
    if (scrollContextRef.current?.lenisRef) {
      scrollContextRef.current.lenisRef.current = lenis
    }

    // Snap-to-nearest-section after user stops scrolling
    let snapTimeout = null
    let isSnapping = false

    const getSectionTops = () => {
      return SECTION_SELECTORS.map((sel) => {
        const el = document.querySelector(sel)
        return el ? el.offsetTop : null
      }).filter((v) => v !== null)
    }

    const snapToNearest = () => {
      if (isSnapping) return
      const tops = getSectionTops()
      const scrollY = lenis.scroll
      let closestIdx = 0
      let closestDist = Infinity
      tops.forEach((top, i) => {
        const dist = Math.abs(scrollY - top)
        if (dist < closestDist) {
          closestDist = dist
          closestIdx = i
        }
      })

      // Only snap if we're not already aligned (threshold: 5px)
      if (closestDist > 5) {
        isSnapping = true
        lenis.scrollTo(tops[closestIdx], {
          duration: 0.8,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          onComplete: () => {
            isSnapping = false
          },
        })
      }
    }

    // Sync with GSAP ScrollTrigger + debounce snap
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

      // Reset snap timer on every scroll event — snap when scrolling stops
      if (!isSnapping) {
        clearTimeout(snapTimeout)
        snapTimeout = setTimeout(snapToNearest, 150)
      }
    })

    // GSAP ticker drives the RAF loop
    const rafCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(snapTimeout)
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
      lenisInstanceRef.current = null
      if (scrollContextRef.current?.lenisRef) scrollContextRef.current.lenisRef.current = null
    }
  }, [enabled, computeCurrentSection])

  return lenisInstanceRef
}

export default useSmoothScroll
