import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, X, Layers } from 'lucide-react'
import { projects, categories } from '../data/projects'

const ProjectCard = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(project)}
      className="group cursor-pointer"
    >
      <div className="h-full p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
        {/* Project visual placeholder */}
        <div
          className="w-full h-40 rounded-xl mb-5 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)`,
          }}
        >
          <Layers size={40} style={{ color: project.color }} className="opacity-40" />
        </div>

        {/* Content */}
        <div>
          {/* Category tag */}
          <span className="tag mb-3">{project.category}</span>

          {/* Title */}
          <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {project.name}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-gray-500 mt-1 mb-3">{project.tagline}</p>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {project.year} · {project.status}
            </span>
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                </a>
              )}
              <span className="p-1.5 text-gray-400 group-hover:text-indigo-600 transition-colors">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="tag mb-3">{project.category}</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
            {project.name}
          </h2>
          <p className="text-gray-500 mt-2">{project.tagline}</p>
        </div>

        {/* Visual placeholder */}
        <div
          className="w-full h-40 rounded-xl mb-6 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
          }}
        >
          <Layers size={48} style={{ color: project.color }} className="opacity-40" />
        </div>

        {/* Full description */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">Overview</h3>
          <p className="text-gray-600 leading-relaxed">{project.longDescription}</p>
        </div>

        {/* Key highlights */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Key Features</h3>
          <ul className="space-y-2">
            {project.highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 text-gray-600"
              >
                <span className="text-indigo-500 mt-1">-</span>
                {highlight}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github size={18} />
              View Source
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding bg-gray-50"
    >
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm text-gray-500 uppercase tracking-wider">
            Featured Work
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Projects
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl">
            A collection of projects showcasing my journey through different domains.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-400">
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project modal */}
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
