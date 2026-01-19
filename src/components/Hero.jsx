import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

/**
 * Hero Section - Datakeeper-inspired layout
 *
 * Content revolves around the 3D Rubik's cube:
 * 1. Hero intro - content on left, cube on right
 * 2. Details section - centered text, cube below
 * 3. Breakdown section - specs on sides, cube explodes in center
 * 4. Footer section - centered CTA, cubes drop to floor
 */

/**
 * SpecLabel - HUD-style stat display for breakdown section
 */
const SpecLabel = ({ label, value, description, align = 'left' }) => (
  <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} group relative z-10`}>
    {/* Glassmorphism backing */}
    <div className="absolute -inset-4 bg-white/40 backdrop-blur-md rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/40 shadow-sm" />
    <div className="absolute -inset-4 bg-white/30 backdrop-blur-[2px] rounded-2xl -z-20 border border-white/20" />

    <div className={`flex items-center gap-2 mb-2 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="h-[1px] w-8 bg-indigo-500/30 group-hover:w-16 transition-all duration-500" />
      <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">{label}</span>
    </div>
    <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-neutral-900 mb-1">{value}</h4>
    <p className="text-[10px] sm:text-xs font-medium text-neutral-500 max-w-[150px]">{description}</p>
  </div>
)

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* ============================================
          SECTION 1: Hero Intro
          Cube: Right side, rotating
          ============================================ */}
      <section
        id="hero-section"
        className="relative min-h-[100dvh] flex flex-col w-full px-6 sm:px-12 md:px-16 lg:px-24"
      >
        {/* Main content */}
        <main className="flex-1 flex flex-col justify-center max-w-4xl pt-24">
          <div className="reveal delay-1">
            <div className="mb-6 md:mb-8 flex items-center gap-3 text-neutral-900 font-medium text-xs md:text-base">
              <span className="font-bold">→</span>
              <span>full-stack developer</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1.1] md:leading-[0.95] font-medium text-neutral-900 tracking-[-0.03em] mb-8 md:mb-12">
              Building{' '}
              <span className="font-serif italic">digital</span>
              <br />
              <span className="text-neutral-400">products with</span>
              <br />
              clarity<span className="text-indigo-500">.</span>
            </h1>
          </div>

          <div className="reveal delay-2">
            <p className="text-neutral-500 text-sm md:text-lg leading-relaxed mb-10 md:mb-12 max-w-md">
              Turning complex problems into elegant, user-centric solutions
              with React, Next.js, and TypeScript.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 reveal delay-3">
            <a
              href="#projects"
              className="group relative flex items-center justify-between bg-neutral-900 text-white rounded-full pl-6 md:pl-8 pr-2 py-2 h-14 md:h-16 min-w-[200px] hover:bg-neutral-800 transition-all duration-300 shadow-xl"
            >
              <span className="text-sm md:text-base font-medium">View Projects</span>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-neutral-900" />
              </div>
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
        </main>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 reveal delay-5">
          <div className="animate-subtle-bounce">
            <ArrowDown size={20} className="text-neutral-400" strokeWidth={1.5} />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: Details / About Preview
          Cube: Moving to center, still rotating
          ============================================ */}
      <section
        id="details-section"
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-start pt-20 md:pt-32 px-6 sm:px-12 md:px-16"
      >
        <div className="flex flex-col items-center text-center space-y-8 backdrop-blur-sm bg-white/60 md:bg-transparent p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto z-20 shadow-sm md:shadow-none border border-white/50 md:border-none">
          <div className="inline-flex items-center gap-2 text-indigo-500 font-medium uppercase tracking-widest text-xs reveal">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Crafting Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif italic text-neutral-900 leading-tight reveal delay-1">
            <span className="font-sans font-semibold not-italic">Precision</span> meets{' '}
            <span className="block mt-2">creativity.</span>
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto reveal delay-2">
            From data platforms to interactive web applications, I bring
            analytical depth and creative problem-solving to every project.
          </p>
        </div>
        {/* Spacer for cube visibility */}
        <div className="flex-1 w-full min-h-[50vh]" />
      </section>

      {/* ============================================
          SECTION 3: Breakdown / Stats
          Cube: Center, exploding outward
          Content: Stats on left and right sides
          ============================================ */}
      <section
        id="breakdown-section"
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden py-10 px-6 sm:px-12 md:px-16"
      >
        {/* Section header */}
        <div className="absolute top-10 md:top-24 left-0 w-full text-center z-10">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-white/40 blur-xl rounded-full" />
            <h3 className="relative text-2xl md:text-5xl font-serif italic text-neutral-900 mb-2 md:mb-4 reveal">
              Technical Expertise
            </h3>
          </div>
          <div className="inline-block px-3 py-1 rounded-full border border-neutral-200 bg-white/40 backdrop-blur-md reveal delay-1">
            <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-neutral-500">
              Building blocks of innovation
            </span>
          </div>
        </div>

        {/* Stats positioned around the cube */}
        <div className="max-w-[1400px] w-full h-full relative flex flex-col md:flex-row items-center justify-between z-10 mt-20 md:mt-0 mx-auto">
          {/* Mobile: Top Grid */}
          <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-8 w-full mb-8">
            <SpecLabel label="Projects" value="6+" description="End-to-end builds" align="left" />
            <SpecLabel label="Experience" value="3yr" description="Development journey" align="right" />
          </div>

          {/* Desktop: Left Column */}
          <div className="hidden md:flex flex-col gap-24 reveal delay-2">
            <SpecLabel label="Projects" value="6+" description="End-to-end builds" align="left" />
            <SpecLabel label="Experience" value="3yr" description="Development journey" align="left" />
          </div>

          {/* Center area for cube explosion */}
          <div className="w-full h-[40vh] md:h-auto md:flex-1" />

          {/* Mobile: Bottom Grid */}
          <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-8 w-full mt-8">
            <SpecLabel label="Technologies" value="12+" description="Tools mastered" align="left" />
            <SpecLabel label="Education" value="BSc" description="Monash University" align="right" />
          </div>

          {/* Desktop: Right Column */}
          <div className="hidden md:flex flex-col gap-24 text-right reveal delay-3">
            <SpecLabel label="Technologies" value="12+" description="Tools mastered" align="right" />
            <SpecLabel label="Education" value="BSc" description="Monash University" align="right" />
          </div>
        </div>

        {/* Tech stack pills */}
        <div className="absolute bottom-10 md:bottom-16 left-0 w-full text-center">
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto px-6 reveal delay-4">
            {['React', 'TypeScript', 'Next.js', 'Python', 'Node.js', 'PostgreSQL', 'Tailwind', 'Three.js'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full text-sm text-neutral-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: Footer / CTA
          Cube: Dropped to floor, interactive
          ============================================ */}
      <section
        id="footer-section"
        className="relative w-full min-h-[90dvh] flex flex-col items-center justify-center py-20 overflow-hidden px-6 sm:px-12 md:px-16"
      >
        <div className="relative z-20 flex flex-col items-center justify-center w-full text-center">
          <span className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-neutral-400 mb-8 reveal">
            Final Output
          </span>

          <div className="flex flex-col items-center mb-24 md:mb-32 reveal delay-1">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif italic text-neutral-900 leading-none tracking-tight">
              Order from
            </h2>
            <span className="text-4xl sm:text-6xl md:text-8xl font-sans font-bold text-neutral-900 leading-none tracking-tight -mt-2 md:-mt-4">
              Chaos.
            </span>
          </div>

          {/* CTA Button */}
          <div className="relative group cursor-pointer w-full max-w-xs sm:max-w-sm mx-auto z-20 reveal delay-2">
            <div className="relative overflow-hidden rounded-2xl bg-white/20 backdrop-blur-xl border border-white/50 shadow-2xl transition-all duration-300 group-hover:bg-white/30 group-hover:scale-105">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50 group-hover:bg-indigo-500 transition-colors" />
              <a
                href="#contact"
                className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-neutral-900"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                    Start a project
                  </span>
                  <span className="text-xl sm:text-2xl font-semibold tracking-tight">Get in Touch</span>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shadow-lg">
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </div>
              </a>

              {/* Animated lines */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-300 to-transparent group-hover:via-neutral-500 transition-all" />
            </div>

            {/* Sub-label */}
            <div className="absolute -bottom-8 left-0 w-full flex justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <span>Available for work</span>
              <span>Let's build together</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
