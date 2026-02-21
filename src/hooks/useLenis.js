import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const useLenis = () => {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    // Destroy previous instance
    if (lenisRef.current) {
      lenisRef.current.destroy()
      lenisRef.current = null
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    // Refresh ScrollTrigger after Lenis init
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      lenis.destroy()
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [pathname])

  return lenisRef
}

export default useLenis
