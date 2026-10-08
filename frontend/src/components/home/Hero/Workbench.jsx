import { motion } from 'framer-motion'

function Workbench() {
  return (
    <div className="hero-workbench relative h-[430px] w-full overflow-hidden rounded-[12px] border border-[var(--sc-border-light)] bg-[var(--sc-navy-deep)] shadow-[0_24px_55px_rgba(15,23,42,0.22)] sm:h-[480px] lg:h-[520px]">
      {/* Technical grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Header */}
      <div className="absolute left-6 top-6 flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-[var(--sc-crimson)]"
            animate={{
              scale: [1, 1.7, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <span className="relative h-2 w-2 rounded-full bg-[var(--sc-crimson)]" />
        </span>

        <span className="text-xs tracking-[0.06em] text-[var(--sc-muted-dark)]">
          Precision Workbench
        </span>
      </div>

      <div className="absolute right-6 top-6 text-right">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--sc-muted-dark)]">
          Project
        </p>

        <p className="mt-1 text-xs tracking-[0.06em] text-[var(--sc-text-light)]">
          Kitchen / Base Unit
        </p>
      </div>

      {/* Reference line */}
      <motion.div
        className="absolute left-[10%] right-[10%] top-[18%] h-px origin-left bg-[var(--sc-stone-dark)]/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1,
          ease: 'easeOut',
        }}
      />

      {/* Material workspace */}
      <div className="absolute inset-x-[13%] top-[28%] bottom-[22%]">
        {/* Top measurement scale */}
        <div className="absolute -top-7 left-0 right-0 flex justify-between">
          {Array.from({ length: 13 }).map((_, index) => (
            <span
              key={index}
              className={`w-px bg-[var(--sc-stone-dark)]/35 ${
                index % 2 === 0 ? 'h-3' : 'h-2'
              }`}
            />
          ))}
        </div>

        {/* Left measurement scale */}
        <div className="absolute -bottom-1 -left-6 -top-1 flex flex-col justify-between">
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className={`h-px bg-[var(--sc-stone-dark)]/35 ${
                index % 2 === 0 ? 'w-3' : 'w-2'
              }`}
            />
          ))}
        </div>

        {/* Main plywood surface */}
        <motion.div
          className="absolute inset-0 overflow-hidden border border-[var(--sc-stone-dark)] bg-[var(--sc-stone)]"
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: 'easeOut',
          }}
        >
          {/* Inner working boundary */}
          <div className="absolute inset-4 border border-[var(--sc-navy)]/20" />

          {/* Cut planning region */}
          <motion.div
            className="absolute left-[18%] top-[19%] h-[46%] w-[42%] border border-[var(--sc-crimson)]/75"
            initial={{
              opacity: 0,
              pathLength: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 1,
            }}
          >
            <div className="absolute -left-px -top-px h-3 w-3 border-l border-t border-[var(--sc-crimson)]" />
            <div className="absolute -right-px -top-px h-3 w-3 border-r border-t border-[var(--sc-crimson)]" />
            <div className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-[var(--sc-crimson)]" />
            <div className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-[var(--sc-crimson)]" />
          </motion.div>

          {/* Secondary cut */}
          <motion.div
            className="absolute bottom-[18%] left-[18%] h-px w-[58%] bg-[var(--sc-navy)]/45"
            initial={{
              scaleX: 0,
              transformOrigin: 'left',
            }}
            animate={{
              scaleX: 1,
            }}
            transition={{
              duration: 1,
              delay: 1.35,
              ease: 'easeOut',
            }}
          />

          {/* Vertical cut */}
          <motion.div
            className="absolute bottom-[18%] left-[60%] top-[19%] w-px bg-[var(--sc-navy)]/45"
            initial={{
              scaleY: 0,
            }}
            animate={{
              scaleY: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 1.5,
              ease: 'easeOut',
            }}
          />

          {/* Measurement point */}
          <motion.div
            className="absolute left-[60%] top-[65%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--sc-crimson)] bg-[var(--sc-stone)]"
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.45,
              delay: 1.9,
            }}
          >
            <span className="absolute inset-1 rounded-full bg-[var(--sc-crimson)]" />
          </motion.div>

          {/* Material label */}
          <div className="absolute bottom-5 left-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--sc-muted)]">
              Material
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--sc-text)]">
              Plywood / 18 mm
            </p>
          </div>

          {/* Dimension */}
          <div className="absolute right-5 top-5 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--sc-muted)]">
              Sheet
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--sc-text)]">
              2400 × 1200
            </p>
          </div>
        </motion.div>

        {/* Width */}
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-[var(--sc-muted-dark)]">
          2400 mm
        </div>

        {/* Height */}
        <div className="absolute -right-14 top-1/2 -translate-y-1/2 rotate-90 text-xs uppercase tracking-[0.2em] text-[var(--sc-muted-dark)]">
          1200 mm
        </div>
      </div>

      {/* Measurement scanner */}
      <motion.div
        className="pointer-events-none absolute left-[13%] right-[13%] top-[50%] h-px bg-[var(--sc-text-light)]/60"
        initial={{
          opacity: 0,
          scaleX: 0.15,
        }}
        animate={{
          opacity: [0, 0.7, 0.7, 0],
          scaleX: [0.15, 1, 1, 0.15],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom metadata */}
      <div className="absolute bottom-6 left-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--sc-muted-dark)]">
          Current operation
        </p>

        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--sc-muted)]">
          Measuring workpiece
        </p>
      </div>

      <div className="absolute bottom-6 right-6 text-right">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--sc-muted-dark)]">
          Precision
        </p>

        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--sc-muted)]">
          18 mm material
        </p>
      </div>
    </div>
  )
}

export default Workbench