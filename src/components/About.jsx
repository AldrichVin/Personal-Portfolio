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
      description: 'Every pixel matters. UX drives every decision',
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Exploring cutting-edge tech from Web3 to 3D',
    },
    {
      icon: Sparkles,
      title: 'Detail-Oriented',
      description: 'The magic is in the micro-interactions',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section
      ref={sectionRef}
      id="about"
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
              About Me
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Building Digital Experiences
            </h2>
          </motion.div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Story column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm a <span className="text-gray-900 font-medium">full-stack developer and creative engineer</span> based
                in Melbourne, Australia. My journey in tech started with a fascination for how
                digital products can shape human experiences.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Currently pursuing my studies at <span className="text-gray-900 font-medium">Monash University</span>,
                I spend my time building products that sit at the intersection of
                technology, design, and innovation.
              </p>

              <p className="text-gray-600 leading-relaxed">
                From crafting Web3 prediction markets on Solana to building immersive
                data visualizations, I love exploring the boundaries of what's
                possible on the web. Every project is an opportunity to learn.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                {[
                  { value: '6+', label: 'Projects Built' },
                  { value: '10+', label: 'Technologies' },
                  { value: '2025', label: 'Graduating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Values column */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-6">
                What Drives Me
              </h3>

              <div className="grid gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="group p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <value.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {value.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-gray-600 italic">
                  "Great software is like great design — invisible when it works,
                  but profoundly impactful on the user experience."
                </p>
                <p className="mt-3 text-sm text-gray-400">— My development philosophy</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
