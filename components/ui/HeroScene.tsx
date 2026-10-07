'use client'

import Image from 'next/image'
import { useState } from 'react'

type Tilt = { x: number; y: number }

export default function HeroScene() {
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 })

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2

    setTilt({ x: Number((x * 8).toFixed(2)), y: Number((-y * 8).toFixed(2)) })
  }

  return (
    <div
      className="hero-scene"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      aria-label="Portrait de Ramez Werfelli au centre d’une scène 3D interactive"
      role="img"
    >
      <div className="hero-scene__stars" aria-hidden="true" />
      <div className="hero-scene__glow hero-scene__glow--one" aria-hidden="true" />
      <div className="hero-scene__glow hero-scene__glow--two" aria-hidden="true" />

      <div
        className="hero-scene__stage"
        style={{
          '--scene-x': `${tilt.x}deg`,
          '--scene-y': `${tilt.y}deg`,
        } as React.CSSProperties}
      >
        <div className="hero-scene__orbit hero-scene__orbit--one" aria-hidden="true" />
        <div className="hero-scene__orbit hero-scene__orbit--two" aria-hidden="true" />
        <div className="hero-scene__orbit hero-scene__orbit--three" aria-hidden="true" />

        <div className="hero-scene__code hero-scene__code--top" aria-hidden="true">
          <span>&lt;Ramez /&gt;</span>
          <i />
        </div>

        <div className="hero-scene__portrait-wrap">
          <div className="hero-scene__portrait-glow" aria-hidden="true" />
          <div className="hero-scene__portrait">
            <Image
              src="/Ramez.jpg"
              alt="Ramez Werfelli, développeur web full-stack"
              fill
              sizes="(max-width: 1024px) 280px, 330px"
              quality={78}
              className="object-cover object-[50%_42%]"
              priority
            />
            <div className="hero-scene__scanline" aria-hidden="true" />
          </div>
          <div className="hero-scene__status">
            <span />
            <span>Create with passion</span>
          </div>
        </div>

        <div className="hero-scene__code hero-scene__code--bottom" aria-hidden="true">
          <span>full_stack.dev</span>
          <b>100%</b>
        </div>
      </div>

      <div className="hero-scene__label hero-scene__label--react" aria-hidden="true">
        <span className="hero-scene__label-icon">⚛</span>
        React / Next.js
      </div>
      <div className="hero-scene__label hero-scene__label--java" aria-hidden="true">
        <span className="hero-scene__label-icon">⌘</span>
        Java · IA · SQL
      </div>
    </div>
  )
}
