'use client'

import { useEffect, useState, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const codeLines = [
  { text: 'const developer = {', kind: 'keyword' },
  { text: '  role: "Full-Stack Developer",', kind: 'default' },
  { text: '  stack: ["React", "Java", "Python"],', kind: 'default' },
  { text: '  location: "Tunis, TN",', kind: 'default' },
  { text: '  openToWork: true,', kind: 'default' },
  { text: '  // build · ship · improve', kind: 'comment' },
  { text: '  ship(idea) { return "reality"; }', kind: 'function' },
  { text: '};', kind: 'default' },
]

const fullCode = codeLines.map((line) => line.text).join('\n')

function ColorizedCode({ line, text }: { line: number; text: string }) {
  if (line === 0) {
    return <><span className="rw-code-keyword">{text.slice(0, 5)}</span>{text.slice(5, 6)}<span className="rw-code-function">{text.slice(6, 15)}</span>{text.slice(15)}</>
  }
  if (line === 5) return <span className="rw-code-comment">{text}</span>
  if (line === 6) {
    return <>{text.slice(0, 2)}<span className="rw-code-function">{text.slice(2, 6)}</span>{text.slice(6, 15)}<span className="rw-code-keyword">{text.slice(15, 21)}</span>{text.slice(21, 22)}<span className="rw-code-string">{text.slice(22, 31)}</span>{text.slice(31)}</>
  }

  const stringPattern = /"[^"]*"/g
  const parts: ReactNode[] = []
  let start = 0
  let match: RegExpExecArray | null
  while ((match = stringPattern.exec(text))) {
    if (match.index > start) parts.push(text.slice(start, match.index))
    parts.push(<span className="rw-code-string" key={`${line}-${match.index}`}>{match[0]}</span>)
    start = match.index + match[0].length
  }
  if (start < text.length) parts.push(text.slice(start))
  const rendered = parts.map((part, index) => {
    if (typeof part !== 'string' || line !== 4) return part
    return part.split('true').map((chunk, chunkIndex) => (
      <span key={`${index}-${chunkIndex}`}>
        {chunk}
        {chunkIndex < part.split('true').length - 1 && <span className="rw-code-value">true</span>}
      </span>
    ))
  })
  return <>{rendered}</>
}

export default function HeroScene() {
  const [characters, setCharacters] = useState(0)
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useSpring(pointerX, { stiffness: 90, damping: 22 })
  const rotateX = useSpring(pointerY, { stiffness: 90, damping: 22 })

  useEffect(() => {
    if (reducedMotion) {
      setCharacters(fullCode.length)
      return
    }

    let current = 0
    const timer = window.setInterval(() => {
      current += 1
      setCharacters(current)
      if (current >= fullCode.length) window.clearInterval(timer)
    }, 22)
    return () => window.clearInterval(timer)
  }, [reducedMotion])

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 22)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -18)
  }
  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  let remaining = characters
  return (
    <div className="rw-code-scene" onPointerMove={onPointerMove} onPointerLeave={resetPointer} aria-label="Scène 3D de code développeur">
      <motion.div className="rw-code-stage" style={{ rotateX, rotateY }}>
        <div className="rw-code-layer rw-code-layer--back" aria-hidden="true" />
        <div className="rw-code-layer rw-code-layer--front" aria-hidden="true" />
        <div className="rw-code-window">
          <div className="rw-code-window-bar">
            <i /><i /><i /><span>developer.ts</span>
          </div>
          <pre aria-label={fullCode}>
            {codeLines.map((line, index) => {
              const visible = line.text.slice(0, Math.max(0, Math.min(line.text.length, remaining)))
              remaining -= line.text.length
              if (index < codeLines.length - 1) remaining -= 1
              return (
                <span className="rw-code-line" key={line.text}>
                  <ColorizedCode line={index} text={visible} />
                  {index < codeLines.length - 1 ? '\n' : ''}
                </span>
              )
            })}
            {!reducedMotion && characters < fullCode.length && <span className="rw-code-caret" aria-hidden="true">▌</span>}
          </pre>
        </div>
        <div className="rw-code-badge rw-code-badge--react"><b>⚛</b>React / Next.js</div>
        <div className="rw-code-badge rw-code-badge--java"><b>⌘</b>Java · Jakarta EE</div>
        <div className="rw-code-badge rw-code-badge--python"><b>Py</b>Python · IA</div>
        <div className="rw-code-badge rw-code-badge--database"><b>▤</b>PostgreSQL · Oracle</div>
        {!reducedMotion && <div className="rw-code-cube" aria-hidden="true">
          <span>&lt;/&gt;</span><span>API</span><span>SQL</span><span>TS</span><span>JAVA</span><span>AI</span>
        </div>}
      </motion.div>
    </div>
  )
}
