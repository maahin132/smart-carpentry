import { motion } from 'framer-motion'

function Workpiece() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Active measurement point */}
      <motion.div
        className="absolute left-[60%] top-[50%] h-3 w-3 rounded-full border border-[var(--sc-crimson)] bg-[var(--sc-stone)]"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 1, 1, 0.6],
          scale: [0, 1.2, 1, 1],
        }}
        transition={{
          duration: 1,
          delay: 1.8,
        }}
      >
        <span className="absolute inset-1 rounded-full bg-[var(--sc-crimson)]" />
      </motion.div>

      {/* Active dimension */}
      <motion.div
        className="absolute left-[31%] top-[39%] flex items-center gap-2"
        initial={{
          opacity: 0,
          x: -8,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 1.4,
        }}
      >
        <span className="h-px w-8 bg-[var(--sc-text-light)]/45" />

        <span className="text-xs uppercase tracking-[0.18em] text-[var(--sc-muted-dark)]">
          Cut / 680 mm
        </span>

        <span className="h-px w-8 bg-[var(--sc-text-light)]/45" />
      </motion.div>

      {/* Moving measurement marker */}
      <motion.div
        className="absolute left-[30%] top-[59%] h-1.5 w-1.5 rounded-full bg-[var(--sc-crimson-soft)]"
        animate={{
          x: [0, 210, 0],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export default Workpiece