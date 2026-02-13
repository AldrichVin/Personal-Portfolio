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

const Skills = () => {
  return (
    <section id="skills" className="section section-border">
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
                <div key={group.name} className={`reveal delay-${groupIndex + 1}`}>
                  <h3 className="text-h3 mb-5">
                    {group.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm font-medium bg-neutral-50 border border-neutral-200
                                   rounded-full text-neutral-600
                                   hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700
                                   transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
