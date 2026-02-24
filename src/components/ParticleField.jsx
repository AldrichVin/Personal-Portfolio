import { useEffect, useRef } from 'react'

const MAX_PARTICLES = 80
const PARTICLE_DIVISOR = 25000
const CONNECTION_DISTANCE = 120
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE
const MAX_VELOCITY = 0.3
const MAX_RADIUS = 1.5
const MIN_RADIUS = 0.5
const PARTICLE_COLOR = '99, 102, 241'
const TARGET_FPS = 30
const FRAME_INTERVAL = 1000 / TARGET_FPS

const ParticleField = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let lastFrameTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / PARTICLE_DIVISOR),
        MAX_PARTICLES
      )

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * MAX_RADIUS + MIN_RADIUS,
          vx: (Math.random() - 0.5) * MAX_VELOCITY,
          vy: (Math.random() - 0.5) * MAX_VELOCITY,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const drawParticles = (timestamp) => {
      animationId = requestAnimationFrame(drawParticles)

      // Cap to 30fps
      if (timestamp - lastFrameTime < FRAME_INTERVAL) return
      lastFrameTime = timestamp

      const len = particles.length
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < len; i++) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${particle.opacity})`
        ctx.fill()

        // Indexed for-loop instead of .slice().forEach()
        for (let j = i + 1; j < len; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distSq = dx * dx + dy * dy

          if (distSq < CONNECTION_DISTANCE_SQ) {
            const distance = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${0.1 * (1 - distance / CONNECTION_DISTANCE)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const handleResize = () => {
      resize()
      createParticles()
    }

    resize()
    createParticles()
    animationId = requestAnimationFrame(drawParticles)

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  )
}

export default ParticleField
