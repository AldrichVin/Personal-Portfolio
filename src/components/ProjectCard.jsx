import { Link } from 'react-router-dom'
import { projectImages } from '../data/projects'

const ProjectCard = ({ project, variant = 'archive' }) => {
  const imageUrl = projectImages[project.id] || projectImages['datapraktis']

  if (variant === 'featured-hero') {
    return (
      <Link to={`/projects/${project.id}`} className="block group">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg shadow-neutral-900/[0.08] ring-1 ring-neutral-900/[0.05]">
          <img
            src={imageUrl}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/20 to-transparent" />
          <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block font-mono px-2.5 py-1 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-md uppercase tracking-wide mb-3">
              {project.category}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">
              {project.name}
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg line-clamp-2">
              {project.tagline}
            </p>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm font-medium tracking-wide bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              View Project
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured-grid') {
    return (
      <Link to={`/projects/${project.id}`} className="block group">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shadow-neutral-900/[0.08] ring-1 ring-neutral-900/[0.05]">
          <img
            src={imageUrl}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 via-neutral-900/10 to-transparent" />
          <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <span className="inline-block font-mono px-2 py-0.5 text-[10px] font-medium text-white/70 bg-white/10 backdrop-blur-sm rounded uppercase tracking-wide mb-2">
              {project.category}
            </span>
            <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-1 tracking-tight">
              {project.name}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-1">
              {project.tagline}
            </p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm font-medium tracking-wide bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              View Project
            </span>
          </div>
        </div>
      </Link>
    )
  }

  // Archive variant (default)
  return (
    <Link to={`/projects/${project.id}`} className="block group project-grid-card">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md shadow-neutral-900/[0.06] ring-1 ring-neutral-900/[0.05] mb-4">
        <img
          src={imageUrl}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm font-medium tracking-wide bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            View Project
          </span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono px-2 py-0.5 text-[10px] font-medium text-neutral-500 bg-neutral-100 rounded uppercase tracking-wide">
            {project.category}
          </span>
          <span className="text-xs text-neutral-400">{project.year}</span>
        </div>
        <h3 className="text-h3 mb-1 group-hover:text-[#6366f1] transition-colors duration-200">
          {project.name}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-3">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-mono px-2 py-0.5 text-[10px] font-medium text-neutral-400 bg-neutral-50 border border-neutral-200 rounded"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] font-medium text-neutral-400 bg-neutral-50 border border-neutral-200 rounded">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
