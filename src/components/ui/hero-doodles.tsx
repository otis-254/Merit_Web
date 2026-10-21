'use client'

import { motion, useReducedMotion } from 'framer-motion'

const circles = [
  { size: 82, left: '4%', top: '18%', drift: 38, delay: 0.1 },
  { size: 46, left: '18%', top: '72%', drift: -24, delay: 0.5 },
  { size: 118, left: '78%', top: '12%', drift: -40, delay: 0.3 },
  { size: 58, left: '88%', top: '64%', drift: 28, delay: 0.8 },
  { size: 70, left: '59%', top: '78%', drift: -34, delay: 0.2 },
  { size: 36, left: '43%', top: '9%', drift: 22, delay: 0.7 },
]

export function HeroDoodles({ tone = 'light' }: { tone?: 'light' | 'inverse' }) {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className={`hero-doodles hero-doodles--${tone}`} data-hero-doodles>
      {circles.map((circle, index) => (
        <motion.span
          key={index}
          className="hero-doodles__bubble"
          style={{ height: circle.size, left: circle.left, top: circle.top, width: circle.size }}
          animate={reduceMotion ? undefined : { x: [0, circle.drift, 0], y: [0, -circle.drift * 0.45, 0], rotate: [0, index % 2 ? -8 : 8, 0] }}
          transition={{ delay: circle.delay, duration: 10 + index * 1.2, ease: 'easeInOut', repeat: Infinity }}
        />
      ))}
      <motion.svg className="hero-doodles__scribble hero-doodles__scribble--one" viewBox="0 0 180 120" fill="none" animate={reduceMotion ? undefined : { rotate: [0, 5, 0], y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M14 82C32 32 52 24 70 66s34 38 50-4 30-45 46-12" />
      </motion.svg>
      <motion.svg className="hero-doodles__scribble hero-doodles__scribble--two" viewBox="0 0 100 100" fill="none" animate={reduceMotion ? undefined : { rotate: [0, -12, 0], scale: [1, 1.08, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M50 8 61 38l31 2-24 20 8 31-26-17-26 17 8-31L8 40l31-2L50 8Z" />
      </motion.svg>
    </div>
  )
}
