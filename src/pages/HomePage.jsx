import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import PageTransition from '../components/PageTransition'

const HomePage = () => {
  return (
    <PageTransition>
      <main className="relative">
        <Hero />
        <div className="relative z-[2] bg-[#FAFAF8]/75 backdrop-blur-[2px]">
          <About />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>
    </PageTransition>
  )
}

export default HomePage
