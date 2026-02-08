/**
 * About Section - Data Analytics Focus
 *
 * Typography System (consistent with Hero):
 * - H2: text-2xl md:text-3xl, font-semibold
 * - Body: text-base, text-neutral-600, leading-relaxed
 * - Label: text-xs, font-semibold, uppercase, tracking-widest
 */

const About = () => {
  return (
    <section
      id="about"
      className="section section-border bg-white"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Section Label */}
          <div className="lg:col-span-2">
            <span className="text-label reveal">About</span>
          </div>

          {/* Content */}
          <div className="lg:col-span-10">
            {/* Lead statement - H1 style */}
            <p className="text-h1 leading-snug mb-14 reveal delay-1 max-w-2xl">
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

          </div>
        </div>
      </div>
    </section>
  )
}

export default About
