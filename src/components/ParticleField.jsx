import { useEffect, useRef } from 'react'

const MAX_PARTICLES = 300
const PARTICLE_DIVISOR = 15000
const CONNECTION_DISTANCE = 100
const MAX_VELOCITY = 0.3
const MAX_RADIUS = 1.5
const MIN_RADIUS = 0.5
const PARTICLE_COLOR = '99, 102, 241'

const ParticleField = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

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

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
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

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${0.1 * (1 - distance / CONNECTION_DISTANCE)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(drawParticles)
    }

    const handleResize = () => {
      resize()
      createParticles()
    }

    resize()
    createParticles()
    drawParticles()

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
