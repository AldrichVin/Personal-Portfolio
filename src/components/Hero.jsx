import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
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

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container-custom">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
          >
            Hi, I'm Aldrich
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-xl sm:text-2xl text-gray-600 font-light"
          >
            Full Stack Developer & Creative Engineer
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
          >
            I craft digital experiences that combine thoughtful design with clean code.
            Passionate about building products that make a difference.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="btn-primary"
            >
              View My Work
              <ArrowDown size={18} />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-secondary"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-center gap-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-3 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
                whileHover={{ y: -2 }}
                aria-label={social.label}
                onClick={social.href === '#contact' ? (e) => handleNavClick(e, '#contact') : undefined}
              >
                <social.icon size={22} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
