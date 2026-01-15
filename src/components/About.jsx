import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Code2, Palette, Rocket, Sparkles, GraduationCap, MapPin, Calendar } from 'lucide-react'

/**
 * About Section - Scrollytelling Design
 *
 * Design Decisions:
 * - Progressive reveal as user scrolls (chapter-like experience)
 * - Stats section for quick scanning by recruiters
 * - Values showcase personality and work ethic
 * - Personal touch with quote block
 */

const About = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Scroll-based parallax for the stats section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const statsY = useTransform(scrollYProgress, [0, 1], [50, -50])

  const values = [
    {
      icon: Code2,
      title: 'Clean Architecture',
      description: 'Building maintainable, scalable codebases that stand the test of time',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Palette,
      title: 'Design Systems',
      description: 'Creating consistent, beautiful interfaces with attention to every pixel',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Rocket,
      title: 'Performance First',
      description: 'Optimizing for speed and delivering exceptional user experiences',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Exploring cutting-edge tech from Web3 to AI-powered solutions',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
  ]

  const stats = [
    { value: '6+', label: 'Projects Shipped', icon: Rocket },
    { value: '10+', label: 'Technologies', icon: Code2 },
    { value: '2025', label: 'Graduating', icon: GraduationCap },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      },
    }),
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-surface relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={contentRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <span className="text-label text-accent mb-3 block">About Me</span>
            <h2 className="text-section max-w-xl">
              Crafting digital experiences that{' '}
              <span className="gradient-text">make an impact</span>
            </h2>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Story Column - 3/5 width */}
            <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
              <p className="text-body-lg">
                I'm a <strong className="text-primary">Full-Stack Developer</strong> based in{' '}
                <span className="inline-flex items-center gap-1">
                  <MapPin size={16} className="text-accent" />
                  Melbourne, Australia
                </span>
                , currently completing my studies at{' '}
                <strong className="text-primary">Monash University</strong>.
              </p>

              <p className="text-body">
                My journey in tech started with a fascination for how digital products
                can transform user experiences. Today, I specialize in building
                full-stack applications with <strong>React</strong>, <strong>Next.js</strong>,
                and <strong>TypeScript</strong>, always with a focus on clean code and intuitive design.
              </p>

              <p className="text-body">
                From crafting <strong>Web3 prediction markets on Solana</strong> to building
                immersive <strong>3D data visualizations</strong>, I love pushing the boundaries
                of what's possible on the web. Each project is an opportunity to solve
                meaningful problems and deliver exceptional user experiences.
              </p>

              {/* Quick Facts */}
              <div className="flex flex-wrap gap-4 pt-4">
                <span className="inline-flex items-center gap-2 text-small">
                  <GraduationCap size={16} className="text-accent" />
                  Bachelor of IT @ Monash
                </span>
                <span className="inline-flex items-center gap-2 text-small">
                  <Calendar size={16} className="text-accent" />
                  Graduating 2025
                </span>
              </div>
            </motion.div>

            {/* Stats Column - 2/5 width */}
            <motion.div
              className="lg:col-span-2"
              style={{ y: statsY }}
            >
              <div className="card-feature sticky top-32">
                <h3 className="text-subheader mb-6">By the Numbers</h3>
                <div className="space-y-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center">
                        <stat.icon size={22} className="text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold text-primary">
                          {stat.value}
                        </div>
                        <div className="text-small">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Grid - Full Width */}
          <motion.div variants={itemVariants} className="mt-20">
            <h3 className="text-subheader mb-8">What Drives Me</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="card group"
                >
                  <div className={`w-10 h-10 rounded-lg ${value.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon size={20} className={value.color} />
                  </div>
                  <h4 className="font-display font-semibold text-primary mb-2">
                    {value.title}
                  </h4>
                  <p className="text-small">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quote Block */}
          <motion.div
            variants={itemVariants}
            className="mt-16 max-w-2xl"
          >
            <blockquote className="relative pl-6 border-l-2 border-accent">
              <p className="text-body-lg italic text-secondary">
                "Great software is invisible when it works, but profoundly impactful
                on the user experience. That's the standard I hold myself to."
              </p>
              <footer className="mt-4 text-small font-medium">
                — My Development Philosophy
              </footer>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
