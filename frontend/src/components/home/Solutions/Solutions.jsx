import { motion } from 'framer-motion'
import WorkflowSteps from './WorkflowSteps'
import { Link } from 'react-router-dom'
import './solutions.css'

function Solutions() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden bg-[var(--sc-surface)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Section introduction */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--sc-accent)]">
              The workflow
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--sc-text)] sm:text-5xl">
              From measurement
              <br />
              <span className="text-[var(--sc-accent)]">
                to build.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="max-w-2xl lg:pt-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-lg leading-8 text-[var(--sc-muted)]">
              Smart Carpentry brings the important decisions of a project
              into one clear workflow — helping you understand what to build,
              what material you need and what it will cost before production
              begins.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--sc-crimson)]" />

              <span className="text-xs uppercase tracking-[0.18em] text-[var(--sc-muted)]">
                Plan before production
              </span>
            </div>
          </motion.div>
        </div>

        {/* Workflow */}
        <WorkflowSteps />

        {/* Closing statement */}
        <motion.div
          className="mt-20 flex flex-col justify-between gap-8 border-t border-[var(--sc-border)] pt-8 sm:flex-row sm:items-end"
          initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.15, margin: '0px 0px 120px 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-lg text-sm leading-6 text-[var(--sc-muted)]">
            Better planning means fewer surprises in the workshop, better
            material decisions and a clearer path from quotation to finished
            work.
          </p>

          <span className="text-xs uppercase tracking-[0.2em] text-[var(--sc-accent)]">
            Precision / Efficiency / Control
          </span>
        </motion.div>
        <Link className="sc-text-link mt-6" to="/services">Explore all services <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  )
}

export default Solutions