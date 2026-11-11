'use client'

import { useEffect, useState } from 'react'

const phrases = [
  '> Full-Stack Developer',
  '> Java · Jakarta EE',
  '> React · Next.js',
  '> Python · IA',
]

export default function Typewriter() {
  const [text, setText] = useState('')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      setText(phrases[0])
      return
    }

    let phraseIndex = 0
    let characterIndex = 0
    let deleting = false
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      const phrase = phrases[phraseIndex]

      if (!deleting) {
        characterIndex += 1
        setText(phrase.slice(0, characterIndex))
        if (characterIndex === phrase.length) {
          deleting = true
          timeout = setTimeout(tick, 1500)
          return
        }
      } else {
        characterIndex -= 1
        setText(phrase.slice(0, characterIndex))
        if (characterIndex === 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % phrases.length
          timeout = setTimeout(tick, 280)
          return
        }
      }

      timeout = setTimeout(tick, deleting ? 38 : 82)
    }

    timeout = setTimeout(tick, 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <p className="rw-typewriter" aria-label="Full-Stack Developer, Java Jakarta EE, React Next.js, Python IA">
      <span aria-hidden="true">{text}</span>
      <span className="rw-typewriter-caret" aria-hidden="true" />
    </p>
  )
}
