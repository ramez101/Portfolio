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
      <svg className="hero-scene__network" viewBox="0 0 720 620" preserveAspectRatio="none" aria-hidden="true">
        <g className="hero-scene__network-lines">
          <path d="M24 118L164 74L248 184L382 94L514 148L688 52" />
          <path d="M24 118L108 310L248 184L320 354L514 148L596 312L688 52" />
          <path d="M108 310L34 526L196 468L320 354L438 544L596 312L688 486" />
          <path d="M196 468L320 354L438 544L596 312" />
        </g>
        <g className="hero-scene__network-nodes">
          <circle cx="24" cy="118" r="3" /><circle cx="164" cy="74" r="4" />
          <circle cx="248" cy="184" r="3" /><circle cx="382" cy="94" r="3" />
          <circle cx="514" cy="148" r="4" /><circle cx="688" cy="52" r="3" />
          <circle cx="108" cy="310" r="3" /><circle cx="320" cy="354" r="4" />
          <circle cx="596" cy="312" r="3" /><circle cx="34" cy="526" r="3" />
          <circle cx="196" cy="468" r="4" /><circle cx="438" cy="544" r="3" />
          <circle cx="688" cy="486" r="4" />
        </g>
      </svg>
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
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 560px"
              quality={100}
              className="object-cover object-[50%_36%]"
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

      <div className="hero-scene__rail" aria-hidden="true">
        <span className="hero-scene__rail-active">01</span>
        <span>02</span>
        <span>03</span>
        <i />
      </div>
    </div>
  )
}
