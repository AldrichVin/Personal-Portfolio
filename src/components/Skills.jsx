import { useEffect, useRef, useState } from 'react'
import { BarChart3, Database, LineChart, Wrench } from 'lucide-react'

const GROUP_ICONS = {
  'Data Analysis & Modeling': BarChart3,
  'Databases & Warehousing': Database,
  'Visualization & BI': LineChart,
  'Engineering & Tools': Wrench,
}

const skillGroups = [
  {
    name: 'Data Analysis & Modeling',
    skills: ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'SciPy', 'EDA'],
  },
  {
    name: 'Databases & Warehousing',
    skills: ['PostgreSQL', 'MongoDB', 'Oracle SQL', 'Supabase', 'ETL Pipelines'],
  },
  {
    name: 'Visualization & BI',
    skills: ['Power BI', 'Tableau', 'Plotly', 'Matplotlib', 'Altair', 'Vega-Lite'],
  },
  {
    name: 'Engineering & Tools',
    skills: ['FastAPI', 'Flask', 'Git/GitHub', 'Docker', 'Jupyter', 'Excel'],
  },
]

const SkillGroup = ({ group, groupIndex }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const Icon = GROUP_ICONS[group.name]

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal delay-${groupIndex + 1} skill-card`}
    >
      {/* Icon */}
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
          <Icon size={20} strokeWidth={1.5} className="text-neutral-500" />
        </div>
      )}

      {/* Title + count */}
      <div className="mb-2">
        <h3 className="text-h3 mb-1">
          {group.name}
        </h3>
        <span className="text-xs font-mono text-neutral-400">
          {group.skills.length} skills
        </span>
      </div>

      {/* Accent line */}
      <div className="w-10 h-0.5 bg-neutral-200 mb-5" />

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, badgeIndex) => (
          <span
            key={skill}
            className={`px-3 py-1.5 text-xs font-mono font-medium tracking-wide
                       bg-neutral-50/80 border border-neutral-200/60
                       rounded-lg text-neutral-700
                       hover:border-neutral-300 hover:bg-white hover:shadow-sm
                       transition-all duration-200 cursor-default
                       ${isVisible ? 'badge-stagger' : 'opacity-0'}`}
            style={isVisible ? { animationDelay: `${groupIndex * 100 + badgeIndex * 50}ms` } : undefined}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="section section-border">
      {/* Section gradient divider */}
      <div className="section-divider mb-16" />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Section Label */}
          <div className="lg:col-span-2">
            <span className="text-label reveal">Expertise</span>
          </div>

          {/* Skills Grid — 2x2 on desktop */}
          <div className="lg:col-span-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillGroups.map((group, groupIndex) => (
                <SkillGroup
                  key={group.name}
                  group={group}
                  groupIndex={groupIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
