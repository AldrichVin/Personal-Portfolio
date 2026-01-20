import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

/**
 * Hero Section - High-End Portfolio Standard
 *
 * Premium design showcase with:
 * - Refined typography hierarchy
 * - Polished CTA interactions
 * - Subtle visual depth
 * - Tasteful micro-interactions
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
        className="relative min-h-[100dvh] flex flex-col w-full overflow-hidden"
        style={{ paddingLeft: '200px', paddingRight: '24px' }}
      >
        {/* Subtle radial gradient for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.05), transparent)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(99, 102, 241, 0.03), transparent)',
          }}
        />

        <main className="relative z-10 flex-1 flex flex-col justify-center max-w-3xl pt-32 pb-20">
          {/* Overline */}
          <div className="reveal delay-1 mb-10">
            <div className="inline-flex items-center gap-4 text-neutral-500 font-medium text-sm tracking-widest uppercase">
              <span className="w-10 h-px bg-neutral-300" />
              <span>Full-Stack Developer</span>
            </div>
          </div>

          {/* Headline - Refined typography hierarchy */}
          <h1 className="reveal delay-1 text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] font-semibold text-neutral-900 tracking-[-0.03em] mb-12">
            <span className="block mb-2">Building{' '}
              <span className="font-serif italic font-normal text-neutral-800">digital</span>
            </span>
            <span className="block text-neutral-400 mb-2">products with</span>
            <span className="block">
              clarity<span className="text-indigo-500">.</span>
            </span>
          </h1>

          {/* Subtitle - Increased separation */}
          <p className="reveal delay-2 text-neutral-500 text-lg md:text-xl leading-relaxed mb-12 max-w-md font-normal">
            Turning complex problems into elegant, user-centric solutions
            with modern web technologies.
          </p>

          {/* CTA Buttons - Polished with refined hover states */}
          <div className="reveal delay-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
            {/* Primary CTA - Shadow bloom, gentle scale */}
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-4 bg-neutral-900 text-white rounded-full py-4
                         shadow-[0_2px_20px_-4px_rgba(0,0,0,0.2)]
                         hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.3)]
                         hover:scale-[1.02]
                         transition-all duration-300 ease-out"
              style={{ paddingLeft: '32px', paddingRight: '18px' }}
            >
              <span className="text-[15px] font-medium tracking-wide">View Projects</span>
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center
                              group-hover:bg-white/20 transition-all duration-300">
                <ArrowUpRight
                  className="w-[18px] h-[18px] transition-transform duration-300 ease-out
                             group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </div>
            </a>

            {/* Secondary CTA - Subtle border animation */}
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4
                         text-neutral-600 text-[15px] font-medium tracking-wide rounded-full
                         border border-neutral-200
                         hover:border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50/50
                         transition-all duration-300 ease-out"
            >
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Social links - Enhanced with micro-interactions */}
          <div className="reveal delay-4 flex items-center gap-2 mt-14">
            <a
              href="https://github.com"
              className="group relative p-3 text-neutral-400 hover:text-neutral-900
                         transition-all duration-300 ease-out"
              aria-label="GitHub"
            >
              <span className="absolute inset-0 rounded-full bg-neutral-100 scale-0
                               group-hover:scale-100 transition-transform duration-300 ease-out" />
              <Github size={22} strokeWidth={1.5} className="relative z-10" />
            </a>
            <a
              href="https://linkedin.com"
              className="group relative p-3 text-neutral-400 hover:text-neutral-900
                         transition-all duration-300 ease-out"
              aria-label="LinkedIn"
            >
              <span className="absolute inset-0 rounded-full bg-neutral-100 scale-0
                               group-hover:scale-100 transition-transform duration-300 ease-out" />
              <Linkedin size={22} strokeWidth={1.5} className="relative z-10" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="group relative p-3 text-neutral-400 hover:text-neutral-900
                         transition-all duration-300 ease-out"
              aria-label="Email"
            >
              <span className="absolute inset-0 rounded-full bg-neutral-100 scale-0
                               group-hover:scale-100 transition-transform duration-300 ease-out" />
              <Mail size={22} strokeWidth={1.5} className="relative z-10" />
            </a>
          </div>
        </main>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 reveal delay-5">
          <div className="animate-subtle-bounce opacity-40 hover:opacity-70 transition-opacity duration-300">
            <ArrowDown size={20} className="text-neutral-400" strokeWidth={1.5} />
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
            <span className="font-serif italic font-normal">Precision</span> meets{' '}
            <span className="font-serif italic font-normal">creativity</span>
          </h2>

          {/* Description */}
          <p className="reveal delay-2 text-neutral-500 text-base sm:text-lg leading-relaxed max-w-md">
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
        className="relative w-full min-h-[80dvh] flex flex-col items-center justify-center py-20 px-6 sm:px-12 md:px-16"
      >
        {/* Section header */}
        <div className="text-center mb-16">
          <h3 className="reveal text-2xl md:text-4xl font-semibold text-neutral-900 tracking-tight mb-3">
            Technical <span className="font-serif italic font-normal">Expertise</span>
          </h3>
          <p className="reveal delay-1 text-sm font-medium text-neutral-400 uppercase tracking-widest">
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
            <span className="font-serif italic font-normal">Order</span> from{' '}
            <span className="font-serif italic font-normal">Chaos</span>
          </h2>

          {/* Subtext */}
          <p className="reveal delay-2 text-neutral-500 text-lg mb-12 max-w-sm">
            Let's build something extraordinary together.
          </p>

          {/* CTA Button - Matching primary style */}
          <div className="reveal delay-3">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-4 bg-neutral-900 text-white rounded-full py-4
                         shadow-[0_2px_20px_-4px_rgba(0,0,0,0.2)]
                         hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.3)]
                         hover:scale-[1.02]
                         transition-all duration-300 ease-out"
              style={{ paddingLeft: '32px', paddingRight: '18px' }}
            >
              <span className="text-[15px] font-medium tracking-wide">Start a Conversation</span>
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center
                              group-hover:bg-white/20 transition-all duration-300">
                <ArrowUpRight
                  className="w-[18px] h-[18px] transition-transform duration-300 ease-out
                             group-hover:rotate-45"
                  strokeWidth={2}
                />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
