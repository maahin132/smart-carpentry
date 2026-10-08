import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import FurnitureShowcase from './FurnitureShowcase'
import './furniture.css'

const furnitureItems = [
  {
    id: 'wardrobe',
    number: '01',
    name: 'Wardrobe',
    description:
      'Storage systems planned around available space, dimensions and everyday use.',
    material: 'Plywood / MDF',
    planning: 'Custom dimensions',
    image: '/images/furniture/wardrobe.jpg',
  },
  {
    id: 'kitchen',
    number: '02',
    name: 'Modular Kitchen',
    description:
      'Cabinet planning focused on practical storage, workflow and efficient material use.',
    material: 'Plywood / MDF',
    planning: 'Wall + base units',
    image: '/images/furniture/kitchen.jpg',
  },
  {
    id: 'tv-unit',
    number: '03',
    name: 'TV Unit',
    description:
      'Integrated storage and display planned around the room, screen and electrical requirements.',
    material: 'Plywood / MDF',
    planning: 'Custom dimensions',
    image: '/images/furniture/tv-unit.jpg',
  },
  {
    id: 'bed',
    number: '04',
    name: 'Bed',
    description:
      'Furniture planned around mattress dimensions, storage requirements and room space.',
    material: 'Plywood / Blockboard',
    planning: 'Standard / custom',
    image: '/images/furniture/bed.jpg',
  },
  {
    id: 'study',
    number: '05',
    name: 'Study Table',
    description:
      'Compact workspaces designed around comfortable dimensions and everyday use.',
    material: 'Plywood / MDF',
    planning: 'Custom dimensions',
    image: '/images/furniture/study.webp',
  },
  {
    id: 'storage',
    number: '06',
    name: 'Storage',
    description:
      'Practical storage systems designed for organized interiors and efficient space use.',
    material: 'Plywood / MDF',
    planning: 'Custom dimensions',
    image: '/images/furniture/storage.jpg',
  },
]

function Furniture({ showViewAll = false, compact = false }) {
  const location = useLocation()
  const items = compact ? furnitureItems.slice(0, 4) : furnitureItems
  return (
    <section
      id="furniture"
      className={`furniture-section${compact ? ' furniture-section--compact' : ''}`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        <motion.div
          className="furniture-heading-block"
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="furniture-eyebrow">
              {compact ? 'Featured furniture' : 'Furniture System'}
            </p>

            <h2 className="furniture-heading">
              {compact ? (
                <>
                  Made for
                  <br />
                  <span>your space.</span>
                </>
              ) : (
                <>
                  Built around
                  <br />
                  <span>the way you build.</span>
                </>
              )}
            </h2>
          </div>

          <div className="furniture-heading-copy">
            <p>
              {compact
                ? 'Three project types to get you started. Dimensions stay yours.'
                : 'Explore the furniture systems you build most often. From material planning to finished construction, every project starts with knowing what goes into it.'}
            </p>

            <div className="furniture-heading-line">
              <span />
              {compact ? 'Custom dimensions' : 'Real furniture / Real planning'}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="furniture-flow-caption"
          initial={{ opacity: 1, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
        >
          <span>{compact ? 'Selected projects' : 'Furniture collection'}</span>

          <span>
            {compact
              ? `${String(items.length).padStart(2, '0')} / ${String(furnitureItems.length).padStart(2, '0')}`
              : `Real projects / ${String(items.length).padStart(2, '0')}`}
          </span>
        </motion.div>
        {showViewAll && location.pathname === '/' && (
          <Link className="sc-text-link mt-6" to="/furniture">View all furniture <span aria-hidden="true">→</span></Link>
        )}
      </div>

      <FurnitureShowcase items={items} loop={!compact} />

      {!compact && <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        <motion.div
          className="furniture-flowline"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Measure</span>
          <span>Plan</span>
          <span>Calculate</span>
          <span>Optimize</span>
          <span>Build</span>
        </motion.div>
        <Link className="sc-text-link mt-6" to="/estimator">Plan a furniture project <span aria-hidden="true">→</span></Link>

      </div>}
    </section>
  )
}

export default Furniture