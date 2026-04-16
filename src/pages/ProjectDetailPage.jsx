import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Github, ExternalLink, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
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
        <main className="relative z-[2] bg-white min-h-screen">
          <div className="container page-offset pb-24 text-center">
            <h1 className="text-h1 mb-4">Project Not Found</h1>
            <p className="text-body mb-8">The project you're looking for doesn't exist.</p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-[#111111] hover:text-[#6B7280] transition-colors"
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
      <main className="relative z-[2] bg-white min-h-screen">
        <div className="container page-offset pb-24">
          {/* Breadcrumb */}
          <nav className="breadcrumb flex items-center gap-2 mb-10">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} strokeWidth={1.5} className="text-neutral-300" />
            <Link to="/projects" className="breadcrumb-link">Projects</Link>
            <ChevronRight size={14} strokeWidth={1.5} className="text-neutral-300" />
            <span className="text-sm text-neutral-900 font-medium">{project.name}</span>
          </nav>

          {/* Hero — two-column: info left, image right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
            {/* Left — Title + Meta + CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-label">{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="text-label">{project.year}</span>
                {project.status && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="text-label">{project.status}</span>
                  </>
                )}
              </div>

              <h1 className="text-h1 mb-4">{project.name}</h1>
              <p className="text-lead mb-8">{project.tagline}</p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 text-[14px] font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:border-neutral-400 hover:text-neutral-900 transition-all duration-200"
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
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 text-[14px] font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all duration-200"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={14} strokeWidth={2} />
                  </a>
                )}
              </div>
            </div>

            {/* Right — Project Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-neutral-900/[0.06]">
                <img
                  src={imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider mb-16" />

          {/* Content — single column, constrained */}
          <div className="max-w-3xl mb-20">
            {/* Overview */}
            <div className="mb-16">
              <h2 className="text-label mb-6">Overview</h2>
              <p className="text-[15px] leading-[1.8] text-neutral-600">
                {project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-16">
              <h2 className="text-label mb-6">Key Features</h2>
              <ul className="flex flex-col gap-4">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-neutral-300 mt-[1px] select-none">—</span>
                    <span className="text-[14px] leading-[1.7] text-neutral-600">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Built With */}
            <div>
              <h2 className="text-label mb-5">Built With</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex px-3.5 py-1.5 text-[12px] font-medium text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="border-t border-neutral-100 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50/50 transition-all duration-200"
                >
                  <ArrowLeft
                    size={18}
                    strokeWidth={1.5}
                    className="text-neutral-300 group-hover:text-neutral-600 transition-colors flex-shrink-0"
                  />
                  <div>
                    <span className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">Previous</span>
                    <p className="text-[15px] font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
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
                    <span className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">Next</span>
                    <p className="text-[15px] font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                      {nextProject.name}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="text-neutral-300 group-hover:text-neutral-600 transition-colors flex-shrink-0"
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
