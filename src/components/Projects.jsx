import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronRight, X, Layers } from 'lucide-react'
import { projects, categories } from '../data/projects'

const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setRotateX((y - centerY) / 20)
    setRotateY((centerX - x) / 20)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      className="group relative cursor-pointer"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative h-full p-6 md:p-8 rounded-3xl glass overflow-hidden transition-all duration-300 group-hover:border-white/20"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}15, transparent 40%)`,
          }}
        />

        {/* Project color accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: project.color }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                style={{
                  background: `${project.color}20`,
                  color: project.color,
                }}
              >
                {project.category}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors">
                {project.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={20} className="text-white/60" />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-sm text-white/50 mb-4 font-mono">{project.tagline}</p>

          {/* Description */}
          <p className="text-white/70 mb-6 line-clamp-3">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/60 border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/60 border border-white/5">
                +{project.techStack.length - 5} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-xs text-white/40">
              {project.year} · {project.status}
            </span>
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
            style={{
              background: `${project.color}20`,
              color: project.color,
            }}
          >
            {project.category}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            {project.name}
          </h2>
          <p className="text-white/50 font-mono mt-2">{project.tagline}</p>
        </div>

        {/* Visual placeholder */}
        <div
          className="w-full h-48 rounded-2xl mb-8 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
            border: `1px solid ${project.color}30`,
          }}
        >
          <Layers size={64} style={{ color: project.color }} className="opacity-50" />
        </div>

        {/* Full description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
          <p className="text-white/70 leading-relaxed">{project.longDescription}</p>
        </div>

        {/* Key highlights */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
          <ul className="space-y-2">
            {project.highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 text-white/70"
              >
                <span style={{ color: project.color }}>→</span>
                {highlight}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-sm bg-white/5 text-white/80 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              <Github size={20} />
              View Source
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium"
              style={{ background: project.color }}
            >
              <ExternalLink size={20} />
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
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm tracking-wider uppercase">
            Featured Work
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Projects That
            <br />
            <span className="gradient-text-static">Define Me</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl">
            A collection of projects showcasing my journey through different domains —
            from blockchain protocols to immersive 3D experiences.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
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
            className="text-center py-20"
          >
            <p className="text-white/40 text-lg">
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
