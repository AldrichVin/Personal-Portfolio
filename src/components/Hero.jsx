import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

/**
 * Hero Section - Datakeeper-inspired layout
 *
 * Multiple scroll sections that revolve around the 3D Rubik's cube:
 * 1. Hero intro (cube on right)
 * 2. Details section (cube moves to center)
 * 3. Stats/Skills section (cube deconstructs)
 * 4. CTA section (cube fades out)
 */

const Hero = () => {
  return (
    <div className="relative">
      {/* ============================================
          SECTION 1: Hero Intro
          Scroll: 0-25% | Cube: Right side, intact
          ============================================ */}
      <section
        id="hero-section"
        className="min-h-[100vh] flex flex-col justify-center relative"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <div className="max-w-xl">
              <div className="reveal delay-1">
                <span className="text-label text-indigo-500 mb-4 block">
                  Full-Stack Developer
                </span>
                <h1 className="text-display mb-6">
                  <span className="block">Building digital</span>
                  <span className="block text-neutral-400">products with</span>
                  <span className="block">clarity & purpose.</span>
                </h1>
              </div>

              <div className="reveal delay-2">
                <p className="text-lead max-w-md mb-8">
                  Turning complex problems into elegant, user-centric solutions
                  with React, Next.js, and TypeScript.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 reveal delay-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  View Projects
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 text-neutral-700 text-sm font-medium rounded-lg hover:border-neutral-400 transition-colors"
                >
                  Get in Touch
                </a>
              </div>

              <div className="flex items-center gap-6 mt-8 reveal delay-4">
                <a href="https://github.com" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:hello@example.com" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Right side - Space for 3D cube */}
            <div className="hidden lg:block h-[500px]" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 reveal delay-5">
          <div className="animate-subtle-bounce">
            <ArrowDown size={20} className="text-neutral-400" strokeWidth={1.5} />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: Details / About Preview
          Scroll: 25-45% | Cube: Moving to center, intact
          ============================================ */}
      <section id="details-section" className="min-h-[80vh] flex items-center justify-center relative py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-label text-indigo-500 mb-6 block reveal">
              Crafting Experiences
            </span>
            <h2 className="text-h1 mb-6 reveal delay-1">
              <span className="italic font-light">Precision</span> meets{' '}
              <span className="italic font-light">creativity</span>
            </h2>
            <p className="text-lead text-neutral-500 reveal delay-2">
              From data platforms to interactive web applications, I bring
              analytical depth and creative problem-solving to every project.
              Each line of code is written with purpose.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: Stats / Skills Grid
          Scroll: 45-85% | Cube: Center, deconstructing
          ============================================ */}
      <section id="breakdown-section" className="min-h-[90vh] flex items-center relative py-24">
        <div className="container">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-label text-indigo-500 mb-4 block reveal">
              Technical Expertise
            </span>
            <h2 className="text-h1 reveal delay-1">
              Building blocks of innovation
            </h2>
          </div>

          {/* Stats grid - arranged around center (where cube is) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Left stats */}
            <div className="lg:col-span-1 space-y-6">
              <StatCard
                label="Projects"
                value="6+"
                description="End-to-end builds"
                delay={1}
              />
              <StatCard
                label="Experience"
                value="3yr"
                description="Development journey"
                delay={2}
              />
            </div>

            {/* Center space for cube */}
            <div className="hidden lg:flex lg:col-span-2 items-center justify-center min-h-[300px]">
              {/* Cube animates here */}
            </div>

            {/* Right stats */}
            <div className="lg:col-span-1 space-y-6">
              <StatCard
                label="Technologies"
                value="12+"
                description="Tools mastered"
                delay={3}
              />
              <StatCard
                label="Education"
                value="BSc"
                description="Monash University"
                delay={4}
              />
            </div>
          </div>

          {/* Tech stack pills */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto reveal delay-5">
              {['React', 'TypeScript', 'Next.js', 'Python', 'Node.js', 'PostgreSQL', 'Tailwind', 'Three.js'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: CTA
          Scroll: 85-100% | Cube: Fading out
          ============================================ */}
      <section id="footer-section" className="min-h-[60vh] flex items-center justify-center relative py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-display mb-6 reveal">
              <span className="italic font-light">Order</span> from{' '}
              <span className="italic font-light">Chaos</span>
            </h2>
            <p className="text-lead text-neutral-500 mb-8 reveal delay-1">
              Ready to transform your ideas into reality?
              Let's build something extraordinary together.
            </p>
            <div className="reveal delay-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
              >
                Start a Conversation
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * StatCard - Individual stat display
 */
const StatCard = ({ label, value, description, delay }) => (
  <div className={`p-6 bg-white border border-neutral-100 rounded-2xl reveal delay-${delay}`}>
    <span className="text-label text-neutral-400 block mb-2">{label}</span>
    <span className="text-4xl font-semibold text-neutral-900 block mb-1">{value}</span>
    <span className="text-sm text-neutral-500">{description}</span>
  </div>
)

export default Hero
