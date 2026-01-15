import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Code2,
  Server,
  Database,
  Wrench,
  Sparkles,
  TrendingUp,
  BookOpen,
  Zap,
  Star
} from 'lucide-react'

/**
 * Skills Section - Visual Hierarchy & Scannability
 *
 * Design Decisions:
 * - Featured skills get prominence with larger display
 * - Category icons create visual anchors
 * - Progress-style indicators show proficiency
 * - Staggered reveal creates engagement
 * - "Currently Learning" section shows growth mindset
 */

const skillCategories = [
  {
    name: 'Frontend',
    icon: Code2,
    color: '#3b82f6',
    bgColor: 'bg-blue-50',
    skills: [
      { name: 'React', level: 95, featured: true },
      { name: 'Next.js', level: 90, featured: true },
      { name: 'TypeScript', level: 88, featured: true },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Three.js', level: 70 },
    ],
  },
  {
    name: 'Backend',
    icon: Server,
    color: '#8b5cf6',
    bgColor: 'bg-purple-50',
    skills: [
      { name: 'Node.js', level: 88, featured: true },
      { name: 'PostgreSQL', level: 82 },
      { name: 'Prisma', level: 80 },
      { name: 'REST APIs', level: 90 },
      { name: 'Firebase', level: 78 },
      { name: 'Docker', level: 65 },
    ],
  },
  {
    name: 'Data & Web3',
    icon: Database,
    color: '#10b981',
    bgColor: 'bg-emerald-50',
    skills: [
      { name: 'Python', level: 85, featured: true },
      { name: 'Solana', level: 75, featured: true },
      { name: 'R', level: 72 },
      { name: 'Vega-Lite', level: 80 },
      { name: 'Web3.js', level: 70 },
      { name: 'Kotlin', level: 65 },
    ],
  },
  {
    name: 'Tools & DevOps',
    icon: Wrench,
    color: '#f97316',
    bgColor: 'bg-orange-50',
    skills: [
      { name: 'Git', level: 92, featured: true },
      { name: 'Figma', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux', level: 78 },
      { name: 'Vercel', level: 88 },
      { name: 'AWS', level: 60 },
    ],
  },
]

const currentlyLearning = [
  { name: 'AI/ML Integration', progress: 40 },
  { name: 'Rust', progress: 25 },
  { name: 'System Design', progress: 55 },
]

const SkillBar = ({ skill, delay, color }) => {
  const barRef = useRef(null)
  const isInView = useInView(barRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-sm font-medium ${skill.featured ? 'text-primary' : 'text-secondary'}`}>
          {skill.name}
          {skill.featured && (
            <Star size={12} className="inline ml-1.5 text-amber-500 fill-amber-500" />
          )}
        </span>
        <span className="text-xs text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 bg-background rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  )
}

const SkillCategory = ({ category, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="card group"
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          <category.icon size={20} style={{ color: category.color }} />
        </div>
        <h3 className="text-subheader">{category.name}</h3>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            delay={index * 0.1 + skillIndex * 0.05}
            color={category.color}
          />
        ))}
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Scroll-based parallax for the learning section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const learningY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // Featured skills to highlight
  const featuredSkills = skillCategories
    .flatMap(cat => cat.skills.filter(s => s.featured).map(s => ({ ...s, category: cat.name, color: cat.color })))

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding bg-surface relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <span className="text-label text-accent mb-3 block">Skills & Expertise</span>
            <h2 className="text-section mb-4">
              Technologies I{' '}
              <span className="gradient-text">work with</span>
            </h2>
            <p className="text-lead max-w-2xl">
              A comprehensive toolkit spanning frontend, backend, data analysis,
              and emerging technologies—always expanding.
            </p>
          </motion.div>

          {/* Featured Skills Banner */}
          <motion.div
            variants={itemVariants}
            className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-emerald-50 border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap size={18} className="text-accent" />
              <span className="text-label">Core Competencies</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {featuredSkills.map((skill, index) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="font-medium text-primary">{skill.name}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {skillCategories.map((category, index) => (
              <SkillCategory
                key={category.name}
                category={category}
                index={index}
              />
            ))}
          </div>

          {/* Bottom Section: Learning + Philosophy */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Currently Learning - 3/5 width */}
            <motion.div
              variants={itemVariants}
              style={{ y: learningY }}
              className="lg:col-span-3 card-feature"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                  <TrendingUp size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-subheader">Currently Learning</h3>
                  <p className="text-small">Always pushing boundaries</p>
                </div>
              </div>

              <div className="space-y-5">
                {currentlyLearning.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-primary">{item.name}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700">
                        In Progress
                      </span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.progress}%` } : {}}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-purple-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Philosophy Cards - 2/5 width */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                variants={itemVariants}
                className="card group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen size={20} className="text-blue-500" />
                </div>
                <h4 className="font-display font-semibold text-primary mb-2">
                  Continuous Growth
                </h4>
                <p className="text-small">
                  Currently exploring AI/ML integration, advanced animation techniques,
                  and distributed systems. The tech landscape never stops evolving—neither do I.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="card group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles size={20} className="text-emerald-500" />
                </div>
                <h4 className="font-display font-semibold text-primary mb-2">
                  Best Practices
                </h4>
                <p className="text-small">
                  Strong advocate for clean code, test-driven development, and
                  accessibility-first design. Great products are built on solid foundations.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
