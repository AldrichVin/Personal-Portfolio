import { useEffect, useRef, useState } from 'react'

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
      className={`reveal delay-${groupIndex + 1}`}
    >
      <h3 className="text-[13px] font-medium text-neutral-900 mb-3">
        {group.name}
      </h3>
      <div
        className={`flex flex-col gap-1.5 ${isVisible ? 'badge-stagger' : 'opacity-0'}`}
        style={isVisible ? { animationDelay: `${groupIndex * 80}ms` } : undefined}
      >
        {group.skills.map((skill) => (
          <span key={skill} className="text-[13px] text-neutral-400">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

const Skills = () => {
  return (
    <section id="skills" style={{ height: '100dvh', minHeight: '100dvh', overflow: 'hidden', background: '#fff' }}>
      <div style={{ height: '25vh' }} />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          <div className="lg:col-span-2">
            <span className="text-label reveal">Expertise</span>
          </div>

          <div className="lg:col-span-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-10">
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
