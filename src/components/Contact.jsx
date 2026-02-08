import { ArrowUpRight } from 'lucide-react'

/**
 * Contact Section - Data Analytics Focus
 *
 * Typography System (consistent with other sections):
 * - H2: text-2xl md:text-3xl, font-semibold
 * - Body: text-base, text-neutral-600, leading-relaxed
 * - Label: text-xs, font-semibold, uppercase, tracking-widest
 */

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Section Label */}
          <div className="lg:col-span-2">
            <span className="text-label reveal">Contact</span>
          </div>

          {/* Content */}
          <div className="lg:col-span-10">
            {/* Heading with availability - H2 style */}
            <div className="flex flex-wrap items-center gap-4 mb-6 reveal delay-1">
              <h2 className="text-h1">
                Let's work together.
              </h2>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available
              </span>
            </div>

            {/* Description - Body style */}
            <p className="text-base text-neutral-600 leading-relaxed max-w-md mb-8 reveal delay-2">
              Open to data analyst roles, analytics projects, and opportunities
              to drive business impact through data.
            </p>

            {/* Email link */}
            <a
              href="mailto:aldrichvin040205@gmail.com"
              className="group inline-flex items-center gap-2 text-base font-medium text-neutral-900 hover:text-neutral-600 transition-colors reveal delay-3"
            >
              <span className="link-underline pb-0.5">
                aldrichvin040205@gmail.com
              </span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-neutral-200 reveal delay-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-8">
              <a
                href="https://github.com/AldrichVin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/aldrich-vincent-4463b2355"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                LinkedIn
              </a>
            </div>
            <span className="text-sm text-neutral-400">
              © {new Date().getFullYear()} Aldrich Vincent Liem
            </span>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Contact
