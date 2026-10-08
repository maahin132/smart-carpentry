import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MaterialList from './MaterialList'
import './materials.css'

function Materials() {
  return (
    <section
      id="materials"
      className="materials-section relative overflow-hidden bg-[var(--sc-bg)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--sc-accent)]">
              Material library
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--sc-text)] sm:text-5xl">
              Choose the right material
              <br />
              <span className="text-[var(--sc-accent)]">
                for the right build.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="max-w-2xl lg:pt-8"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
          >
            <p className="text-lg leading-8 text-[var(--sc-muted)]">
              Keep the materials used across your projects organized in one
              place. Compare specifications, thicknesses and availability
              before they become part of an estimate or cutting plan.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--sc-crimson)]" />

              <span className="text-xs uppercase tracking-[0.18em] text-[var(--sc-muted)]">
                Built around your workshop
              </span>
            </div>
          </motion.div>
        </div>

        <MaterialList />

        <motion.div
          className="mt-20 flex flex-col justify-between gap-6 border-t border-[var(--sc-border)] pt-8 sm:flex-row sm:items-center"
          initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.15, margin: '0px 0px 120px 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-xl text-sm leading-6 text-[var(--sc-muted)]">
            Material prices and availability will be managed from the
            administration system and used directly by estimates and
            quotations.
          </p>

          <span className="text-xs uppercase tracking-[0.2em] text-[var(--sc-accent)]">
            Materials / Specifications / Pricing
          </span>
        </motion.div>
        <Link className="sc-text-link mt-6" to="/materials">View all materials <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  )
}

export default Materials