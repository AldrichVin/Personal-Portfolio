import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'PostgreSQL', 'Prisma', 'REST APIs', 'Firebase', 'Docker'],
  },
  {
    name: 'Data & Web3',
    skills: ['Python', 'R', 'Vega-Lite', 'Solana', 'Web3.js', 'Kotlin'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'Figma', 'VS Code', 'Linux', 'Vercel', 'AWS'],
  },
]

const Skills = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding"
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="text-sm text-gray-500 uppercase tracking-wider">
              Skills & Expertise
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Technologies I Work With
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl">
              A diverse toolkit spanning frontend, backend, data analysis, and emerging technologies.
            </p>
          </motion.div>

          {/* Skill categories grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="p-6 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: catIndex * 0.1 + skillIndex * 0.03 }}
                      className="px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional info cards */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-6 mt-16"
          >
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="font-display font-semibold text-gray-900 mb-2">
                Always Learning
              </h4>
              <p className="text-gray-600 text-sm">
                Currently exploring AI/ML integration, advanced animation techniques,
                and distributed systems architecture. The tech landscape never stops
                evolving, and neither do I.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="font-display font-semibold text-gray-900 mb-2">
                Best Practices
              </h4>
              <p className="text-gray-600 text-sm">
                Strong advocate for clean code, test-driven development, and
                accessibility-first design. I believe great products are built on
                solid foundations.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
