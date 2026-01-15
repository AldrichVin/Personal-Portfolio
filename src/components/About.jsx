import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Palette, Rocket, Sparkles } from 'lucide-react'

const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const values = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code that tells a story',
    },
    {
      icon: Palette,
      title: 'Design-First',
      description: 'Every pixel matters. UX drives every decision I make',
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Exploring cutting-edge tech from Web3 to 3D graphics',
    },
    {
      icon: Sparkles,
      title: 'Attention to Detail',
      description: 'The magic is in the micro-interactions and polish',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-20">
            <span className="text-indigo-400 font-mono text-sm tracking-wider uppercase">
              About Me
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Building Digital
              <br />
              <span className="gradient-text-static">Experiences</span>
            </h2>
          </motion.div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Story column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative">
                {/* Decorative line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 to-transparent" />

                <div className="pl-8 space-y-6">
                  <p className="text-lg text-white/80 leading-relaxed">
                    I'm a <span className="text-white font-medium">full-stack developer and creative engineer</span> based
                    in Melbourne, Australia. My journey in tech started with a fascination for how
                    digital products can shape human experiences.
                  </p>

                  <p className="text-lg text-white/70 leading-relaxed">
                    Currently pursuing my studies at <span className="text-white font-medium">Monash University</span>,
                    I spend my time building products that sit at the intersection of
                    <span className="text-indigo-400"> technology</span>,
                    <span className="text-purple-400"> design</span>, and
                    <span className="text-cyan-400"> innovation</span>.
                  </p>

                  <p className="text-lg text-white/70 leading-relaxed">
                    From crafting Web3 prediction markets on Solana to building immersive 3D
                    experiences with Three.js, I love exploring the boundaries of what's
                    possible on the web. Every project is an opportunity to learn something new.
                  </p>

                  <p className="text-lg text-white/70 leading-relaxed">
                    When I'm not coding, you'll find me exploring data visualization,
                    experimenting with generative art, or diving deep into the latest
                    developments in AI and blockchain technology.
                  </p>
                </div>
              </div>

              {/* Quick stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { value: '6+', label: 'Projects Built' },
                  { value: '10+', label: 'Technologies' },
                  { value: '2025', label: 'Graduating' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-display font-bold gradient-text-static">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-white/50">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Values column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-display font-semibold text-white mb-8">
                What Drives Me
              </h3>

              <div className="grid gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    className="group p-6 rounded-2xl glass glass-hover"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                        <value.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-white mb-1">
                          {value.title}
                        </h4>
                        <p className="text-sm text-white/60">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Personal note */}
              <motion.div
                variants={itemVariants}
                className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
              >
                <p className="text-white/70 italic">
                  "I believe great software is like great design — invisible when it works,
                  but profoundly impactful on the user experience."
                </p>
                <p className="mt-3 text-sm text-indigo-400">— My development philosophy</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
