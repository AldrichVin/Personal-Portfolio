const QUICK_FACTS = [
  { label: 'Education', value: 'BSc Computer Science' },
  { label: 'University', value: 'Monash University' },
  { label: 'Location', value: 'Melbourne, Australia' },
  { label: 'Focus', value: 'Data Analytics & BI' },
  { label: 'GPA', value: '3.81 / 4.0' },
]

const About = () => {
  return (
    <section
      id="about"
      style={{
        height: '100dvh',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 'var(--space-xl)',
        paddingRight: 'var(--space-xl)',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Section label */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <span className="text-label">About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — narrative */}
          <div className="lg:col-span-6">
            <h2
              className="text-h1 text-neutral-900 reveal delay-1"
              style={{ marginBottom: '1.5rem' }}
            >
              Computer Science graduate with a passion for turning
              raw data into{' '}
              <span className="text-serif-accent text-[#4f46e5]">meaningful insights</span>.
            </h2>

            <p className="text-body reveal delay-2" style={{ maxWidth: '480px' }}>
              I specialize in data analysis, ETL pipelines, and interactive
              dashboards that help stakeholders make informed decisions. From
              climate analytics to business intelligence, I enjoy uncovering
              patterns in complex datasets and translating numbers into
              actionable narratives.
            </p>
          </div>

          {/* Right — quick facts */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="reveal delay-3">
              <span
                className="text-label"
                style={{ display: 'block', marginBottom: '1.5rem' }}
              >
                Quick Facts
              </span>

              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                {QUICK_FACTS.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-baseline transition-colors duration-200 hover:bg-neutral-50/50"
                    style={{
                      padding: '0.875rem 0.5rem',
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                      marginLeft: '-0.5rem',
                      marginRight: '-0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    <span
                      className="text-label"
                    >
                      {label}
                    </span>
                    <span className="text-sm font-medium text-neutral-800">
                      {value}
                    </span>
                  </div>
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
