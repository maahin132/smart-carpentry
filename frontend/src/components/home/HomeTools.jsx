import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const tools = [
  {
    number: '01',
    eyebrow: 'Estimate',
    title: 'Know your material needs.',
    description: 'Estimate panel area and sheet count from your project dimensions.',
    to: '/estimator',
    link: 'Open estimator',
  },
  {
    number: '02',
    eyebrow: 'Optimize',
    title: 'Plan the sheet before cutting.',
    description: 'Arrange rectangular parts and review a suggested sheet layout.',
    to: '/optimizer',
    link: 'Open optimizer',
  },
  {
    number: '03',
    eyebrow: 'Explore',
    title: 'Choose materials with context.',
    description: 'Browse common boards, finishes and workshop components.',
    to: '/materials',
    link: 'Browse materials',
  },
]

function HomeTools() {
  return (
    <section id="workshop-tools" className="bg-[var(--sc-bg)]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-24">
        <motion.div
          className="mb-10 flex flex-wrap items-end justify-between gap-6"
          initial={{ y: 18 }}
          whileInView={{ y: 0 }}
          viewport={{ amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--sc-accent)]">
              Your workshop toolkit
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[var(--sc-text)] sm:text-4xl">
              Plan with more confidence.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--sc-muted)]">
            Three practical tools to move from dimensions to a better-prepared build.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.article
              className="group flex min-h-[250px] flex-col border border-[var(--sc-border)] bg-[var(--sc-surface)] p-7 transition duration-200 hover:-translate-y-1 hover:border-[var(--sc-accent)] sm:p-8"
              key={tool.number}
              initial={{ y: 22 }}
              whileInView={{ y: 0 }}
              viewport={{ amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.16em] text-[var(--sc-accent)]">
                  {tool.number}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-[var(--sc-muted)]">
                  {tool.eyebrow}
                </span>
              </div>
              <h3 className="mt-9 max-w-xs text-2xl font-medium leading-tight tracking-[-0.03em] text-[var(--sc-text)]">
                {tool.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--sc-muted)]">
                {tool.description}
              </p>
              <Link
                className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-sm font-medium text-[var(--sc-text)] transition-colors hover:text-[var(--sc-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-accent)]"
                to={tool.to}
              >
                {tool.link}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeTools
