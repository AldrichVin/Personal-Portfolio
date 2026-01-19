import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import RubiksCube from './components/RubiksCube'
import './index.css'

function App() {
  // Initialize intersection observer for reveal animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, options)

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal, .reveal-image')
    revealElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* 3D Rubik's Cube - Fixed position, spans entire viewport */}
      <RubiksCube />

      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}

export default App
