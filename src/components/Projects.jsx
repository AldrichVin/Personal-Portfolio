import { useState, useEffect } from 'react'
import { X, Github, ExternalLink, CheckCircle } from 'lucide-react'
import { projects } from '../data/projects'

/**
 * Projects Section - Refined Chapter Layout
 *
 * Design: Strong section heading, balanced image/text ratio
 * Reduced spacing, clearer information hierarchy
 */

// Placeholder images for projects
const projectImages = {
  'datapraktis': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&sat=-100',
  'receipts': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2532&auto=format&fit=crop&sat=-100',
  'hov-corporation': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop&sat=-100',
  'nba-ranking': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2490&auto=format&fit=crop&sat=-100',
  'australia-climate': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2544&auto=format&fit=crop&sat=-100',
  'monash-mates': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2540&auto=format&fit=crop&sat=-100',
}

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    setTimeout(() => {
      document.querySelector('.modal-backdrop')?.classList.add('active')
      document.querySelector('.modal-content')?.classList.add('active')
    }, 10)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleClose = () => {
    document.querySelector('.modal-backdrop')?.classList.remove('active')
    document.querySelector('.modal-content')?.classList.remove('active')
    setTimeout(onClose, 200)
  }

  if (!project) return null

  return (
    <>
      <div className="modal-backdrop" onClick={handleClose} />
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
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
              {project.highlights.map((highlight, index) => (
                <li key={index} className="modal-feature-item">
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
    </>
  )
}

const ProjectItem = ({ project, index, isReversed, onClick }) => {
  const projectNumber = String(index + 1).padStart(2, '0')
  const imageUrl = projectImages[project.id] || projectImages['datapraktis']

  return (
    <article
      className="project-item py-12 border-b border-neutral-100 last:border-b-0"
      onClick={() => onClick(project)}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center`}>
        {/* Image - more balanced size */}
        <div
          className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'} reveal-image`}
        >
          <div className="project-image aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={project.name}
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content - proper hierarchy */}
        <div
          className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'} reveal delay-2`}
        >
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-small font-medium text-neutral-400">
              {projectNumber}
            </span>
            <span className="tag">{project.category}</span>
          </div>

          {/* Title */}
          <h3 className="project-title text-h2 mb-2">{project.name}</h3>

          {/* Tagline */}
          <p className="text-small font-medium text-neutral-500 mb-4">
            {project.tagline}
          </p>

          {/* Description */}
          <p className="text-body mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
            {project.techStack.length > 4 && (
              <span className="tag">+{project.techStack.length - 4}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header - Strong presence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="lg:col-span-3">
            <span className="text-label reveal">Selected Works</span>
          </div>
          <div className="lg:col-span-9">
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
        />
      )}
    </section>
  )
}

export default Projects
