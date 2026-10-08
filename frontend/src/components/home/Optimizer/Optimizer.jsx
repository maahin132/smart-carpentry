import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const benefits = [
  {
    number: '01',
    title: 'Sheet-first planning',
    description:
      'Parts are nested onto real sheet sizes — 2440 × 1220 mm — before any cut is made.',
  },
  {
    number: '02',
    title: 'Visible offcuts',
    description:
      'See what remains on the sheet before cutting, not as a pile after it.',
  },
  {
    number: '03',
    title: 'A cut list in order',
    description:
      'Cuts follow the plan directly, so every piece stays accounted for from saw to assembly.',
  },
  {
    number: '04',
    title: 'Material that lasts',
    description:
      'Fewer offcuts keep the budget in the project instead of the scrap bin.',
  },
]

function Optimizer() {
  return (
    <section
      id="optimizer"
      className="sc-dark-section relative overflow-hidden bg-[var(--sc-navy)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--sc-accent)]">
              Cutting optimizer
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--sc-text)] sm:text-5xl">
              Less waste.
              <br />
              <span className="text-[var(--sc-accent)]">
                Better planning.
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
              Plan every part on the sheet before the saw is switched on. The
              optimizer shows how the material is used, what remains as offcut
              and where the next cut begins — so the sheet goes into the
              project, not the scrap pile.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--sc-crimson)]" />

              <span className="text-xs uppercase tracking-[0.18em] text-[var(--sc-muted)]">
                From measurement to material
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          <motion.div
            className="h-fit border border-[var(--sc-border)] bg-[var(--sc-surface)] p-5 lg:p-6"
            initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', scale: 0.98 }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-[var(--sc-border)] pb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--sc-muted)]">
                Optimized sheet layout
              </span>

              <span className="text-xs uppercase tracking-[0.2em] text-[var(--sc-accent)]">
                2440 × 1220 mm
              </span>
            </div>

            <svg
              viewBox="0 0 520 276"
              className="mt-5 w-full"
              role="img"
              aria-label="Cutting layout: two side panels, three shelves, two doors and a back panel nested on one standard sheet"
            >
              <g
                fill="var(--sc-surface-soft)"
                stroke="var(--sc-border-light)"
                strokeOpacity="0.45"
                strokeWidth="1"
              >
                <rect x="16" y="16" width="134" height="121" />
                <rect x="16" y="139" width="134" height="121" />
                <rect x="152" y="16" width="168" height="80" />
                <rect x="152" y="98" width="168" height="80" />
                <rect x="152" y="180" width="168" height="80" />
                <rect x="322" y="16" width="88" height="121" />
                <rect x="322" y="139" width="88" height="121" />
                <rect x="412" y="16" width="92" height="244" />
              </g>

              <g
                fill="var(--sc-muted)"
                fontSize="9"
                letterSpacing="1"
                textAnchor="middle"
              >
                <text x="83" y="80">SIDE ×2</text>
                <text x="83" y="203">SIDE</text>
                <text x="236" y="59">SHELF ×3</text>
                <text x="236" y="141">SHELF</text>
                <text x="236" y="223">SHELF</text>
                <text x="366" y="80">DOOR ×2</text>
                <text x="366" y="203">DOOR</text>
                <text x="458" y="141">BACK</text>
              </g>

              <rect
                x="16"
                y="16"
                width="488"
                height="244"
                fill="none"
                stroke="var(--sc-border-light)"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>

          <div>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.number}
                className="border-t border-[var(--sc-border)] py-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: 'easeOut',
                }}
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-xs tracking-[0.16em] text-[var(--sc-accent)]">
                    {benefit.number}
                  </span>

                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.01em] text-[var(--sc-text)]">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-[var(--sc-muted)]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="border-t border-[var(--sc-border)]" />
          </div>
        </div>

        <motion.div
          className="mt-20 flex flex-col justify-between gap-6 border-t border-[var(--sc-border)] pt-8 sm:flex-row sm:items-center"
          initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.15, margin: '0px 0px 120px 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-xl text-sm leading-6 text-[var(--sc-muted)]">
            Plan the sheet. Then make the cut.
          </p>

          <span className="text-xs uppercase tracking-[0.2em] text-[var(--sc-accent)]">
            Nest / Cut / Minimize waste
          </span>
        </motion.div>
        <Link className="sc-text-link mt-6 text-[var(--sc-text-light)]" to="/optimizer">Open the cutting optimizer <span aria-hidden="true">→</span></Link>

      </div>
    </section>
  )
}

export default Optimizer