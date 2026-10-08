import { motion } from 'framer-motion'

function MeasurementSystem() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute left-[18%] top-[22%] text-xs uppercase tracking-[0.18em] text-[var(--sc-muted-dark)]"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        Reference / A01
      </motion.div>

      <motion.div
        className="absolute right-[17%] bottom-[30%] text-xs uppercase tracking-[0.18em] text-[var(--sc-muted-dark)]"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        Depth / 600
      </motion.div>

      <motion.div
        className="absolute left-[20%] bottom-[18%] text-xs uppercase tracking-[0.18em] text-[var(--sc-muted-dark)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        Scale 1 : 10
      </motion.div>

      {/* Crosshair */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--sc-navy)]/20" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--sc-navy)]/20" />
      </motion.div>
    </div>
  )
}

export default MeasurementSystem