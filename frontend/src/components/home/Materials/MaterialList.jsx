import { motion } from 'framer-motion'

const materials = [
  {
    number: '01',
    name: 'Plywood',
    description:
      'Strong, versatile sheet material suited for cabinets, furniture and interior construction.',
    specification: 'Typical sheet / 2440 × 1220 mm',
    thickness: '6 — 25 mm',
  },
  {
    number: '02',
    name: 'MDF',
    description:
      'Smooth and consistent engineered board for painted furniture, panels and detailed work.',
    specification: 'Typical sheet / 2440 × 1220 mm',
    thickness: '6 — 25 mm',
  },
  {
    number: '03',
    name: 'Blockboard',
    description:
      'Lightweight structural board commonly used for long panels, doors and furniture components.',
    specification: 'Typical sheet / 2440 × 1220 mm',
    thickness: '16 — 25 mm',
  },
  {
    number: '04',
    name: 'Particle Board',
    description:
      'Cost-effective engineered board for selected furniture and interior applications.',
    specification: 'Typical sheet / 2440 × 1220 mm',
    thickness: '9 — 25 mm',
  },
  {
    number: '05',
    name: 'Laminate',
    description:
      'Decorative surface finish available in a wide range of textures, colours and patterns.',
    specification: 'Typical sheet / 2440 × 1220 mm',
    thickness: '0.8 — 1.5 mm',
  },
  {
    number: '06',
    name: 'Veneer',
    description:
      'Natural wood surface layer used when the finish and character of real timber matter.',
    specification: 'Finish layer / project dependent',
    thickness: '0.5 — 1 mm',
  },
  {
    number: '07',
    name: 'Edge Band',
    description:
      'Finishing material used to protect and visually complete exposed board edges.',
    specification: 'Roll / width dependent',
    thickness: '0.4 — 2 mm',
  },
  {
    number: '08',
    name: 'Hardware',
    description:
      'Functional components including hinges, channels, handles, connectors and fittings.',
    specification: 'Component / project dependent',
    thickness: 'Project dependent',
  },
]

function MaterialList() {
  return (
    <div className="mt-14">
      {materials.map((material, index) => (
        <motion.article
          key={material.number}
          className="material-row group grid border-t border-[var(--sc-border)] py-7 md:grid-cols-[80px_220px_1fr_170px] md:items-center md:gap-8"
          initial={{ opacity: 0, y: 30, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.55,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="text-xs tracking-[0.16em] text-[var(--sc-accent)]">
            {material.number}
          </span>

          <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] text-[var(--sc-text)] md:mt-0 md:text-2xl">
            {material.name}
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--sc-muted)] md:mt-0 md:text-base">
            {material.description}
          </p>

          <div className="mt-5 md:mt-0 md:text-right">
            <p className="text-xs uppercase tracking-[0.17em] text-[var(--sc-muted)]">
              Specification
            </p>

            <p className="mt-1 text-xs leading-5 text-[var(--sc-text)]">
              {material.specification}
            </p>

            <p className="mt-1 text-xs text-[var(--sc-accent)]">
              {material.thickness}
            </p>
          </div>
        </motion.article>
      ))}

      <div className="border-t border-[var(--sc-border)]" />
    </div>
  )
}

export default MaterialList