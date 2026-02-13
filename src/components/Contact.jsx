import { ArrowUpRight, Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

const INTEREST_TAGS = ['Data Analyst', 'BI Developer', 'Analytics Engineer']

const Contact = () => {
  const handleBackToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
            {/* Card wrapper */}
            <div className="bg-neutral-50/50 rounded-2xl p-8 md:p-10 border border-neutral-100">
              {/* Heading with availability */}
              <div className="flex flex-wrap items-center gap-4 mb-6 reveal delay-1">
                <h2 className="text-h1">
                  Let's work together.
                </h2>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available
                </span>
              </div>

              {/* Description */}
              <p className="text-base text-neutral-600 leading-relaxed max-w-md mb-6 reveal delay-2">
                Open to data analyst roles, analytics projects, and opportunities
                to drive business impact through data.
              </p>

              {/* Interest tags */}
              <div className="flex flex-wrap gap-2 mb-8 reveal delay-2">
                {INTEREST_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm font-medium bg-indigo-50 border border-indigo-200
                               rounded-full text-indigo-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Email + social links inline */}
              <div className="flex flex-wrap items-center gap-5 reveal delay-3">
                <a
                  href="mailto:aldrichvin040205@gmail.com"
                  className="group inline-flex items-center gap-2 text-base font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  <Mail size={18} strokeWidth={1.5} className="text-neutral-400" />
                  <span className="link-underline pb-0.5">
                    aldrichvin040205@gmail.com
                  </span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <span className="hidden sm:block w-px h-5 bg-neutral-200" />

                <div className="flex items-center gap-1">
                  <a
                    href="https://github.com/AldrichVin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 text-neutral-400 hover:text-neutral-900 transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <span className="absolute inset-0 rounded-full bg-neutral-100 scale-0
                                     group-hover:scale-100 transition-transform duration-300 ease-out" />
                    <Github size={18} strokeWidth={1.5} className="relative z-10" />
                  </a>
                  <a
                    href="https://linkedin.com/in/aldrich-vincent-4463b2355"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 text-neutral-400 hover:text-neutral-900 transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <span className="absolute inset-0 rounded-full bg-neutral-100 scale-0
                                     group-hover:scale-100 transition-transform duration-300 ease-out" />
                    <Linkedin size={18} strokeWidth={1.5} className="relative z-10" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-neutral-200 reveal delay-4">
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
              <a
                href="#"
                onClick={handleBackToTop}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <ArrowUp size={14} strokeWidth={1.5} />
                Back to top
              </a>
            </div>
            <span className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} Aldrich Vincent Liem
            </span>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Contact
