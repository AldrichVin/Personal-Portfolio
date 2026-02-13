import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

/**
 * Hero Section - Data Analytics Portfolio
 *
 * Typography System:
 * - H1: text-[2.5rem] to text-[4.5rem], font-semibold
 * - H2: text-2xl to text-4xl, font-semibold
 * - H3: text-xl, font-semibold
 * - Body: text-base/text-lg, text-neutral-600
 * - Label: text-xs, uppercase, tracking-widest
 */

const StatCard = ({ value, label }) => (
  <div className="flex flex-col items-start">
    <span className="font-mono text-4xl md:text-5xl font-medium text-neutral-900 tracking-tight leading-none mb-3">
      {value}
    </span>
    <span className="text-label">
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
      >
        {/* Subtle radial gradient for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99, 102, 241, 0.04), transparent)',
          }}
        />

        <main className="relative z-10 flex-1 flex flex-col justify-center container max-w-none pt-32 pb-20">
          <div className="max-w-2xl">
          {/* Overline - Label style */}
          <div className="reveal delay-1 mb-14">
            <div className="inline-flex items-center gap-4 text-label">
              <span className="w-10 h-px bg-neutral-300" />
              <span>Data Analyst / Data Science Graduate</span>
            </div>
          </div>

          {/* Headline - H1 */}
          <h1 className="reveal delay-1 text-display mb-16">
            <span className="block mb-4">
              Turning <span className="text-serif-accent text-neutral-700">data</span>
            </span>
            <span className="block text-neutral-400 mb-4">into actionable</span>
            <span className="block">
              insights<span className="text-indigo-500">.</span>
            </span>
          </h1>

          {/* Subtitle - Body text */}
          <p className="reveal delay-2 text-neutral-600 text-lg leading-relaxed mb-16 max-w-md">
            Leveraging SQL, Python, and visualization tools to uncover
            patterns, drive decisions, and deliver business value through data.
          </p>

          {/* CTA Buttons */}
          <div className="reveal delay-3 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Primary CTA */}
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
          <div className="reveal delay-4 flex items-center gap-1 mt-16">
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
          SECTION 2: Stats
          ============================================ */}
      <section
        id="breakdown-section"
        className="relative w-full min-h-[70dvh] flex flex-col items-center justify-center py-20 px-6 sm:px-12 md:px-16"
      >
        {/* Section header with merged tagline */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 text-indigo-500 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-label !text-indigo-500">What I Do</span>
          </div>
          <h2 className="reveal delay-1 text-h1 mb-4">
            Technical <span className="text-serif-accent">Background</span>
          </h2>
          <p className="reveal delay-1 text-neutral-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            From exploratory data analysis to interactive dashboards,
            I transform raw data into clear, actionable business intelligence.
          </p>
        </div>

        {/* Stats grid */}
        <div className="reveal delay-2 w-full max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            <StatCard value="6+" label="Projects" />
            <StatCard value="3yr" label="Experience" />
            <StatCard value="10+" label="Tools" />
            <StatCard value="BSc" label="Comp Sci" />
          </div>
        </div>

        <div className="w-full h-[10vh] md:h-[15vh]" />
      </section>
    </div>
  )
}

export default Hero
