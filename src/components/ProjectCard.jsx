import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
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
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">
              {project.name}
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg line-clamp-2">
              {project.tagline}
            </p>
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
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-1 tracking-tight">
              {project.name}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-1">
              {project.tagline}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  // Homepage variant — clean, minimal card
  if (variant === 'homepage') {
    return (
      <Link to={`/projects/${project.id}`} className="block group">
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-neutral-100">
          <img
            src={imageUrl}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-medium text-neutral-900 mb-1 group-hover:text-neutral-600 transition-colors duration-200">
              {project.name}
            </h3>
            <p className="text-[13px] text-neutral-400 line-clamp-1">
              {project.tagline}
            </p>
          </div>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="text-neutral-300 group-hover:text-neutral-900 transition-colors duration-200 flex-shrink-0 mt-0.5"
          />
        </div>
      </Link>
    )
  }

  // Archive variant (default) — same clean approach
  return (
    <Link to={`/projects/${project.id}`} className="block group">
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-neutral-100">
        <img
          src={imageUrl}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-medium text-neutral-900 mb-1 group-hover:text-neutral-600 transition-colors duration-200">
            {project.name}
          </h3>
          <p className="text-[13px] text-neutral-400 line-clamp-2">
            {project.tagline}
          </p>
        </div>
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="text-neutral-300 group-hover:text-neutral-900 transition-colors duration-200 flex-shrink-0 mt-0.5"
        />
      </div>
    </Link>
  )
}

export default ProjectCard
