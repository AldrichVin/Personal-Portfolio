import { useEffect, useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import RubiksCube from './components/RubiksCube'
import CursorGlow from './components/CursorGlow'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ScrollProgress from './components/ScrollProgress'
import { ScrollProvider } from './context/ScrollContext'
import useSmoothScroll from './hooks/useSmoothScroll'
import useSectionTransitions from './hooks/useSectionTransitions'
import ScrollContext from './context/ScrollContext'
import './index.css'

const AppInner = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const scrollContext = useContext(ScrollContext)

  // Enable smooth scroll + snap on homepage
  useSmoothScroll(isHomePage, scrollContext)

  // Enable GSAP-driven section transitions on homepage
  useSectionTransitions(isHomePage)

  // IntersectionObserver fallback for non-homepage routes
  useEffect(() => {
    if (isHomePage) return // Homepage uses GSAP transitions

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

    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-image, .clip-reveal-child, .hr-grow')
      revealElements.forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [location.pathname, isHomePage])

  return (
    <div className="min-h-screen bg-white">
      {isHomePage && <RubiksCube />}
      {isHomePage && <ScrollProgress />}
      <CursorGlow />
      <div className="noise-overlay" />
      <Navbar />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
      </Routes>
    </div>
  )
}

const App = () => (
  <ScrollProvider>
    <AppInner />
  </ScrollProvider>
)

export default App
