import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

function FurnitureShowcase({ items, loop = true }) {
  const flowRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const loopItems = loop ? [...items, ...items] : items

  // The flow only runs while it can actually be seen.
  useEffect(() => {
    const flow = flowRef.current

    if (!flow) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      flow.classList.toggle('is-paused', !entry.isIntersecting)
    })

    observer.observe(flow)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="furniture-flow" ref={flowRef}>
      <div className="furniture-track">

        {loopItems.map((item, index) => {
          const position = index % items.length
          const clone = loop && index >= items.length

          return (
            <motion.article
              key={`${item.id}-${index}`}
              className={`furniture-card furniture-card-${position}`}
              data-clone={clone ? 'true' : undefined}
              aria-hidden={clone ? 'true' : undefined}
              inert={clone}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: 78, y: 18, scale: 0.96 }
              }
              animate={
                reduceMotion
                  ? undefined
                  : { opacity: 1, x: 0, y: 0, scale: 1 }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 1.4,
                      ease: [0.4, 0, 0.2, 1],
                      delay: position * 0.06,
                      opacity: {
                        duration: 1.8,
                        ease: 'easeInOut',
                        delay: position * 0.06,
                      },
                    }
              }
            >
              <div className="furniture-card-frame">
                <div className="furniture-card-image-wrap">
                  <img
                    src={item.image}
                    alt={`${item.name} furniture`}
                    className="furniture-card-image"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="furniture-card-image-overlay" />

                  <span className="furniture-card-number">
                    {item.number}
                  </span>

                  <Link
                    to="/estimator"
                    className="furniture-card-arrow"
                    aria-label={`Explore the estimator for ${item.name}`}
                  >
                    ↗
                  </Link>
                </div>

                <div className="furniture-card-info">
                  <div>
                    <p className="furniture-card-category">
                      {item.material}
                    </p>

                    <h3>{item.name}</h3>
                  </div>

                  <p className="furniture-card-planning">
                    {item.planning}
                  </p>
                </div>
              </div>
            </motion.article>
          )
        })}

      </div>
    </div>
  )
}

export default FurnitureShowcase