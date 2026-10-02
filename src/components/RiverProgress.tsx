"use client";

import { useEffect, useRef, useState } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface RailSection {
  id: string
  label: string
}

interface Props {
  sections: RailSection[]
  activeId: string
}

export function RiverProgress({ sections, activeId }: Props) {
  const progress = useScrollProgress()
  const pathRef = useRef<SVGPathElement>(null)
  const boatRef = useRef<SVGGElement>(null)
  const [ticks, setTicks] = useState<{ id: string; label: string; x: number; y: number; frac: number }[]>([])

  useEffect(() => {
    const measure = () => {
      const path = pathRef.current
      if (!path) return
      const len = path.getTotalLength()
      const max = document.documentElement.scrollHeight - window.innerHeight
      const next = sections.map((s) => {
        const el = document.getElementById(s.id)
        const frac = el && max > 0 ? Math.min(1, Math.max(0, el.offsetTop / max)) : 0
        const pt = path.getPointAtLength(len * frac)
        return { id: s.id, label: s.label, x: pt.x, y: pt.y, frac }
      })
      setTicks(next)
    }
    measure()
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 600)
    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(t)
    }
  }, [sections])

  useEffect(() => {
    const path = pathRef.current
    const boat = boatRef.current
    if (!path || !boat) return
    const pt = path.getPointAtLength(path.getTotalLength() * progress)
    boat.setAttribute('transform', `translate(${pt.x},${pt.y})`)
  }, [progress])

  const jump = (frac: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: frac * max, behavior: 'smooth' })
  }

  return (
    <nav className="river-rail" aria-label="Rel perjalanan Sungai Kapuas">
      <svg viewBox="0 0 60 1000" preserveAspectRatio="none" aria-hidden="false">
        <path
          ref={pathRef}
          className="river-path"
          d="M30 8 C 14 120, 48 220, 30 330 C 12 440, 50 540, 28 650 C 12 760, 46 860, 30 992"
        />
        <path
          className="river-path river-path--flow"
          d="M30 8 C 14 120, 48 220, 30 330 C 12 440, 50 540, 28 650 C 12 760, 46 860, 30 992"
          strokeDasharray="3 9"
        />
        {ticks.map((t) => (
          <g
            key={t.id}
            className={`river-tick ${activeId === t.id ? 'is-active' : ''}`}
            transform={`translate(${t.x},${t.y})`}
            onClick={() => jump(t.frac)}
            role="button"
            tabIndex={0}
            aria-label={t.label}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                jump(t.frac)
              }
            }}
          >
            <circle r="4.2" />
            <text x="11" y="3">
              {t.label}
            </text>
          </g>
        ))}
        <g ref={boatRef} className="river-boat">
          <path d="M-5 0 Q 0 -6 5 0 Q 0 3.5 -5 0 Z" />
        </g>
      </svg>
    </nav>
  )
}
