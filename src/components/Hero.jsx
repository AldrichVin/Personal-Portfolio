import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

/**
 * Hero Section - Premium Editorial Design
 *
 * Visual hierarchy:
 * - Clear primary/secondary CTA distinction
 * - Stats with consistent alignment and weight
 * - Reduced visual competition with 3D elements
 */

/**
 * StatCard - Unified stat display with consistent hierarchy
 */
const StatCard = ({ value, label, align = 'left' }) => (
  <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start'}`}>
    <span className="text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight leading-none mb-2">
      {value}
    </span>
    <span className="text-sm font-medium text-neutral-500 tracking-wide uppercase">
      {label}
    </span>
  </div>
)

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* ============================================
          SECTION 1: Hero Intro
          ============================================ */}
      <section
        id="hero-section"
        className="relative min-h-[100dvh] flex flex-col w-full px-6 sm:px-12 md:px-16 lg:px-24"
      >
        <main className="flex-1 flex flex-col justify-center max-w-3xl pt-28 pb-16 ml-4 sm:ml-8 md:ml-16 lg:ml-24">
          {/* Overline */}
          <div className="reveal delay-1 mb-8">
            <div className="inline-flex items-center gap-3 text-neutral-600 font-medium text-sm tracking-wide">
              <span className="w-8 h-px bg-neutral-400" />
              <span>Full-Stack Developer</span>
            </div>
          </div>

          {/* Headline - Increased contrast for secondary text */}
          <h1 className="reveal delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] font-semibold text-neutral-900 tracking-[-0.02em] mb-8">
            Building{' '}
            <span className="font-serif italic font-medium">digital</span>
            <br />
            <span className="text-neutral-500">products with</span>
            <br />
            clarity<span className="text-indigo-500">.</span>
          </h1>

          {/* Lead text - Better contrast */}
          <p className="reveal delay-2 text-neutral-600 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Turning complex problems into elegant, user-centric solutions
            with modern web technologies.
          </p>

          {/* CTA Buttons - Fixed alignment, clear hierarchy */}
          <div className="reveal delay-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-3 bg-neutral-900 text-white rounded-full px-7 h-14 hover:bg-neutral-800 transition-all duration-200 shadow-lg shadow-neutral-900/10"
            >
              <span className="text-[15px] font-medium leading-none">View Projects</span>
              <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 h-14 border border-neutral-300 text-neutral-700 text-[15px] font-medium rounded-full hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>

          {/* Social links */}
          <div className="reveal delay-4 flex items-center gap-5 mt-10">
            <a href="https://github.com" className="text-neutral-400 hover:text-neutral-700 transition-colors p-1">
              <Github size={20} strokeWidth={1.5} />
            </a>
            <a href="https://linkedin.com" className="text-neutral-400 hover:text-neutral-700 transition-colors p-1">
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a href="mailto:hello@example.com" className="text-neutral-400 hover:text-neutral-700 transition-colors p-1">
              <Mail size={20} strokeWidth={1.5} />
            </a>
          </div>
        </main>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 reveal delay-5">
          <div className="animate-subtle-bounce opacity-50">
            <ArrowDown size={18} className="text-neutral-400" strokeWidth={1.5} />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: Details
          ============================================ */}
      <section
        id="details-section"
        className="relative w-full min-h-[90dvh] flex flex-col items-center justify-center py-24 px-6 sm:px-12 md:px-16"
      >
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Label */}
          <div className="reveal inline-flex items-center gap-2 text-indigo-500 font-medium uppercase tracking-widest text-xs mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>Crafting Experiences</span>
          </div>

          {/* Headline */}
          <h2 className="reveal delay-1 text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 leading-tight tracking-tight mb-6">
            <span className="font-serif italic font-medium">Precision</span> meets{' '}
            <span className="font-serif italic font-medium">creativity</span>
          </h2>

          {/* Description - Better contrast */}
          <p className="reveal delay-2 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-md">
            From data platforms to interactive applications, I bring
            analytical depth and creative problem-solving to every project.
          </p>
        </div>

        {/* Spacer for cube */}
        <div className="flex-1 w-full min-h-[30vh]" />
      </section>

      {/* ============================================
          SECTION 3: Stats / Breakdown
          ============================================ */}
      <section
        id="breakdown-section"
        className="relative w-full min-h-[90dvh] flex flex-col items-center justify-center py-20 px-6 sm:px-12 md:px-16"
      >
        {/* Section header */}
        <div className="text-center mb-16">
          <h3 className="reveal text-2xl md:text-4xl font-semibold text-neutral-900 tracking-tight mb-3">
            Technical <span className="font-serif italic font-medium">Expertise</span>
          </h3>
          <p className="reveal delay-1 text-sm font-medium text-neutral-500 uppercase tracking-widest">
            Building blocks of innovation
          </p>
        </div>

        {/* Stats grid - Unified system */}
        <div className="reveal delay-2 w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCard value="6+" label="Projects" />
            <StatCard value="3yr" label="Experience" />
            <StatCard value="12+" label="Technologies" />
            <StatCard value="BSc" label="Education" />
          </div>
        </div>

        {/* Center space for cube */}
        <div className="w-full h-[25vh] md:h-[30vh]" />

        {/* Tech stack */}
        <div className="reveal delay-3 w-full max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2.5">
            {['React', 'TypeScript', 'Next.js', 'Python', 'Node.js', 'PostgreSQL', 'Tailwind', 'Three.js'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-600 hover:border-neutral-300 hover:text-neutral-800 transition-colors shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: Footer CTA
          ============================================ */}
      <section
        id="footer-section"
        className="relative w-full min-h-[70dvh] flex flex-col items-center justify-center py-16 px-6 sm:px-12 md:px-16"
      >
        <div className="relative z-20 flex flex-col items-center text-center max-w-xl">
          {/* Label */}
          <span className="reveal text-xs font-medium text-neutral-400 uppercase tracking-[0.2em] mb-6">
            Ready to collaborate
          </span>

          {/* Headline */}
          <h2 className="reveal delay-1 text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-4">
            <span className="font-serif italic font-medium">Order</span> from{' '}
            <span className="font-serif italic font-medium">Chaos</span>
          </h2>

          {/* Subtext */}
          <p className="reveal delay-2 text-neutral-600 text-lg mb-10 max-w-sm">
            Let's build something extraordinary together.
          </p>

          {/* CTA Button - Fixed alignment */}
          <div className="reveal delay-3">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-neutral-900 text-white rounded-full px-8 h-14 hover:bg-neutral-800 transition-all duration-200 shadow-lg shadow-neutral-900/10"
            >
              <span className="text-[15px] font-medium leading-none">Start a Conversation</span>
              <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
