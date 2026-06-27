import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { dataConnections, dataPoints } from '../data/dataField'
import styles from '../styles/HeroDataField.module.css'

export function HeroDataField({ active, idle = false }) {
  const rootRef = useRef(null)
  const pointRefs = useRef([])
  const [viewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))

  useEffect(() => {
    if (!active) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28, ease: 'power2.out' })
    }, rootRef)

    return () => ctx.revert()
  }, [active])

  useEffect(() => {
    if (!active || !idle) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.set(pointRefs.current, { x: 0, y: 0 })

      if (!reduceMotion) {
        pointRefs.current.forEach((point, index) => {
          gsap.to(point, {
            x: index % 2 === 0 ? 3 : -2,
            y: index % 3 === 0 ? -3 : 2,
            duration: 5.5 + (index % 5) * 0.45,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.035,
          })

          if (index % 11 === 0) {
            gsap.to(point, {
              opacity: 0.36,
              duration: 4.8 + (index % 3) * 0.6,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: index * 0.04,
            })
          }
        })
      }
    }, rootRef)

    return () => ctx.revert()
  }, [active, idle])

  if (!active) return null

  return (
    <svg className={styles.field} ref={rootRef} viewBox={`0 0 ${viewport.width} ${viewport.height}`} preserveAspectRatio="none" aria-hidden="true">
      <g className={styles.lines}>
        {dataConnections.map(([from, to]) => {
          const source = [
            (dataPoints[from].final[0] / 100) * viewport.width,
            (dataPoints[from].final[1] / 100) * viewport.height,
          ]
          const target = [
            (dataPoints[to].final[0] / 100) * viewport.width,
            (dataPoints[to].final[1] / 100) * viewport.height,
          ]
          return (
            <line
              key={`${from}-${to}`}
              x1={source[0]}
              y1={source[1]}
              x2={target[0]}
              y2={target[1]}
            />
          )
        })}
      </g>
      <g className={styles.points}>
        {dataPoints.map((point, index) => (
          <circle
            key={`${point.final[0]}-${point.final[1]}`}
            ref={(node) => { pointRefs.current[index] = node }}
            data-hero-point={index}
            cx={(point.final[0] / 100) * viewport.width}
            cy={(point.final[1] / 100) * viewport.height}
            r={point.size / 2}
          />
        ))}
      </g>
    </svg>
  )
}
