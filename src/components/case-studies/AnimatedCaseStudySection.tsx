'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function AnimatedCaseStudySection({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 space-y-10"
    >
      {children}
    </motion.section>
  )
}
