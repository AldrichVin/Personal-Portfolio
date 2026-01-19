/**
 * Skills Section - Refined Structure
 *
 * Design: Clear grouping, proper visual hierarchy
 * Smooth transitions, appropriate density
 */

const skillGroups = [
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'PostgreSQL', 'Prisma', 'Firebase', 'REST APIs'],
  },
  {
    name: 'Tools & Other',
    skills: ['Git', 'Docker', 'AWS', 'Solana/Web3', 'Python', 'Figma'],
  },
]

const Skills = () => {
  return (
    <section id="skills" className="section section-border bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Section Label */}
          <div className="lg:col-span-3">
            <span className="text-label reveal">Expertise</span>
          </div>

          {/* Skills Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              {skillGroups.map((group, groupIndex) => (
                <div key={group.name} className={`reveal delay-${groupIndex + 1}`}>
                  <h3 className="text-h3 mb-4">{group.name}</h3>
                  <ul className="space-y-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="text-body">
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
