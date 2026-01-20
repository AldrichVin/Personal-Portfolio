/**
 * Skills Section - Premium Editorial Design
 *
 * Design improvements:
 * - Better visual hierarchy with refined typography
 * - Subtle styling on skill items
 * - Consistent spacing
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
              {skillGroups.map((group, groupIndex) => (
                <div key={group.name} className={`reveal delay-${groupIndex + 1}`}>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-5">
                    {group.name}
                  </h3>
                  <ul className="space-y-3">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-base text-neutral-600 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
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
