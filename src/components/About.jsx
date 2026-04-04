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
      className="section section-border"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Section Label */}
          <div className="lg:col-span-2">
            <span className="text-label reveal">About</span>
          </div>

          {/* Content */}
          <div className="lg:col-span-10">
            {/* Lead statement */}
            <p className="text-h2 font-normal text-neutral-800 leading-relaxed mb-8 reveal delay-1 max-w-2xl">
              Computer Science graduate from Monash University with a passion
              for turning raw data into meaningful business insights.
            </p>

            {/* Body paragraphs — staggered entrance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mb-8">
              <p className="text-base text-neutral-500 leading-relaxed reveal delay-2">
                I specialize in data analysis, building ETL pipelines, and creating
                interactive dashboards that help stakeholders make informed decisions.
                My toolkit includes SQL, Python, and visualization platforms like
                Power BI and Tableau.
              </p>
              <p className="text-base text-neutral-500 leading-relaxed reveal delay-4">
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
