import { motion } from 'framer-motion'

const steps = [
  ['01', 'Measure'],
  ['02', 'Plan'],
  ['03', 'Calculate'],
  ['04', 'Optimize'],
  ['05', 'Build'],
]

function WorkflowIndicator() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {steps.map(([number, label], index) => (
        <div key={label} className="flex items-center gap-5">
          <motion.div
            className="flex items-center gap-2.5"
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.85 + index * 0.1,
            }}
          >
            <span className="text-xs tracking-[0.12em] text-[var(--sc-accent)]">
              {number}
            </span>

            <span className="text-xs uppercase tracking-[0.18em] text-[var(--sc-muted)]">
              {label}
            </span>
          </motion.div>

          {index < steps.length - 1 && (
            <motion.span
              className="h-px w-5 bg-[var(--sc-border-light)]"
              initial={{
                scaleX: 0,
                transformOrigin: 'left',
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.4,
                delay: 1 + index * 0.1,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default WorkflowIndicator