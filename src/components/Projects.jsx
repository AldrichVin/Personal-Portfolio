import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, X, Folder, Calendar, CheckCircle2 } from 'lucide-react'
import { projects, categories } from '../data/projects'

/**
 * Projects Section - Premium Showcase
 *
 * Design Decisions:
 * - Generous card spacing for breathing room
 * - Story-driven project descriptions
 * - Strong hover states with lift and shadow
 * - Category filtering with smooth transitions
 * - Modal for detailed project view
 */

const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  // Status styling
  const statusStyles = {
    'Complete': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    'In Development': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    'Frontend Prototype': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  }

  const status = statusStyles[project.status] || statusStyles['Complete']

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(project)}
      className="group cursor-pointer"
    >
      <div className="h-full card-interactive flex flex-col">
        {/* Project Header with accent */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${project.color}15` }}
          >
            <Folder size={24} style={{ color: project.color }} />
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-background text-tertiary hover:text-primary transition-all"
                onClick={(e) => e.stopPropagation()}
                aria-label="View source code"
              >
                <Github size={18} />
              </a>
            )}
            <span className="p-2 text-accent">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>

        {/* Category & Status */}
        <div className="flex items-center gap-2 mb-3">
          <span className="tag-sm">{project.category}</span>
          <span className={`tag-sm ${status.bg} ${status.text} border-0`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} mr-1.5`} />
            {project.status}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-subheader group-hover:text-accent transition-colors mb-2">
          {project.name}
        </h3>

        {/* Tagline */}
        <p className="text-small font-medium text-accent mb-3">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-body flex-grow mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium bg-background rounded-md text-secondary"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium bg-background rounded-md text-tertiary">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-small">
            <Calendar size={14} className="text-tertiary" />
            {project.year}
          </span>
          <span className="text-small text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Details →
          </span>
        </div>
      </div>
    </motion.article>
  )
}

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-primary/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient accent */}
        <div
          className="sticky top-0 z-10 px-8 pt-8 pb-6"
          style={{ background: `linear-gradient(to bottom, ${project.color}08, transparent)` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-background text-tertiary hover:text-primary transition-all"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <span className="tag">{project.category}</span>
            <span className="tag text-emerald-700 bg-emerald-50 border-emerald-100">
              <CheckCircle2 size={12} className="mr-1" />
              {project.status}
            </span>
          </div>

          <h2 className="text-section">{project.name}</h2>
          <p className="text-lead mt-2" style={{ color: project.color }}>
            {project.tagline}
          </p>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {/* Full description */}
          <div className="mb-8">
            <h3 className="text-label mb-3">Overview</h3>
            <p className="text-body leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Key highlights */}
          <div className="mb-8">
            <h3 className="text-label mb-4">Key Features</h3>
            <ul className="space-y-3">
              {project.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 text-body"
                >
                  <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <h3 className="text-label mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-background border border-border text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 justify-center"
              >
                <Github size={18} />
                Source Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="text-label text-accent mb-3 block">Featured Work</span>
          <h2 className="text-section mb-4">
            Projects that showcase my{' '}
            <span className="gradient-text">expertise</span>
          </h2>
          <p className="text-lead max-w-2xl">
            From Web3 protocols to data visualization platforms, each project
            represents a unique challenge solved with modern technology.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-surface border border-border text-secondary hover:border-tertiary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Folder size={48} className="mx-auto mb-4 text-tertiary" />
            <p className="text-body">No projects in this category yet.</p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
