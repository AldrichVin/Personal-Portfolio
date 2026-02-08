/**
 * Skills Section - Data Analytics Focus
 *
 * Typography System (consistent with Hero/About):
 * - H3: text-lg, font-semibold, text-neutral-900
 * - Body: text-sm, text-neutral-600
 * - Label: text-xs, font-semibold, uppercase, tracking-widest
 */

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
    <section id="skills" className="section section-border bg-white">
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
                  {/* H3 style */}
                  <h3 className="text-h3 mb-6">
                    {group.name}
                  </h3>
                  <ul className="space-y-3.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-sm text-neutral-600 flex items-center gap-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
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
