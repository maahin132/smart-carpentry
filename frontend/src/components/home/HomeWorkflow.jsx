import { motion } from 'framer-motion'

const steps = ['Measure', 'Plan', 'Calculate', 'Build']

function HomeWorkflow() {
  return (
    <motion.section
      className="sc-dark-section bg-[var(--sc-navy)]"
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--sc-accent)]">
            A clearer process
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[var(--sc-text-light)] sm:text-3xl">
            From first measurement to workshop.
          </h2>
        </div>
        <ol className="flex flex-wrap items-center gap-x-4 gap-y-3" aria-label="Project workflow">
          {steps.map((step, index) => (
            <li className="flex items-center gap-4" key={step}>
              <span className="text-xs uppercase tracking-[0.16em] text-[var(--sc-muted-dark)]">
                {step}
              </span>
              {index < steps.length - 1 && (
                <span aria-hidden="true" className="text-[var(--sc-accent)]">/</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </motion.section>
  )
}

export default HomeWorkflow
