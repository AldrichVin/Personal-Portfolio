import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

/**
 * Hero Section - Data Analytics Portfolio
 *
 * Focused on:
 * - Data analysis and business insights
 * - Clean, professional aesthetic
 * - Recruiter-readable content
 */

const StatCard = ({ value, label }) => (
  <div className="flex flex-col items-start">
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
            background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99, 102, 241, 0.04), transparent)',
          }}
        />

        <main className="relative z-10 flex-1 flex flex-col justify-center max-w-2xl pt-32 pb-20">
          {/* Overline */}
          <div className="reveal delay-1 mb-10">
            <div className="inline-flex items-center gap-4 text-neutral-500 font-medium text-sm tracking-widest uppercase">
              <span className="w-10 h-px bg-neutral-300" />
              <span>Data Analyst / Data Science Graduate</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="reveal delay-1 text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] leading-[1.1] font-semibold text-neutral-900 tracking-[-0.03em] mb-12">
            <span className="block mb-2">
              Turning <span className="font-serif italic font-normal text-neutral-700">data</span>
            </span>
            <span className="block text-neutral-400 mb-2">into actionable</span>
            <span className="block">
              insights<span className="text-indigo-500">.</span>
            </span>
          </h1>

          {/* Subtitle - Data focused */}
          <p className="reveal delay-2 text-neutral-600 text-lg leading-relaxed mb-12 max-w-md">
            Leveraging SQL, Python, and visualization tools to uncover
            patterns, drive decisions, and deliver business value through data.
          </p>

          {/* CTA Buttons */}
          <div className="reveal delay-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Primary CTA - Analytics Projects */}
            <a
              href="#projects"
              className="group inline-flex items-center bg-neutral-900 text-white rounded-full
                         shadow-[0_2px_12px_-2px_rgba(0,0,0,0.12)]
                         hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.18)]
                         hover:translate-y-[-2px]
                         transition-all duration-300 ease-out"
              style={{ paddingLeft: '24px', paddingRight: '6px', paddingTop: '6px', paddingBottom: '6px' }}
            >
              <span className="text-[15px] font-medium mr-4">View Analytics Projects</span>
              <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center
                              group-hover:bg-white/20 transition-all duration-300">
                <ArrowUpRight size={18} strokeWidth={2} />
              </div>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5
                         text-neutral-600 text-[15px] font-medium rounded-full
                         border border-neutral-200
                         hover:border-neutral-300 hover:bg-neutral-50
                         transition-all duration-300 ease-out"
            >
              Get in Touch
            </a>
          </div>

          {/* Social links */}
          <div className="reveal delay-4 flex items-center gap-1 mt-14">
            <a
              href="https://github.com/AldrichVin"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 text-neutral-400 hover:text-neutral-900 transition-colors duration-300"
              aria-label="GitHub"
            >
              <span className="absolute inset-0 rounded-full bg-neutral-100 scale-0
                               group-hover:scale-100 transition-transform duration-300 ease-out" />
              <Github size={20} strokeWidth={1.5} className="relative z-10" />
            </a>
            <a
              href="https://linkedin.com/in/aldrich-vincent-4463b2355"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 text-neutral-400 hover:text-neutral-900 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <span className="absolute inset-0 rounded-full bg-neutral-100 scale-0
                               group-hover:scale-100 transition-transform duration-300 ease-out" />
              <Linkedin size={20} strokeWidth={1.5} className="relative z-10" />
            </a>
            <a
              href="mailto:aldrichvin040205@gmail.com"
              className="group relative p-3 text-neutral-400 hover:text-neutral-900 transition-colors duration-300"
              aria-label="Email"
            >
              <span className="absolute inset-0 rounded-full bg-neutral-100 scale-0
                               group-hover:scale-100 transition-transform duration-300 ease-out" />
              <Mail size={20} strokeWidth={1.5} className="relative z-10" />
            </a>
          </div>
        </main>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 reveal delay-5">
          <div className="animate-subtle-bounce opacity-40">
            <ArrowDown size={20} className="text-neutral-400" strokeWidth={1.5} />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: Details
          ============================================ */}
      <section
        id="details-section"
        className="relative w-full min-h-[85dvh] flex flex-col items-center justify-center py-24 px-6 sm:px-12 md:px-16"
      >
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          {/* Label */}
          <div className="reveal inline-flex items-center gap-2 text-indigo-500 font-medium uppercase tracking-widest text-xs mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>What I Do</span>
          </div>

          {/* Headline */}
          <h2 className="reveal delay-1 text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 leading-tight tracking-tight mb-6">
            <span className="font-serif italic font-normal">Analysis</span> meets{' '}
            <span className="font-serif italic font-normal">insight</span>
          </h2>

          {/* Description */}
          <p className="reveal delay-2 text-neutral-500 text-base sm:text-lg leading-relaxed max-w-md">
            From exploratory data analysis to interactive dashboards,
            I transform raw data into clear, actionable business intelligence.
          </p>
        </div>

        <div className="flex-1 w-full min-h-[25vh]" />
      </section>

      {/* ============================================
          SECTION 3: Stats
          ============================================ */}
      <section
        id="breakdown-section"
        className="relative w-full min-h-[75dvh] flex flex-col items-center justify-center py-20 px-6 sm:px-12 md:px-16"
      >
        {/* Section header */}
        <div className="text-center mb-14">
          <h3 className="reveal text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight mb-3">
            Technical <span className="font-serif italic font-normal">Background</span>
          </h3>
          <p className="reveal delay-1 text-sm font-medium text-neutral-400 uppercase tracking-widest">
            Education & Experience
          </p>
        </div>

        {/* Stats grid */}
        <div className="reveal delay-2 w-full max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <StatCard value="6+" label="Projects" />
            <StatCard value="3yr" label="Experience" />
            <StatCard value="10+" label="Tools" />
            <StatCard value="BSc" label="Comp Sci" />
          </div>
        </div>

        <div className="w-full h-[20vh] md:h-[25vh]" />
      </section>

      {/* ============================================
          SECTION 4: Footer CTA
          ============================================ */}
      <section
        id="footer-section"
        className="relative w-full min-h-[65dvh] flex flex-col items-center justify-center py-16 px-6 sm:px-12 md:px-16"
      >
        <div className="relative z-20 flex flex-col items-center text-center max-w-lg">
          {/* Label */}
          <span className="reveal text-xs font-medium text-neutral-400 uppercase tracking-[0.2em] mb-6">
            Open to opportunities
          </span>

          {/* Headline */}
          <h2 className="reveal delay-1 text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 leading-[1.15] tracking-tight mb-5">
            Let's turn your{' '}
            <span className="font-serif italic font-normal">data</span>
            <br />into decisions
          </h2>

          {/* Subtext */}
          <p className="reveal delay-2 text-neutral-500 text-base mb-10 max-w-sm">
            Looking for data analyst roles where I can drive impact through insights.
          </p>

          {/* CTA Button */}
          <div className="reveal delay-3">
            <a
              href="#contact"
              className="group inline-flex items-center bg-neutral-900 text-white rounded-full
                         shadow-[0_2px_12px_-2px_rgba(0,0,0,0.12)]
                         hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.18)]
                         hover:translate-y-[-2px]
                         transition-all duration-300 ease-out"
              style={{ paddingLeft: '24px', paddingRight: '6px', paddingTop: '6px', paddingBottom: '6px' }}
            >
              <span className="text-[15px] font-medium mr-4">Start a Conversation</span>
              <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center
                              group-hover:bg-white/20 transition-all duration-300">
                <ArrowUpRight size={18} strokeWidth={2} />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
