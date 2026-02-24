import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CursorGlow = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0)

  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 })
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 })

  const rafPending = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafPending.current) return
      rafPending.current = true
      requestAnimationFrame(() => {
        x.set(e.clientX)
        y.set(e.clientY)
        opacity.set(1)
        rafPending.current = false
      })
    }

    const handleMouseLeave = () => {
      opacity.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [x, y, opacity])

  return (
    <motion.div
      className="cursor-glow hidden md:block"
      style={{
        x: springX,
        y: springY,
        opacity,
      }}
    />
  )
}

export default CursorGlow
