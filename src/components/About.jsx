/**
 * About Section - Premium Editorial Design
 *
 * Design improvements:
 * - Better text contrast for readability
 * - Refined spacing and rhythm
 * - Subtle depth on tech tags
 */

const About = () => {
  const techStack = [
    'Python', 'SQL', 'JavaScript', 'Java',
    'Pandas', 'NumPy', 'Power BI', 'Tableau',
    'Firebase', 'MongoDB', 'Git', 'Docker'
  ]

  return (
    <section
      id="about"
      className="section section-border bg-white"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Section Label */}
          <div className="lg:col-span-3">
            <span className="text-label reveal">About</span>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            {/* Lead statement - improved contrast */}
            <p className="text-2xl md:text-3xl font-medium text-neutral-800 leading-snug mb-10 reveal delay-1">
              Computer Science graduate from Monash University who loves
              building products—from data platforms to full-stack web apps.
            </p>

            {/* Body paragraphs - better contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mb-10">
              <p className="text-base text-neutral-600 leading-relaxed reveal delay-2">
                I recently completed my Bachelor of Computer Science at Monash
                with a strong foundation in data science and software engineering.
                Whether it's crafting interactive dashboards in Power BI, building
                Web3 applications, or developing full-stack platforms—I enjoy
                bringing ideas to life through code.
              </p>
              <p className="text-base text-neutral-600 leading-relaxed reveal delay-3">
                My experience spans data warehousing, machine learning pipelines,
                climate analytics visualizations, and mobile apps. I'm drawn to
                projects that combine analytical depth with hands-on product
                development.
              </p>
            </div>

            {/* Tech Stack - refined styling */}
            <div className="reveal delay-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-4">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-medium text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-md hover:border-neutral-300 hover:bg-neutral-100 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
