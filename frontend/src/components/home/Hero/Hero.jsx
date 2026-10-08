import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MeasurementSystem from './MeasurementSystem'
import Workbench from './Workbench'
import WorkflowIndicator from './WorkflowIndicator'
import Workpiece from './Workpiece'
import './hero.css'

function Hero() {
  return (
    <section
      id="home"
      className="sc-dark-section relative overflow-hidden bg-[var(--sc-navy)]"
    >
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1440px] items-center gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-20">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <motion.p
            className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-[var(--sc-accent)]"
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Smart Carpentry
          </motion.p>

          <motion.h1
            className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--sc-text)] sm:text-6xl lg:text-7xl"
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >
            Know the material
            <br />
            <span className="text-[var(--sc-accent)]">
              before you cut it.
            </span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-lg text-base leading-7 text-[var(--sc-muted)] sm:text-lg"
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
          >
            Plan materials, estimate sheet needs and prepare your cut before work begins.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
          >
            <Link
              to="/estimator"
              className="rounded-[6px] bg-[var(--sc-crimson)] px-5 py-3 text-sm font-medium text-[var(--sc-text-light)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--sc-crimson-dark)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--sc-crimson-soft)] focus:ring-offset-2 focus:ring-offset-[var(--sc-navy)]"
            >
              Try the estimator
            </Link>

            <Link
              to="#workshop-tools"
              className="rounded-[6px] border border-[var(--sc-border-light)] px-5 py-3 text-sm font-medium text-[var(--sc-text)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--sc-navy-surface)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--sc-crimson-soft)] focus:ring-offset-2 focus:ring-offset-[var(--sc-navy)]"
            >
              Explore tools
            </Link>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={false}
            transition={{
              duration: 0.7,
              delay: 0.65,
            }}
          >
            <WorkflowIndicator />
          </motion.div>
        </div>

        {/* Workbench */}
        <motion.div
          className="relative hero-workbench"
          initial={{ x: 30 }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.25,
            ease: 'easeOut',
          }}
        >
          <Workbench />
          <Workpiece />
          <MeasurementSystem />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero