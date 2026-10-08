import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function CallToAction() {
  return (
    <section
      id="start-project"
      className="sc-dark-section relative overflow-hidden bg-[var(--sc-navy)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-20">

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div
            initial={{ y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--sc-muted-dark)]">
              Start a project
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.03] tracking-[-0.035em] text-[var(--sc-text-light)] sm:text-5xl lg:text-6xl">
              Ready to plan
              <br />
              <span className="text-[var(--sc-accent)]">your next build?</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--sc-muted-dark)]">
              Start with your dimensions. Get a clearer view of materials and sheet needs.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 lg:justify-end"
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              to="/estimator"
              className="rounded-[6px] bg-[var(--sc-crimson)] px-5 py-3 text-sm font-medium text-[var(--sc-text-light)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--sc-crimson-dark)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--sc-crimson-soft)] focus:ring-offset-2 focus:ring-offset-[var(--sc-navy)]"
            >
              Start an estimate
            </Link>

            <Link
              to="/materials"
              className="rounded-[6px] border border-[var(--sc-border-light)] px-5 py-3 text-sm font-medium text-[var(--sc-text-light)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--sc-navy-surface)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--sc-crimson-soft)] focus:ring-offset-2 focus:ring-offset-[var(--sc-navy)]"
            >
              Explore materials
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default CallToAction