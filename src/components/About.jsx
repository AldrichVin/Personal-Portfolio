/**
 * About Section - Refined Scrollytelling
 *
 * Design: Tighter spacing, improved text rhythm
 * Cleaner grid with proper content density
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
            {/* Lead statement */}
            <p className="text-h1 font-normal leading-snug mb-8 reveal delay-1">
              Computer Science graduate from Monash University who loves
              building products—from data platforms to full-stack web apps.
            </p>

            {/* Body paragraphs - tighter rhythm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mb-8">
              <p className="text-body reveal delay-2">
                I recently completed my Bachelor of Computer Science at Monash
                with a strong foundation in data science and software engineering.
                Whether it's crafting interactive dashboards in Power BI, building
                Web3 applications, or developing full-stack platforms—I enjoy
                bringing ideas to life through code.
              </p>
              <p className="text-body reveal delay-3">
                My experience spans data warehousing, machine learning pipelines,
                climate analytics visualizations, and mobile apps. I'm drawn to
                projects that combine analytical depth with hands-on product
                development.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="reveal delay-4">
              <span className="text-label block mb-3">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
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
