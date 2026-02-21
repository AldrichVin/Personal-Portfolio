import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, Github, ExternalLink, CheckCircle } from 'lucide-react'
import { projects, projectImages } from '../data/projects'
import { useLenisContext } from '../context/LenisContext'

const ProjectModal = ({ project, onClose, lenisRef }) => {
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const modalBody = document.querySelector('.modal-body')

    const stopPropagation = (e) => {
      e.stopPropagation()
    }

    // Focus trap logic
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstFocusable = focusableElements[0]
        const lastFocusable = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault()
            lastFocusable.focus()
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault()
            firstFocusable.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    document.body.setAttribute('data-lenis-prevent', '')

    // Disable Lenis smooth scroll when modal is open
    const lenis = lenisRef?.current
    if (lenis) {
      lenis.stop()
    }

    // Stop wheel/touch events from reaching Lenis
    if (modalBody) {
      modalBody.addEventListener('wheel', stopPropagation, { passive: false })
      modalBody.addEventListener('touchmove', stopPropagation, { passive: false })
    }

    setTimeout(() => {
      document.querySelector('.modal-backdrop')?.classList.add('active')
      document.querySelector('.modal-content')?.classList.add('active')
      // Focus the close button on open
      closeButtonRef.current?.focus()
    }, 10)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      document.body.removeAttribute('data-lenis-prevent')

      if (lenis) {
        lenis.start()
      }

      if (modalBody) {
        modalBody.removeEventListener('wheel', stopPropagation)
        modalBody.removeEventListener('touchmove', stopPropagation)
      }
    }
  }, [onClose, lenisRef])

  const handleClose = () => {
    document.querySelector('.modal-backdrop')?.classList.remove('active')
    document.querySelector('.modal-content')?.classList.remove('active')
    setTimeout(onClose, 200)
  }

  if (!project) return null

  return createPortal(
    <>
      <div className="modal-backdrop" onClick={handleClose} />
      <div ref={modalRef} className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-lenis-prevent>
        {/* Sticky Header */}
        <div className="modal-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="modal-meta-tag">{project.category}</span>
              <span className="modal-meta-divider" />
              <span className="modal-meta-text">{project.year}</span>
            </div>
            <button
              onClick={handleClose}
              ref={closeButtonRef}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="modal-body">
          {/* Title Block */}
          <div className="modal-section modal-section-hero">
            <h2 id="modal-title" className="modal-title">{project.name}</h2>
            <p className="modal-tagline">{project.tagline}</p>
            <div className="modal-status">
              <span className={`modal-status-dot ${project.status === 'Complete' ? 'complete' : 'in-progress'}`} />
              <span className="modal-status-text">{project.status}</span>
            </div>
          </div>

          {/* Overview Section */}
          <div className="modal-section">
            <h3 className="modal-section-title">Overview</h3>
            <p className="modal-section-body">{project.longDescription}</p>
          </div>

          {/* Key Features Section */}
          <div className="modal-section">
            <h3 className="modal-section-title">Key Features</h3>
            <ul className="modal-features-list">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="modal-feature-item">
                  <span className="modal-feature-marker">
                    <CheckCircle size={14} strokeWidth={2} />
                  </span>
                  <span className="modal-feature-text">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Section */}
          <div className="modal-section modal-section-tech">
            <h3 className="modal-section-title">Built With</h3>
            <div className="modal-tech-grid">
              {project.techStack.map((tech) => (
                <span key={tech} className="modal-tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll fade indicator */}
        <div className="modal-scroll-fade" />

        {/* Footer Actions */}
        <div className="modal-footer">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn modal-action-secondary"
            >
              <Github size={16} strokeWidth={1.5} />
              <span>View Source</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn modal-action-primary"
            >
              <span>Visit Live Site</span>
              <ExternalLink size={14} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </>,
    document.body
  )
}

const ProjectItem = ({ project, index, isReversed, onClick }) => {
  const projectNumber = String(index + 1).padStart(2, '0')
  const imageUrl = projectImages[project.id] || projectImages['datapraktis']

  return (
    <article
      className="project-item py-12 border-b border-neutral-100 last:border-b-0 cursor-pointer"
      onClick={() => onClick(project)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(project) } }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.name}`}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center`}>
        {/* Image - with gradient overlay and hover label */}
        <div
          className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'} reveal-image`}
        >
          <div className="project-image group/img relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shadow-neutral-900/[0.08] ring-1 ring-neutral-900/[0.05]">
            <img
              src={imageUrl}
              alt={project.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent pointer-events-none" />
            {/* Project number */}
            <span className="absolute bottom-3 left-4 text-white/70 text-xs font-mono font-medium">
              {projectNumber}
            </span>
            {/* Hover label */}
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-medium tracking-wide">View Details</span>
            </div>
          </div>
        </div>

        {/* Content - proper hierarchy */}
        <div
          className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'} reveal delay-2`}
        >
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-sm font-medium text-neutral-400">
              {projectNumber}
            </span>
            <span className="font-mono px-2.5 py-1 text-xs font-medium text-neutral-500 bg-neutral-100 rounded-md uppercase tracking-wide">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="project-title text-h2 mb-2">
            {project.name}
          </h3>

          {/* Tagline */}
          <p className="text-sm font-medium text-neutral-500 mb-4">
            {project.tagline}
          </p>

          {/* Description - better contrast */}
          <p className="text-base text-neutral-600 leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Tech tags - refined */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="font-mono px-2.5 py-1 text-xs font-medium text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2.5 py-1 text-xs font-medium text-neutral-400 bg-neutral-50 border border-neutral-200 rounded-md">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const lenisRef = useLenisContext()

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header - Strong presence */}
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

        {/* Projects List */}
        <div className="reveal delay-2">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              isReversed={index % 2 !== 0}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          lenisRef={lenisRef}
        />
      )}
    </section>
  )
}

export default Projects
