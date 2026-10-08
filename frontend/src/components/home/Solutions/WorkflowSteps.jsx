import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Measure',
    description:
      'Capture the project dimensions and define the space before material is selected.',
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'Choose materials, thickness, construction details and project requirements.',
  },
  {
    number: '03',
    title: 'Calculate',
    description:
      'Understand material, labour, hardware and transport costs before work begins.',
  },
  {
    number: '04',
    title: 'Optimize',
    description:
      'Plan sheet usage and reduce unnecessary material waste before cutting.',
  },
  {
    number: '05',
    title: 'Build',
    description:
      'Take a clear, prepared plan from the screen to the workshop and build with confidence.',
  },
]

function WorkflowSteps() {
  return (
    <div className="mt-14">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          className="group grid border-t border-[var(--sc-border)] py-7 md:grid-cols-[90px_220px_1fr] md:items-start md:gap-8"
          initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.6,
            delay: index * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="text-xs tracking-[0.16em] text-[var(--sc-accent)]">
            {step.number}
          </span>

          <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] text-[var(--sc-text)] md:mt-0 md:text-2xl">
            {step.title}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--sc-muted)] md:mt-0 md:text-base">
            {step.description}
          </p>

          <span className="pointer-events-none absolute hidden" />
        </motion.div>
      ))}

      <div className="border-t border-[var(--sc-border)]" />
    </div>
  )
}

export default WorkflowSteps