import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CursorGlow from './components/CursorGlow'
import ParticleField from './components/ParticleField'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenisRef.current?.destroy()
      gsap.ticker.remove(lenisRef.current?.raf)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-void">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Cursor glow effect */}
      <CursorGlow />

      {/* Background particle field */}
      <ParticleField />

      {/* Fixed navigation */}
      <Navbar />

      {/* Main content sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-sm text-white/40 border-t border-white/5">
        <p>Designed & Built by Aldrich Vincent Liem</p>
        <p className="mt-1 text-xs">© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  )
}

export default App
