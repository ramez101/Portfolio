'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

export default function Counter({
  value,
  suffix = '',
}: {
  value: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reducedMotion = useReducedMotion()
  const count = useMotionValue(0)
  const spring = useSpring(count, {
    stiffness: 50,
    damping: 18,
    duration: 1.4,
  })
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`)

  useEffect(() => {
    if (inView) count.set(value)
  }, [count, inView, value])

  useEffect(() => {
    if (reducedMotion && inView) spring.jump(value)
  }, [inView, reducedMotion, spring, value])

  return <motion.span ref={ref} aria-label={`${value}${suffix}`}>{rounded}</motion.span>
}
