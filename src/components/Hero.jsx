import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to('.hero-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Fade out hero content on scroll
      gsap.to('.hero-content', {
        opacity: 0,
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AldrichVin', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/aldrichvin', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ]

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradients */}
      <div className="hero-bg absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

      {/* Content */}
      <motion.div
        className="hero-content relative z-10 max-w-5xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={itemVariants} ref={textRef}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="text-white">Hi, I'm </span>
            <span className="gradient-text">Aldrich</span>
          </h1>
        </motion.div>

        {/* Subtitle with typing effect style */}
        <motion.div variants={itemVariants} className="mt-6">
          <p className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light">
            Full Stack Developer & <span className="gradient-text-static">Creative Engineer</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          I build immersive digital experiences that blend cutting-edge technology
          with thoughtful design. From Web3 protocols to 3D visualizations,
          I bring ideas to life through code.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.a
            href="#contact"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/5 hover:border-white/40 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center justify-center gap-6"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-3 rounded-full glass text-white/60 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
