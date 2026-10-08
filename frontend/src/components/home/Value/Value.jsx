import { motion } from 'framer-motion'

const values = [
  {
    title: 'Plan before production',
    description:
      'Decisions happen on the screen, where changes are free — not on the workshop floor.',
  },
  {
    title: 'Less waste',
    description:
      'Optimized sheets keep material in the project and out of the scrap pile.',
  },
  {
    title: 'Clear costs',
    description:
      'Material, labour and hardware are known before the quotation is sent.',
  },
  {
    title: 'One workflow',
    description:
      'Measure, plan, calculate, optimize and build without switching between tools.',
  },
]

function Value() {
  return (
    <section
      id="value"
      className="relative overflow-hidden bg-[var(--sc-surface)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--sc-accent)]">
              Why Smart Carpentry
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--sc-text)] sm:text-5xl">
              Built for the workshop,
              <br />
              <span className="text-[var(--sc-accent)]">
                not for guesswork.
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
              For carpenters, interior designers, furniture makers and small
              workshops — anyone who needs material, cost and cut decisions
              made before production starts, not corrected during it.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--sc-crimson)]" />

              <span className="text-xs uppercase tracking-[0.18em] text-[var(--sc-muted)]">
                Plan with precision
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="border-t border-[var(--sc-border)] pt-6"
              initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="text-xs tracking-[0.16em] text-[var(--sc-accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="mt-4 text-lg font-medium tracking-[-0.01em] text-[var(--sc-text)]">
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[var(--sc-muted)]">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 flex flex-col justify-between gap-6 border-t border-[var(--sc-border)] pt-8 sm:flex-row sm:items-center"
          initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.15, margin: '0px 0px 120px 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-xl text-sm leading-6 text-[var(--sc-muted)]">
            Precision is not extra work — it is the work you no longer have to
            redo.
          </p>

          <span className="text-xs uppercase tracking-[0.2em] text-[var(--sc-accent)]">
            Built for real projects
          </span>
        </motion.div>

      </div>
    </section>
  )
}

export default Value