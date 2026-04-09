import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const SECTION_SELECTORS = [
  '#hero-section',
  '#details-section',
  '#breakdown-section',
  '#about',
  '#projects',
  '#skills',
  '#contact',
]

const TRANSITION_DURATION = 1.0
const TRANSITION_EASE = 'power2.inOut'
const TOUCH_THRESHOLD = 50

const useSnapScroll = (enabled = true) => {
  const currentIndex = useRef(0)
  const isTransitioning = useRef(false)
  const sectionOffsets = useRef([])
  const touchStartY = useRef(0)
  const lastWheelTime = useRef(0)
  const accumulatedDelta = useRef(0)

  const computeOffsets = useCallback(() => {
    sectionOffsets.current = SECTION_SELECTORS.map((sel) => {
      const el = document.querySelector(sel)
      if (!el) return 0
      return el.getBoundingClientRect().top + window.scrollY
    })
  }, [])

  const goToSection = useCallback((targetIndex) => {
    const clamped = Math.max(0, Math.min(targetIndex, SECTION_SELECTORS.length - 1))
    if (clamped === currentIndex.current || isTransitioning.current) return

    isTransitioning.current = true

    gsap.to(window, {
      scrollTo: { y: Math.max(0, sectionOffsets.current[clamped]), autoKill: false },
      duration: TRANSITION_DURATION,
      ease: TRANSITION_EASE,
      onComplete: () => {
        currentIndex.current = clamped
        // Small delay to absorb residual wheel momentum
        setTimeout(() => {
          isTransitioning.current = false
        }, 80)
      },
    })
  }, [])

  useEffect(() => {
    if (!enabled) return

    computeOffsets()

    // Snap to nearest section on load
    const scrollY = window.scrollY
    let closest = 0
    let minDist = Infinity
    sectionOffsets.current.forEach((offset, i) => {
      const dist = Math.abs(scrollY - offset)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })
    currentIndex.current = closest

    // --- Wheel handler ---
    // Trackpads fire many small deltaY events per gesture.
    // We accumulate delta and only trigger after a threshold,
    // plus a time-based cooldown to prevent double-fires.
    const WHEEL_COOLDOWN = 800 // ms after triggering before accepting new input
    const DELTA_THRESHOLD = 30 // accumulated px before triggering

    let wheelTimer = null

    const handleWheel = (e) => {
      e.preventDefault()
      if (isTransitioning.current) return

      const now = Date.now()
      if (now - lastWheelTime.current < WHEEL_COOLDOWN) return

      accumulatedDelta.current += e.deltaY

      // Reset accumulator after inactivity
      clearTimeout(wheelTimer)
      wheelTimer = setTimeout(() => {
        accumulatedDelta.current = 0
      }, 200)

      if (Math.abs(accumulatedDelta.current) >= DELTA_THRESHOLD) {
        const direction = accumulatedDelta.current > 0 ? 1 : -1
        const target = currentIndex.current + direction
        accumulatedDelta.current = 0
        lastWheelTime.current = now
        goToSection(target)
      }
    }

    // --- Touch handlers ---
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      // Prevent native scroll — we handle everything
      if (isTransitioning.current) {
        e.preventDefault()
        return
      }
      e.preventDefault()
    }

    const handleTouchEnd = (e) => {
      if (isTransitioning.current) return
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(deltaY) > TOUCH_THRESHOLD) {
        const direction = deltaY > 0 ? 1 : -1
        goToSection(currentIndex.current + direction)
      }
    }

    // --- Keyboard handler ---
    const handleKeydown = (e) => {
      // Don't intercept if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (isTransitioning.current) return

      switch (e.key) {
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          goToSection(currentIndex.current + 1)
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          goToSection(currentIndex.current - 1)
          break
        case 'Home':
          e.preventDefault()
          goToSection(0)
          break
        case 'End':
          e.preventDefault()
          goToSection(SECTION_SELECTORS.length - 1)
          break
      }
    }

    // --- Resize handler ---
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        computeOffsets()
        window.scrollTo(0, sectionOffsets.current[currentIndex.current])
        ScrollTrigger.refresh()
      }, 150)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
      clearTimeout(wheelTimer)
    }
  }, [enabled, computeOffsets, goToSection])

  return { goToSection, currentIndex }
}

export default useSnapScroll
