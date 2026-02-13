import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Github, ExternalLink, CheckCircle, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { projects, projectImages } from '../data/projects'
import PageTransition from '../components/PageTransition'

const ProjectDetailPage = () => {
  const { id } = useParams()
  const projectIndex = projects.findIndex((p) => p.id === id)
  const project = projects[projectIndex]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <PageTransition>
        <main className="relative z-[2] bg-[#FAFAF8] min-h-screen">
          <div className="container pt-40 md:pt-48 pb-24 text-center">
            <h1 className="text-h1 mb-4">Project Not Found</h1>
            <p className="text-body mb-8">The project you're looking for doesn't exist.</p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Back to Projects
            </Link>
          </div>
        </main>
      </PageTransition>
    )
  }

  const imageUrl = projectImages[project.id] || projectImages['datapraktis']
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <PageTransition>
      <main className="relative z-[2] bg-[#FAFAF8] min-h-screen">
        <div className="container pt-40 md:pt-48 pb-24">
          {/* Breadcrumb */}
          <nav className="breadcrumb flex items-center gap-2 mb-10">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} strokeWidth={1.5} className="text-neutral-300" />
            <Link to="/projects" className="breadcrumb-link">Projects</Link>
            <ChevronRight size={14} strokeWidth={1.5} className="text-neutral-300" />
            <span className="text-sm text-neutral-900 font-medium">{project.name}</span>
          </nav>

          {/* Hero Block */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono px-2.5 py-1 text-xs font-medium text-neutral-500 bg-neutral-100 rounded-md uppercase tracking-wide">
                {project.category}
              </span>
              <span className="text-sm text-neutral-400">{project.year}</span>
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Complete' ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse-dot'}`} />
                <span className="text-sm text-neutral-400">{project.status}</span>
              </div>
            </div>
            <h1 className="text-display mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              {project.name}
            </h1>
            <p className="text-lead max-w-3xl">{project.tagline}</p>
          </div>

          {/* Project Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg shadow-neutral-900/[0.08] ring-1 ring-neutral-900/[0.05] mb-16">
            <img
              src={imageUrl}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent pointer-events-none" />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Overview */}
              <div className="mb-12">
                <h2 className="font-mono text-xs font-medium text-neutral-400 uppercase tracking-[0.12em] mb-4">
                  Overview
                </h2>
                <p className="text-lg leading-[1.8] text-neutral-600">
                  {project.longDescription}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-12">
                <h2 className="font-mono text-xs font-medium text-neutral-400 uppercase tracking-[0.12em] mb-4">
                  Key Features
                </h2>
                <ul className="flex flex-col gap-3.5">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 flex items-center justify-center w-[22px] h-[22px] bg-neutral-100 rounded-md text-neutral-500 mt-0.5">
                        <CheckCircle size={14} strokeWidth={2} />
                      </span>
                      <span className="text-[15px] leading-relaxed text-neutral-600">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Tech Stack */}
              <div className="mb-10">
                <h2 className="font-mono text-xs font-medium text-neutral-400 uppercase tracking-[0.12em] mb-4">
                  Built With
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono px-3 py-1.5 text-xs font-medium text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-medium text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-xl hover:bg-neutral-100 hover:border-neutral-300 transition-all duration-200"
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
                    className="flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-medium text-white bg-neutral-900 border border-neutral-900 rounded-xl hover:bg-neutral-800 transition-all duration-200"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={14} strokeWidth={2} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="border-t border-neutral-200 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50/50 transition-all duration-200"
                >
                  <ArrowLeft
                    size={18}
                    strokeWidth={1.5}
                    className="text-neutral-400 group-hover:text-neutral-600 transition-colors flex-shrink-0"
                  />
                  <div>
                    <span className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Previous</span>
                    <p className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                      {prevProject.name}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.id}`}
                  className="group flex items-center justify-end gap-4 p-5 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50/50 transition-all duration-200 text-right"
                >
                  <div>
                    <span className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Next</span>
                    <p className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                      {nextProject.name}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="text-neutral-400 group-hover:text-neutral-600 transition-colors flex-shrink-0"
                  />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default ProjectDetailPage
