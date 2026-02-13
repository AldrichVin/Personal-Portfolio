import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { projects, categories } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import PageTransition from '../components/PageTransition'

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  // Only show categories that have projects
  const activeCategories = categories.filter(
    (cat) => cat === 'All' || projects.some((p) => p.category === cat)
  )

  return (
    <PageTransition>
      <main className="relative z-[2] bg-[#FAFAF8] min-h-screen">
        <div className="container pt-40 md:pt-48 pb-24">
          {/* Page Header */}
          <div className="mb-12">
            <span className="text-label mb-4 block">Archive</span>
            <h1 className="text-display mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              All Projects
            </h1>
            <p className="text-lead max-w-2xl">
              A collection of {projects.length} projects spanning full-stack development,
              AI/ML, data visualization, and creative 3D experiences.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-12">
            {activeCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ProjectCard project={project} variant="archive" />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-body">No projects found in this category.</p>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}

export default ProjectsPage
