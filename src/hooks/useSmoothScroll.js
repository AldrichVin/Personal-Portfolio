import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import Snap from 'lenis/snap'
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

    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      duration: 1.2,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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

    // Set up snap after DOM renders
    const snapTimer = setTimeout(() => {
      if (prefersReducedMotion) return

      const snap = new Snap(lenis, {
        type: 'mandatory',
        lerp: 0.08,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        duration: 1.0,
        debounce: 50,
      })

      SECTION_SELECTORS.forEach((sel) => {
        const el = document.querySelector(sel)
        if (el) snap.addElement(el, { align: ['start'] })
      })

      snapInstanceRef.current = snap
    }, 500)

    const handleResize = () => {
      ScrollTrigger.refresh()
      if (snapInstanceRef.current) snapInstanceRef.current.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(snapTimer)
      window.removeEventListener('resize', handleResize)
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
