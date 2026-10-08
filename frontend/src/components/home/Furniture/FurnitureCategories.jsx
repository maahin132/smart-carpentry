import { motion } from 'framer-motion'

function FurnitureCategories({ items, activeId, onChange }) {
  const activeIndex =
    items.findIndex((item) => item.id === activeId) + 1

  return (
    <aside className="furniture-categories">

      {/* Header */}
      <div className="furniture-categories-header">
        <span>Explore furniture</span>

        <motion.span
          key={activeId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          {String(activeIndex).padStart(2, '0')}
        </motion.span>
      </div>

      {/* Items */}
      <div className="furniture-category-list">

        {items.map((item) => {
          const active = item.id === activeId

          return (
            <motion.button
              key={item.id}
              type="button"
              className={`furniture-category ${
                active ? 'is-active' : ''
              }`}
              onMouseEnter={() => onChange(item.id)}
              onFocus={() => onChange(item.id)}
              onClick={() => onChange(item.id)}
              whileHover="hover"
            >

              {/* Active line */}
              <motion.span
                className="furniture-active-line"
                initial={false}
                animate={{
                  scaleY: active ? 1 : 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              <span className="furniture-category-number">
                {item.number}
              </span>

              <motion.span
                className="furniture-category-name"
                animate={{
                  x: active ? 8 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {item.name}
              </motion.span>

              <motion.span
                className="furniture-category-arrow"
                animate={{
                  opacity: active ? 1 : 0,
                  x: active ? 0 : -8,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                →
              </motion.span>

              {/* Hover sweep */}
              <motion.span
                className="furniture-hover-fill"
                variants={{
                  hover: {
                    scaleX: 1,
                  },
                }}
                initial={{
                  scaleX: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

            </motion.button>
          )
        })}
      </div>
    </aside>
  )
}

export default FurnitureCategories