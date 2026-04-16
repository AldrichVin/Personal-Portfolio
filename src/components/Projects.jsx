import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

const featuredProjects = projects.filter((p) => p.featured).slice(0, 6)

const Projects = () => {
  return (
    <section id="projects" style={{ height: '100dvh', minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '8vh', paddingLeft: 'var(--space-xl)', paddingRight: 'var(--space-xl)', background: '#fafaf9', overflow: 'hidden' }}>
      {/* Section gradient divider */}
      <div className="section-divider mb-10" />
      <div className="container">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10" style={{ marginBottom: '2rem' }}>
          <div className="lg:col-span-2">
            <span className="text-label reveal">Selected Works</span>
          </div>
          <div className="lg:col-span-10">
            <h2 className="text-h1 reveal delay-1">
              Projects that showcase my expertise in building
              modern web applications.
            </h2>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6 reveal delay-2">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="homepage"
            />
          ))}
        </div>

        {/* View Projects Link */}
        <div className="flex justify-center reveal delay-3" style={{ marginTop: '2rem' }}>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
          >
            View Projects
            <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
