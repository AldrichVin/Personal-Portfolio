import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

const featuredProjects = projects.filter((p) => p.featured)

const Projects = () => {
  return (
    <section id="projects" className="section">
      {/* Section gradient divider */}
      <div className="section-divider mb-10" />
      <div className="container">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 reveal delay-2">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="homepage"
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="flex justify-center mt-10 reveal delay-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
          >
            View All Projects
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
