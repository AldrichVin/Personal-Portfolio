/**
 * About Section - Data Analytics Focus
 *
 * Typography System (consistent with Hero):
 * - H2: text-2xl md:text-3xl, font-semibold
 * - Body: text-base, text-neutral-600, leading-relaxed
 * - Label: text-xs, font-semibold, uppercase, tracking-widest
 */

const About = () => {
  const techStack = [
    'Python', 'SQL', 'R', 'Pandas',
    'NumPy', 'Power BI', 'Tableau',
    'PostgreSQL', 'MongoDB', 'Git'
  ]

  return (
    <section
      id="about"
      className="section section-border bg-white"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Section Label */}
          <div className="lg:col-span-3">
            <span className="text-label reveal">About</span>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            {/* Lead statement - H2 style */}
            <p className="text-2xl md:text-3xl font-semibold text-neutral-800 leading-snug mb-14 reveal delay-1 max-w-2xl">
              Computer Science graduate from Monash University with a passion
              for turning raw data into meaningful business insights.
            </p>

            {/* Body paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-2xl mb-14">
              <p className="text-base text-neutral-600 leading-relaxed reveal delay-2">
                I specialize in data analysis, building ETL pipelines, and creating
                interactive dashboards that help stakeholders make informed decisions.
                My toolkit includes SQL, Python, and visualization platforms like
                Power BI and Tableau.
              </p>
              <p className="text-base text-neutral-600 leading-relaxed reveal delay-3">
                From climate analytics to business intelligence projects, I enjoy
                uncovering patterns in complex datasets and presenting findings
                in clear, actionable formats. I'm driven by the challenge of
                translating numbers into narratives.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="reveal delay-4">
              {/* Label style */}
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-5">
                Core Tools
              </span>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-md
                               hover:border-neutral-300 hover:bg-neutral-100 transition-colors duration-200"
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
