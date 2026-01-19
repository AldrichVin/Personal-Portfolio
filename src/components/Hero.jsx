import { ArrowDown } from 'lucide-react'
import RubiksCube from './RubiksCube'

/**
 * Hero Section - Refined Editorial Typography
 *
 * Design: Controlled height, tight typography grouping
 * Value proposition clear within 5 seconds
 * 3D Rubik's cube animation on the right side
 */

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-[85vh] flex flex-col justify-center pt-24 pb-16 relative overflow-hidden"
    >
      {/* 3D Rubik's Cube Background - Hidden on mobile */}
      <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full pointer-events-auto opacity-90">
        <RubiksCube />
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl">
          {/* Main headline - tight grouping */}
          <div className="reveal delay-1">
            <h1 className="text-display mb-6">
              <span className="block">Building digital</span>
              <span className="block text-neutral-400">products with</span>
              <span className="block">clarity & purpose.</span>
            </h1>
          </div>

          {/* Supporting text - connected to headline */}
          <div className="flex items-start gap-6 mt-8 reveal delay-2">
            <div className="divider mt-3 flex-shrink-0" />
            <p className="text-lead max-w-md">
              Full-Stack Developer specializing in React, Next.js, and TypeScript.
              Turning complex problems into elegant, user-centric solutions.
            </p>
          </div>

          {/* Quick context */}
          <div className="flex flex-wrap items-center gap-4 mt-8 reveal delay-3">
            <span className="text-small">Melbourne, Australia</span>
            <span className="text-neutral-300">·</span>
            <span className="text-small">Monash University</span>
            <span className="text-neutral-300">·</span>
            <span className="text-small">6+ Projects</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator - anchored */}
      <div className="container mt-auto pt-12">
        <div className="reveal delay-4">
          <div className="animate-subtle-bounce">
            <ArrowDown size={18} className="text-neutral-400" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
