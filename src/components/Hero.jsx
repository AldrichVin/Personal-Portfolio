import { useState, useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useScroll } from '../context/ScrollContext'

const DecorativeBackground = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (svgRef.current) {
        const scrollY = window.scrollY
        svgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.03] parallax-svg"
      viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
    >
      <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#111" strokeWidth="1" />
      <circle cx="72%" cy="40%" r="250" fill="none" stroke="#111" strokeWidth="0.5" />
      <circle cx="30%" cy="80%" r="120" fill="none" stroke="#111" strokeWidth="0.5" />
      <path d="M 900 -50 A 450 450 0 0 1 1350 400" fill="none" stroke="#111" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  )
}

/**
 * WordStagger — renders each word as a span with incremental animation delay
 */
const WordStagger = ({ text, baseDelay = 0, className = '' }) => {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className={`word-stagger ${className}`}
          style={{ animationDelay: `${baseDelay + i * 50}ms` }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </>
  )
}

/**
 * useCountUp — animates a number from 0 to target on scroll into view
 */
const useCountUp = (target, duration = 1500) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animating = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animating.current) {
        animating.current = true
        const start = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 5)
          setCount(Math.round(eased * target))
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            animating.current = false
          }
        }
        requestAnimationFrame(animate)
      } else if (!entry.isIntersecting) {
        setCount(0)
        animating.current = false
      }
    }, { threshold: 0.4 })

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
      <div className="absolute -inset-6 bg-[#E8EDF4]/40 backdrop-blur-sm rounded-2xl -z-20 border border-[#CBD5E1]/30" />
      {/* Hover glass */}
      <div className="absolute -inset-6 bg-[#E8EDF4]/60 backdrop-blur-md rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-[#CBD5E1]/40 shadow-sm" />

      <div className={`flex items-center gap-2 mb-3 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="h-[2px] w-10 bg-[#4f46e5]/40 group-hover:w-16 group-hover:bg-[#4f46e5]/60 transition-all duration-500" />
        <span className="text-label text-neutral-500">{label}</span>
      </div>
      <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-serif-accent text-[#1d1d1f] mb-2" style={{ background: 'linear-gradient(135deg, #1d1d1f 60%, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {displayValue}
      </h4>
      <p className="text-small font-medium text-neutral-700 max-w-[200px]">{sub}</p>
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
  const { scrollTo } = useScroll()

  return (
    <div className="relative w-full">
      {/* ============================================
          SECTION 1: Hero Intro
          ============================================ */}
      <section
        id="hero-section"
        className="relative h-[100dvh] flex flex-col w-full overflow-hidden"
      >
        <DecorativeBackground />

        {/* Subtle radial gradient for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(148, 163, 184, 0.04), transparent)',
          }}
        />

        <main className="relative z-10 flex-1 flex flex-col justify-center container max-w-none pt-24 pb-16">
          <div className="max-w-3xl">
          {/* Overline - Label style */}
          <div className="reveal delay-1 mb-14">
            <div className="inline-flex items-center gap-4 text-label">
              <span className="w-10 h-px bg-[#6366f1]/40" />
              <span>Data Analyst / Data Science Graduate</span>
            </div>
          </div>

          {/* Headline - H1 with word-level stagger */}
          <h1 className="text-display mb-10">
            <span className="block mb-4">
              <WordStagger text="Turning" baseDelay={200} />
              {' '}<span className="word-stagger text-serif-accent text-[#4f46e5]" style={{ animationDelay: '280ms' }}>data</span>
            </span>
            <span className="block text-[#9CA3AF] mb-4">
              <WordStagger text="into actionable" baseDelay={360} />
            </span>
            <span className="block">
              <span className="word-stagger text-serif-accent text-[#4f46e5]" style={{ animationDelay: '520ms' }}>insights</span>
              <span className="word-stagger text-[#94A3B8] text-5xl" style={{ animationDelay: '600ms' }}>.</span>
            </span>
          </h1>

          {/* Subtitle - Body text */}
          <p className="reveal delay-2 text-neutral-600 text-lg leading-relaxed mb-10 max-w-md">
            Leveraging SQL, Python, and visualization tools to uncover
            patterns, drive decisions, and deliver business value through data.
          </p>

          {/* CTA Buttons — Apple pill style */}
          <div className="reveal delay-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollTo('#projects', { duration: 1.2 }) }}
              className="cta-btn inline-flex items-center justify-center py-3
                         bg-[#4f46e5] text-white text-[17px] font-normal rounded-[980px]
                         hover:bg-[#4338ca]"
              style={{ letterSpacing: '-0.022em', paddingLeft: '1.2rem', paddingRight: '1.2rem' }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact', { duration: 1.2 }) }}
              className="cta-btn inline-flex items-center justify-center py-3
                         text-[#4f46e5] text-[17px] font-normal rounded-[980px]
                         border border-[#4f46e5]
                         hover:bg-[#4f46e5] hover:text-white"
              style={{ letterSpacing: '-0.022em', paddingLeft: '1.2rem', paddingRight: '1.2rem' }}
            >
              Get in Touch
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
        className="relative w-full h-[100dvh] flex flex-col items-center pointer-events-none px-6 sm:px-12 md:px-16"
        style={{ justifyContent: 'flex-start', paddingTop: '18vh' }}
      >
        <div className="reveal flex flex-col items-center text-center space-y-6 pointer-events-auto p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto z-20">
          <div className="inline-flex items-center gap-2 text-[#6366f1]">
            <div className="w-2 h-2 rounded-full bg-[#6366f1]" />
            <span className="text-label text-[#6366f1]">What I Do</span>
          </div>
          <h2 className="text-h1 reveal">
            Technical <span className="text-serif-accent text-[#4f46e5]">Expertise</span>
          </h2>
          {/* Animated horizontal rule accent */}
          <div className="hr-grow reveal" />
          <p className="text-lead max-w-md mx-auto reveal delay-1">
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
        className="relative w-full h-[100dvh] flex flex-col items-center justify-center pointer-events-none px-6 sm:px-12 md:px-16"
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
          <div className="w-full h-[20vh] md:h-auto md:flex-1" />

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
