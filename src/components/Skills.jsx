import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  {
    name: 'Data Analysis & Modeling',
    skills: ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'EDA'],
  },
  {
    name: 'Databases & Warehousing',
    skills: ['PostgreSQL (Supabase)', 'MongoDB', 'Oracle SQL'],
  },
  {
    name: 'Visualization & BI',
    skills: ['Power BI', 'Tableau', 'Vega-Lite'],
  },
  {
    name: 'Engineering & Tools',
    skills: ['Flask (APIs)', 'Git/GitHub', 'Docker'],
  },
]

const SkillGroup = ({ group, groupIndex }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

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
      className={`reveal delay-${groupIndex + 1} skill-card-hover rounded-xl p-4 -m-4`}
    >
      <h3 className="text-h3 mb-5">
        {group.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, badgeIndex) => (
          <span
            key={skill}
            className={`px-3 py-1.5 text-sm font-medium bg-neutral-50 border border-neutral-200
                       rounded-full text-neutral-600
                       hover:border-[#94A3B8]/40 hover:bg-slate-50 hover:text-[#111111]
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

          {/* Skills Grid */}
          <div className="lg:col-span-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10">
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
