import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react'

/**
 * Hero Section - Premium Portfolio
 *
 * Design Decisions:
 * - Reduced vertical whitespace for tighter, more impactful layout
 * - Asymmetric layout creates visual interest
 * - Scroll-triggered animations reveal content progressively
 * - Value proposition clear within 5 seconds
 * - Strong CTA placement for recruiter engagement
 */

const Hero = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  // Subtle scroll-based parallax (no opacity fade to avoid blank page)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 50])

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom easing for smooth deceleration
      },
    },
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AldrichVin', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/aldrichvin', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Highlight keywords for scanning recruiters
  const highlightWords = ['Full-Stack Developer', 'React', 'Next.js', 'TypeScript']

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent pointer-events-none" />

      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 right-[10%] w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-[5%] w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          style={{ y }}
          className="max-w-4xl"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Status badge - Grabs attention immediately */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Open to opportunities
              </span>
            </motion.div>

            {/* Main heading - Maximum impact */}
            <motion.div variants={itemVariants}>
              <h1 className="text-hero mb-4">
                I build{' '}
                <span className="relative inline-block">
                  <span className="gradient-text">digital products</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                  />
                </span>
                {' '}that users love.
              </h1>
            </motion.div>

            {/* Role statement - Clear positioning */}
            <motion.p
              variants={itemVariants}
              className="text-lead mb-6 max-w-2xl"
            >
              <span className="text-primary font-medium">Full-Stack Developer</span> specializing in{' '}
              <span className="font-medium text-primary">React</span>,{' '}
              <span className="font-medium text-primary">Next.js</span>, and{' '}
              <span className="font-medium text-primary">TypeScript</span>.
              I turn complex problems into elegant, user-centric solutions.
            </motion.p>

            {/* Value proposition - Quick wins for recruiters */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-10"
            >
              {['6+ Production Projects', 'Monash University', 'Melbourne, AU'].map((item, i) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-sm text-secondary"
                >
                  <Sparkles size={14} className="text-accent" />
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons - High contrast, clear action */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
            >
              <motion.a
                href="#projects"
                onClick={(e) => handleNavClick(e, '#projects')}
                className="btn-primary group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown size={18} />
                </motion.span>
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social links - Secondary but accessible */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-1"
            >
              <span className="text-small mr-3">Find me on</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2.5 rounded-lg text-tertiary hover:text-primary hover:bg-surface border border-transparent hover:border-border transition-all duration-200"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  onClick={social.href === '#contact' ? (e) => handleNavClick(e, '#contact') : undefined}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-tertiary"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-1.5 bg-current rounded-full"
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
