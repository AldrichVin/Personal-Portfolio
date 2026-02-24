import { useEffect, useRef } from 'react'

const CursorGlow = () => {
  const glowRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const smoothPos = useRef({ x: 0, y: 0 })
  const visible = useRef(false)
  const rafId = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      visible.current = true
    }
    const handleMouseLeave = () => { visible.current = false }

    const animate = () => {
      const lerp = 0.12
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * lerp
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * lerp

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${smoothPos.current.x - 150}px, ${smoothPos.current.y - 150}px)`
        glowRef.current.style.opacity = visible.current ? '1' : '0'
      }
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.body.addEventListener('mouseleave', handleMouseLeave)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow hidden md:block" />
}

export default CursorGlow
