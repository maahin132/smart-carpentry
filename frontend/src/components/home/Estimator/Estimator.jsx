import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const estimateLines = [
  {
    number: '01',
    title: 'Material',
    description:
      'Sheet goods, edge band, finishes and fixtures — counted from the plan instead of memory.',
    basis: 'From the cut list',
  },
  {
    number: '02',
    title: 'Hardware',
    description:
      'Hinges, channels, connectors and fittings added according to the project requirements.',
    basis: 'Per project',
  },
  {
    number: '03',
    title: 'Labour & Transport',
    description:
      'Cutting, assembly, finishing and delivery — shown as separate, transparent lines.',
    basis: 'Itemised lines',
  },
  {
    number: '04',
    title: 'Summary',
    description:
      'One clear breakdown to review with the client before a quotation is sent.',
    basis: 'Quotation ready',
  },
]

function Estimator() {
  return (
    <section
      id="estimator"
      className="relative overflow-hidden bg-[var(--sc-surface)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--sc-accent)]">
              Cost estimator
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--sc-text)] sm:text-5xl">
              Know the cost
              <br />
              <span className="text-[var(--sc-accent)]">
                before production.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="max-w-2xl lg:pt-8"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg leading-8 text-[var(--sc-muted)]">
              Smart Carpentry turns the plan into a clear estimate — material,
              hardware, labour and transport listed as line items you can
              review, adjust and quote with confidence.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--sc-crimson)]" />

              <span className="text-xs uppercase tracking-[0.18em] text-[var(--sc-muted)]">
                Estimate before production
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-14">
          {estimateLines.map((line, index) => (
            <motion.article
              key={line.number}
              className="grid border-t border-[var(--sc-border)] py-7 transition-colors duration-200 hover:bg-[var(--sc-surface-soft)]/60 md:grid-cols-[80px_260px_1fr_180px] md:items-center md:gap-8"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="text-xs tracking-[0.16em] text-[var(--sc-accent)]">
                {line.number}
              </span>

              <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] text-[var(--sc-text)] md:mt-0 md:text-2xl">
                {line.title}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--sc-muted)] md:mt-0 md:text-base">
                {line.description}
              </p>

              <div className="mt-4 md:mt-0 md:text-right">
                <p className="text-xs uppercase tracking-[0.17em] text-[var(--sc-muted)]">
                  Basis
                </p>

                <p className="mt-1 text-xs leading-5 text-[var(--sc-text)]">
                  {line.basis}
                </p>
              </div>
            </motion.article>
          ))}

          <div className="border-t border-[var(--sc-border)]" />
        </div>

        <motion.div
          className="mt-20 flex flex-col justify-between gap-6 border-t border-[var(--sc-border)] pt-8 sm:flex-row sm:items-center"
          initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.15, margin: '0px 0px 120px 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-xl text-sm leading-6 text-[var(--sc-muted)]">
            An estimate built from a real plan is an estimate you can stand
            behind.
          </p>

          <span className="text-xs uppercase tracking-[0.2em] text-[var(--sc-accent)]">
            Estimate / Adjust / Quote
          </span>
        </motion.div>
        <Link className="sc-text-link mt-6" to="/estimator">Open the smart estimator <span aria-hidden="true">→</span></Link>

      </div>
    </section>
  )
}

export default Estimator