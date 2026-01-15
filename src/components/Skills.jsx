import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    name: 'Frontend',
    color: '#6366f1',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Three.js / WebGL', level: 80 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    name: 'Backend',
    color: '#8b5cf6',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'PostgreSQL / Prisma', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'Firebase', level: 82 },
      { name: 'Docker', level: 75 },
    ],
  },
  {
    name: 'Web3 & Data',
    color: '#22d3ee',
    skills: [
      { name: 'Solana / Web3', level: 78 },
      { name: 'R / Data Analysis', level: 85 },
      { name: 'Vega-Lite', level: 82 },
      { name: 'Python', level: 80 },
      { name: 'Kotlin / Android', level: 75 },
    ],
  },
]

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Three.js', icon: '🔮' },
  { name: 'Solana', icon: '◎' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '📦' },
  { name: 'Figma', icon: '✏️' },
]

const SkillBar = ({ skill, color, delay }) => {
  const barRef = useRef(null)
  const isInView = useInView(barRef, { once: true, margin: '-50px' })

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-white/80 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-sm text-white/50 font-mono">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 20px ${color}40`,
          }}
        />
      </div>
    </div>
  )
}

const Skills = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-indigo-400 font-mono text-sm tracking-wider uppercase">
            Skills & Expertise
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Technologies I
            <br />
            <span className="gradient-text-static">Work With</span>
          </h2>
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="p-6 rounded-2xl glass"
            >
              <h3
                className="text-lg font-display font-semibold mb-6"
                style={{ color: category.color }}
              >
                {category.name}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={category.color}
                    delay={catIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology icons marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <h3 className="text-center text-lg text-white/50 mb-8">
            Tools & Technologies
          </h3>

          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -1200] }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            >
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 px-6 py-4 rounded-xl glass flex items-center gap-3 group hover:bg-white/10 transition-colors cursor-default"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Additional info cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mt-16"
        >
          <div className="p-6 rounded-2xl glass">
            <h4 className="font-display font-semibold text-white mb-3">
              Always Learning
            </h4>
            <p className="text-white/60 text-sm">
              Currently exploring AI/ML integration, advanced animation techniques,
              and distributed systems architecture. The tech landscape never stops
              evolving, and neither do I.
            </p>
          </div>
          <div className="p-6 rounded-2xl glass">
            <h4 className="font-display font-semibold text-white mb-3">
              Best Practices
            </h4>
            <p className="text-white/60 text-sm">
              Strong advocate for clean code, test-driven development, and
              accessibility-first design. I believe great products are built on
              solid foundations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
