import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/useAuth'

const productLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Materials', to: '/materials' },
  { label: 'Furniture', to: '/furniture' },
  { label: 'Smart Estimator', to: '/estimator' },
  { label: 'Cutting Optimizer', to: '/optimizer' },
  { label: 'Pricing', to: '/pricing' },
]

const projectLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

function Footer() {
  const { user } = useAuth()
  const accountLinks = user
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Profile', to: '/profile' },
        { label: 'Settings', to: '/settings' },
        ...(user.role === 'admin' ? [{ label: 'Administration', to: '/admin/' }] : []),
      ]
    : [
        { label: 'Sign in', to: '/login' },
        { label: 'Create account', to: '/register' },
      ]

  return (
    <footer className="sc-dark-section relative overflow-hidden border-t border-[var(--sc-border-light)] bg-[var(--sc-navy-deep)] text-[var(--sc-muted-dark)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--sc-crimson-soft)]/70 to-transparent" />
      <div className="mx-auto max-w-[1536px] px-6 py-16 lg:px-10 lg:py-[76px]">

        <motion.div
          className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.8fr_0.8fr_0.8fr] lg:gap-x-16"
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ amount: 0.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >

          <div>
            <Link to="/" className="group flex w-fit items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-crimson-soft)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--sc-crimson)] text-xs font-bold tracking-[0.08em] text-[var(--sc-text-light)] shadow-[0_5px_18px_rgba(180,35,50,0.2)] transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
                SC
              </span>

              <span>
                <span className="block text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--sc-text-light)]">
                  Smart Carpentry
                </span>

                <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-[var(--sc-muted-dark)]">
                  Precision. Material. Build.
                </span>
              </span>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-[var(--sc-muted-dark)]">
              Plan materials, estimate sheet needs and prepare your cut before work begins.
            </p>
            <Link
              to="/contact"
              className="group mt-5 inline-flex items-center gap-2 rounded-sm text-xs font-medium uppercase tracking-[0.12em] text-[var(--sc-text-light)] transition-colors hover:text-[var(--sc-crimson-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-crimson-soft)]"
            >
              Talk to our team
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <nav aria-label="Footer product">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sc-text-light)]">
              Product
            </h2>

            <ul className="mt-6 space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-block rounded-sm text-sm text-[var(--sc-muted-dark)] transition duration-200 hover:translate-x-1 hover:text-[var(--sc-crimson-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-crimson-soft)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer project">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sc-text-light)]">
              Project
            </h2>

            <ul className="mt-6 space-y-3.5">
              {projectLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-block rounded-sm text-sm text-[var(--sc-muted-dark)] transition duration-200 hover:translate-x-1 hover:text-[var(--sc-crimson-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-crimson-soft)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer account">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sc-text-light)]">Account</h2>
            <ul className="mt-6 space-y-3.5">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="inline-block rounded-sm text-sm text-[var(--sc-muted-dark)] transition duration-200 hover:translate-x-1 hover:text-[var(--sc-crimson-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-crimson-soft)]">{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

        </motion.div>

        <div
          className="mt-16 flex flex-col justify-between gap-4 border-t border-[var(--sc-border-light)] pt-6 sm:flex-row sm:items-center"
        >
          <p className="text-xs tracking-[0.08em] text-[var(--sc-muted-dark)]">
            © 2026 Smart Carpentry. Precision. Material. Build.
          </p>

          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 rounded-sm text-xs uppercase tracking-[0.16em] text-[var(--sc-muted-dark)] transition-colors duration-200 hover:text-[var(--sc-crimson-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-crimson-soft)]"
          >
            Back to top

            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-y-1"
            >
              ↑
            </span>
          </Link>
        </div>

      </div>
    </footer>
  )
}

export default Footer