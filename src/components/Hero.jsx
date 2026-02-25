import { useState, useEffect, useRef } from 'react'
import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

const DecorativeBackground = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.03]"
       viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
    <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#111" strokeWidth="1" />
    <circle cx="72%" cy="40%" r="250" fill="none" stroke="#111" strokeWidth="0.5" />
    <circle cx="30%" cy="80%" r="120" fill="none" stroke="#111" strokeWidth="0.5" />
    <path d="M 900 -50 A 450 450 0 0 1 1350 400" fill="none" stroke="#111" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
)

/**
 * useCountUp — animates a number from 0 to target on scroll into view
 */
const useCountUp = (target, duration = 1500) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
        observer.disconnect()
      }
    }, { threshold: 0.1 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

/**
 * SpecLabel — DataKeeper-style HUD stat label with glass backing
 */
const SpecLabel = ({ label, numericValue, suffix = '', staticValue, sub, align = 'left' }) => {
  const { count, ref } = useCountUp(numericValue || 0, 1500)
  const displayValue = staticValue || `${count}${suffix}`

  return (
    <div
      ref={ref}
      className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} group relative z-10`}
    >
      {/* Soft glass backing (always visible) */}
      <div className="absolute -inset-4 bg-[#E8EDF4]/40 backdrop-blur-sm rounded-2xl -z-20 border border-[#CBD5E1]/30" />
      {/* Hover glass */}
      <div className="absolute -inset-4 bg-[#E8EDF4]/60 backdrop-blur-md rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-[#CBD5E1]/40 shadow-sm" />

      <div className={`flex items-center gap-2 mb-2 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="h-[1px] w-8 bg-neutral-900/30 group-hover:w-16 transition-all duration-500" />
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">{label}</span>
      </div>
      <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-neutral-900 mb-1">
        {displayValue}
      </h4>
      <p className="text-[10px] sm:text-xs font-medium text-neutral-900/60 max-w-[150px]">{sub}</p>
    </div>
  )
}

/**
 * SVG connector lines — thin dashed lines from stats toward center (desktop only)
 */
const ConnectorLines = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block opacity-[0.06]"
       viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid meet">
    {/* Left connectors */}
    <line x1="180" y1="120" x2="550" y2="200" stroke="#111" strokeWidth="1" strokeDasharray="6 4" />
    <line x1="180" y1="380" x2="550" y2="300" stroke="#111" strokeWidth="1" strokeDasharray="6 4" />
    {/* Right connectors */}
    <line x1="1220" y1="120" x2="850" y2="200" stroke="#111" strokeWidth="1" strokeDasharray="6 4" />
    <line x1="1220" y1="380" x2="850" y2="300" stroke="#111" strokeWidth="1" strokeDasharray="6 4" />
    {/* Center crosshair */}
    <circle cx="700" cy="250" r="40" fill="none" stroke="#111" strokeWidth="0.5" />
    <line x1="660" y1="250" x2="740" y2="250" stroke="#111" strokeWidth="0.5" />
    <line x1="700" y1="210" x2="700" y2="290" stroke="#111" strokeWidth="0.5" />
  </svg>
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
        <DecorativeBackground />

        {/* Subtle radial gradient for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(148, 163, 184, 0.04), transparent)',
          }}
        />

        <main className="relative z-10 flex-1 flex flex-col justify-center container max-w-none pt-32 pb-20">
          <div className="max-w-3xl">
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
              Turning <span className="text-serif-accent text-[#111111]">data</span>
            </span>
            <span className="block text-[#9CA3AF] mb-4">into actionable</span>
            <span className="block">
              <span className="text-serif-accent text-[#111111]">insights</span><span className="text-[#94A3B8]">.</span>
            </span>
          </h1>

          {/* Subtitle - Body text */}
          <p className="reveal delay-2 text-neutral-600 text-lg leading-relaxed mb-16 max-w-md">
            Leveraging SQL, Python, and visualization tools to uncover
            patterns, drive decisions, and deliver business value through data.
          </p>

          {/* CTA Buttons */}
          <div className="reveal delay-3 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Primary CTA — DataKeeper rounded pill */}
            <a
              href="#projects"
              className="group inline-flex items-center bg-black text-white rounded-full
                         shadow-[0_2px_12px_-2px_rgba(0,0,0,0.12)]
                         hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.18)]
                         hover:translate-y-[-2px]
                         transition-all duration-300 ease-out"
              style={{ paddingLeft: '24px', paddingRight: '6px', paddingTop: '6px', paddingBottom: '6px' }}
            >
              <span className="text-[15px] font-medium mr-4">View Analytics Projects</span>
              <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center
                              group-hover:bg-white/25 transition-all duration-300">
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
          SECTION 2: Details — Heading with glass card
          Cube idles through this section
          ============================================ */}
      <section
        id="details-section"
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pointer-events-none px-6 sm:px-12 md:px-16"
      >
        {/* Header block with glass backing */}
        <div className="reveal flex flex-col items-center text-center space-y-6 pointer-events-auto backdrop-blur-sm bg-[#F3F6FB]/60 md:bg-transparent p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto z-20 shadow-sm md:shadow-none border border-[#CBD5E1]/40 md:border-none">
          <div className="inline-flex items-center gap-2 text-[#94A3B8] font-medium uppercase tracking-widest text-xs">
            <div className="w-2 h-2 rounded-full bg-[#94A3B8]" />
            <span>What I Do</span>
          </div>
          <h2 className="text-h1">
            Technical <span className="text-serif-accent">Background</span>
          </h2>
          <p className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            From exploratory data analysis to interactive dashboards,
            I transform raw data into clear, actionable business intelligence.
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 3: Breakdown — Stats flanking cube explosion
          ============================================ */}
      <section
        id="breakdown-section"
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pointer-events-none px-6 sm:px-12 md:px-16 pb-20"
      >
        {/* Stats flanking layout with connector lines */}
        <div className="max-w-[1400px] w-full relative flex flex-col md:flex-row items-center justify-between z-10 pointer-events-auto">
          <ConnectorLines />

          {/* Mobile: 2x2 grid */}
          <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-8 w-full mb-8">
            <SpecLabel label="Projects" numericValue={6} suffix="+" sub="End-to-end analytics." align="left" />
            <SpecLabel label="Experience" numericValue={3} suffix="yr" sub="Industry experience." align="right" />
            <SpecLabel label="Tools" numericValue={10} suffix="+" sub="Languages & platforms." align="left" />
            <SpecLabel label="Education" staticValue="BSc" sub="Computer Science." align="right" />
          </div>

          {/* Desktop: Left column */}
          <div className="hidden md:flex flex-col gap-20">
            <SpecLabel label="Projects" numericValue={6} suffix="+" sub="End-to-end data analytics." align="left" />
            <SpecLabel label="Experience" numericValue={3} suffix="yr" sub="Industry & internship." align="left" />
          </div>

          {/* Center reserved for 3D explosion */}
          <div className="w-full h-[40vh] md:h-auto md:flex-1" />

          {/* Desktop: Right column */}
          <div className="hidden md:flex flex-col gap-20 text-right">
            <SpecLabel label="Tools" numericValue={10} suffix="+" sub="Languages & platforms." align="right" />
            <SpecLabel label="Education" staticValue="BSc" sub="Computer Science, Monash." align="right" />
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="w-full h-[10vh]" />
      </section>
    </div>
  )
}

export default Hero
