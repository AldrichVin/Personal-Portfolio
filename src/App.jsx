import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import RubiksCube from './components/RubiksCube'
import CursorGlow from './components/CursorGlow'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import useLenis from './hooks/useLenis'
import './index.css'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Lenis smooth scroll — re-inits on route change
  useLenis()

  // Re-init intersection observer on route change
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, options)

    // Small delay to let the DOM render after route transition
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-image')
      revealElements.forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* 3D Rubik's Cube - Homepage only */}
      {isHomePage && <RubiksCube />}

      {/* Cursor glow effect - desktop only */}
      <CursorGlow />

      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
