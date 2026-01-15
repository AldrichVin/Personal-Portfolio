import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react'

const Contact = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '' })

    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'aldrichvinliem@gmail.com',
      href: 'mailto:aldrichvinliem@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Melbourne, Australia',
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/AldrichVin',
      username: '@AldrichVin',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/aldrichvin',
      username: '/in/aldrichvin',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-gray-50"
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm text-gray-500 uppercase tracking-wider">
              Get In Touch
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Let's Work Together
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Have a project in mind or want to discuss opportunities?
              I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    submitted
                      ? 'bg-green-600 text-white'
                      : 'btn-primary'
                  }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : submitted ? (
                    <>
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact info & socials */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Direct contact */}
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-5">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-gray-900 hover:text-indigo-600 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-900">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-5">
                  Find Me Online
                </h3>
                <div className="grid gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          <social.icon size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{social.label}</p>
                          <p className="text-sm text-gray-500">{social.username}</p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-gray-300 group-hover:text-gray-600 transition-colors"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <div className="p-5 rounded-xl bg-white border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-green-600 font-medium text-sm">
                    Open to Opportunities
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  I'm currently looking for full-time positions, freelance projects,
                  and interesting collaborations.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
