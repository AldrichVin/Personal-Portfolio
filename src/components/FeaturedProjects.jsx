import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

const FeaturedProjects = () => {
  const featured = projects.filter((p) => p.featured)
  const heroProject = featured[0]
  const gridProjects = featured.slice(1, 5)

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
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

        {/* Hero Project — Full Width */}
        <div className="reveal delay-2 mb-8">
          <ProjectCard project={heroProject} variant="featured-hero" />
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 reveal delay-3">
          {gridProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="featured-grid"
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="flex justify-center reveal delay-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 text-[15px] font-medium text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-xl hover:bg-neutral-100 hover:border-neutral-300 transition-all duration-200 group"
          >
            <span>View All Projects</span>
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
