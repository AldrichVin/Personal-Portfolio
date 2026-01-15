import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react'

/**
 * Contact Section - Conversion Optimized
 *
 * Design Decisions:
 * - Clear form with strong visual feedback
 * - Contact info prominently displayed
 * - Social proof with availability status
 * - Micro-interactions on form inputs
 * - Success state animation
 */

const Contact = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [focusedField, setFocusedField] = useState(null)
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

    // Reset after 4 seconds
    setTimeout(() => setSubmitted(false), 4000)
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
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Melbourne, Australia',
      href: null,
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: null,
      color: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/AldrichVin',
      username: '@AldrichVin',
      color: '#24292f',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/aldrichvin',
      username: '/in/aldrichvin',
      color: '#0077b5',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  // Input field component with enhanced styling
  const InputField = ({ label, type, name, placeholder, value, rows }) => (
    <div className="relative">
      <label
        htmlFor={name}
        className={`block text-sm font-medium mb-2 transition-colors ${
          focusedField === name ? 'text-accent' : 'text-primary'
        }`}
      >
        {label}
      </label>
      {rows ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          required
          rows={rows}
          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-primary placeholder-tertiary focus:outline-none focus:border-accent focus:bg-white transition-all resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          required
          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-primary placeholder-tertiary focus:outline-none focus:border-accent focus:bg-white transition-all"
          placeholder={placeholder}
        />
      )}
      {/* Focus indicator line */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focusedField === name ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-surface relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header text-center">
            <span className="text-label text-accent mb-3 block">Get In Touch</span>
            <h2 className="text-section mb-4">
              Let's build something{' '}
              <span className="gradient-text">amazing</span>
            </h2>
            <p className="text-lead max-w-xl mx-auto">
              Have a project in mind or want to discuss opportunities?
              I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form - 3/5 width */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="card-feature">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                    <MessageSquare size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-subheader">Send a Message</h3>
                    <p className="text-small">I'll get back to you within 24 hours</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle2 size={32} className="text-emerald-600" />
                      </motion.div>
                      <h4 className="text-subheader mb-2">Message Sent!</h4>
                      <p className="text-body">
                        Thanks for reaching out. I'll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <InputField
                          label="Your Name"
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          value={formState.name}
                        />
                        <InputField
                          label="Email Address"
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          value={formState.email}
                        />
                      </div>

                      <InputField
                        label="Your Message"
                        name="message"
                        placeholder="Tell me about your project, timeline, and how I can help..."
                        value={formState.message}
                        rows={5}
                      />

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary justify-center py-4 text-base"
                        whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                      >
                        {isSubmitting ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Info & Socials - 2/5 width */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              {/* Contact info cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="card group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <item.icon size={22} className={item.iconColor} />
                      </div>
                      <div>
                        <p className="text-small">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium text-primary hover:text-accent transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-primary">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <div className="card">
                <h3 className="text-label mb-4">Find Me Online</h3>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group flex items-center justify-between p-3 -mx-3 rounded-xl hover:bg-background transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${social.color}10` }}
                        >
                          <social.icon size={20} style={{ color: social.color }} />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{social.label}</p>
                          <p className="text-small">{social.username}</p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-tertiary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="card-feature bg-gradient-to-br from-emerald-50 to-blue-50"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-emerald-700">
                    Open to Opportunities
                  </span>
                </div>
                <p className="text-body">
                  I'm currently looking for full-time positions, freelance projects,
                  and interesting collaborations. Let's create something great together.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
