'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export default function Background() {
  const { scrollY } = useScroll()
  const reducedMotion = useReducedMotion()
  const firstBlob = useTransform(scrollY, [0, 3000], [0, reducedMotion ? 0 : 180])
  const secondBlob = useTransform(scrollY, [0, 3000], [0, reducedMotion ? 0 : -220])
  const thirdBlob = useTransform(scrollY, [0, 3000], [0, reducedMotion ? 0 : 120])

  return (
    <div className="rw-background" aria-hidden="true">
      <motion.div className="rw-background-blob rw-background-blob--one" style={{ y: firstBlob }} />
      <motion.div className="rw-background-blob rw-background-blob--two" style={{ y: secondBlob }} />
      <motion.div className="rw-background-blob rw-background-blob--three" style={{ y: thirdBlob }} />
    </div>
  )
}
