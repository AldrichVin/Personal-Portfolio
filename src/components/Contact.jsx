import { ArrowUpRight } from 'lucide-react'

/**
 * Contact Section - Refined Closing
 *
 * Design: Controlled height, clear hierarchy
 * Smooth transition from content to footer
 */

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Section Label */}
          <div className="lg:col-span-3">
            <span className="text-label reveal">Contact</span>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            {/* Heading with availability inline */}
            <div className="flex items-center gap-3 mb-3 reveal delay-1">
              <h2 className="text-h2">Let's work together.</h2>
              <span className="contact-status">
                <span className="contact-status-dot" />
                <span>Available</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-body max-w-md mb-5 reveal delay-2">
              Open to full-time roles, freelance projects, and collaborations.
            </p>

            {/* Email link */}
            <a
              href="mailto:aldrichvin040205@gmail.com"
              className="contact-email reveal delay-3"
            >
              aldrichvin040205@gmail.com
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-neutral-100 reveal delay-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/AldrichVin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-small hover:text-neutral-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/aldrich-vincent-4463b2355"
                target="_blank"
                rel="noopener noreferrer"
                className="text-small hover:text-neutral-900 transition-colors"
              >
                LinkedIn
              </a>
            </div>
            <span className="text-small">
              &copy; {new Date().getFullYear()} Aldrich Vincent Liem
            </span>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Contact
