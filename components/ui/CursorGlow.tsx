'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const pointerX = useMotionValue(-600)
  const pointerY = useMotionValue(-600)
  const x = useSpring(pointerX, { stiffness: 80, damping: 24, mass: 0.6 })
  const y = useSpring(pointerY, { stiffness: 80, damping: 24, mass: 0.6 })

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!pointer.matches || reducedMotion.matches) return

    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX - 260)
      pointerY.set(event.clientY - 260)
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [pointerX, pointerY])

  return (
    <motion.div
      className="rw-cursor-glow"
      style={{ x, y }}
      aria-hidden="true"
    />
  )
}
