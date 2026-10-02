"use client";

import { useEffect, useRef } from 'react'
import type { TransitionConfig } from '@/types/narrative'
import { useHaptic } from '@/hooks/useHaptic'

interface Props {
  transition: TransitionConfig
  nextSectionId: string
  skipLabel: string
}

interface Particle {
  x: number
  y: number
  size: number
  ampX: number
  ampY: number
  phase: number
  speed: number
  color: string
  round: boolean
}

const THEME_PARTICLES: Record<TransitionConfig['theme'], { colors: string[]; count: number; leaf: boolean }> = {
  'mist-dew': { colors: ['rgba(147,197,214,0.5)', 'rgba(250,246,240,0.35)'], count: 26, leaf: false },
  'borneo-jungle': { colors: ['rgba(122,168,135,0.55)', 'rgba(74,124,89,0.5)'], count: 22, leaf: true },
  'equator-solar': { colors: ['rgba(245,208,112,0.7)', 'rgba(212,163,75,0.55)'], count: 30, leaf: false },
  'kapuas-waters': { colors: ['rgba(147,197,214,0.6)', 'rgba(250,246,240,0.3)'], count: 28, leaf: false },
  'coffee-spice': { colors: ['rgba(212,163,75,0.6)', 'rgba(176,124,60,0.55)'], count: 24, leaf: false },
}

function rand(seed: number) {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return v - Math.floor(v)
}

function buildParticles(theme: TransitionConfig['theme']): Particle[] {
  const spec = THEME_PARTICLES[theme]
  const list: Particle[] = []
  for (let i = 0; i < spec.count; i++) {
    list.push({
      x: rand(i + 1) * 100,
      y: rand(i + 101) * 100,
      size: spec.leaf ? 5 + rand(i + 201) * 9 : 2.5 + rand(i + 201) * 6,
      ampX: 10 + rand(i + 301) * 26,
      ampY: 8 + rand(i + 401) * 22,
      phase: rand(i + 501) * Math.PI * 2,
      speed: 0.4 + rand(i + 601) * 0.9,
      color: spec.colors[i % spec.colors.length],
      round: !spec.leaf,
    })
  }
  return list
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export function ChapterTransition({ transition, nextSectionId, skipLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const aRef = useRef<HTMLDivElement>(null)
  const bRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const seamRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const milestoneFired = useRef(false)
  const vibrate = useHaptic()

  useEffect(() => {
    const wrap = wrapRef.current
    const a = aRef.current
    const b = bRef.current
    const core = coreRef.current
    const seam = seamRef.current
    const holder = particlesRef.current
    if (!wrap || !a || !b || !core || !seam || !holder) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const particles = buildParticles(transition.theme)
    const nodes = particles.map((p) => {
      const el = document.createElement('span')
      el.className = 'transition-particle'
      el.style.width = `${p.size}px`
      el.style.height = p.round ? `${p.size}px` : `${p.size * 0.45}px`
      el.style.background = p.color
      el.style.borderRadius = p.round ? '50%' : '60% 0 60% 0'
      el.style.filter = p.round ? `blur(${p.size > 6 ? 1.5 : 0}px)` : 'none'
      holder.appendChild(el)
      return el
    })

    let raf = 0
    const start = performance.now()

    const loop = () => {
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0

      const t1 = easeInOut(Math.min(1, p * 2))
      const t2 = easeInOut(Math.max(0, (p - 0.5) * 2))
      const aX = -100 * (1 - t1) - 100 * t2
      const bX = 100 * (1 - t1) + 100 * t2
      a.style.transform = `translate3d(${aX}%,0,0)`
      b.style.transform = `translate3d(${bX}%,0,0)`

      const fadeIn = Math.min(1, Math.max(0, (p - 0.12) / 0.3))
      const fadeOut = 1 - Math.min(1, Math.max(0, (p - 0.72) / 0.24))
      const opacity = Math.min(fadeIn, fadeOut)
      const lift = (1 - fadeIn) * 26 - (1 - fadeOut) * 26
      core.style.opacity = opacity.toFixed(3)
      core.style.transform = `translate3d(0,${lift.toFixed(1)}px,0) scale(${(0.96 + 0.06 * fadeIn).toFixed(3)})`

      seam.style.opacity = (Math.sin(p * Math.PI) * 0.9).toFixed(3)

      if (p > 0 && p < 1) {
        const time = (performance.now() - start) / 1000
        const vis = Math.sin(p * Math.PI)
        for (let i = 0; i < particles.length; i++) {
          const pt = particles[i]
          const node = nodes[i]
          const dx = Math.sin(time * pt.speed + pt.phase) * pt.ampX
          const dy = Math.cos(time * pt.speed * 0.8 + pt.phase) * pt.ampY - vis * 30
          node.style.transform = `translate3d(calc(${pt.x}vw + ${dx.toFixed(1)}px), calc(${pt.y}vh + ${dy.toFixed(1)}px), 0) rotate(${((time * 24 + pt.phase * 57) % 360).toFixed(0)}deg)`
          node.style.opacity = (vis * 0.9).toFixed(3)
        }
      }

      if (p >= 0.5 && !milestoneFired.current) {
        milestoneFired.current = true
        vibrate(15)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      nodes.forEach((n) => n.remove())
    }
  }, [transition.theme, vibrate])

  const skip = () => {
    document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`transition transition--${transition.theme}`} ref={wrapRef} aria-hidden="false">
      <div className="transition-sticky">
        <div ref={aRef} className="transition-curtain transition-curtain--a" style={{ transform: 'translate3d(-100%,0,0)' }} />
        <div ref={bRef} className="transition-curtain transition-curtain--b" style={{ transform: 'translate3d(100%,0,0)' }} />
        <div ref={seamRef} className="transition-seam" style={{ opacity: 0 }} />
        <div ref={particlesRef} className="transition-particles" aria-hidden="true" />
        <div ref={coreRef} className="transition-core" style={{ opacity: 0 }}>
          <p className="transition-badge">{transition.badge}</p>
          <p className="transition-caption">{transition.caption}</p>
        </div>
        <button type="button" className="transition-skip" onClick={skip}>
          {skipLabel} ↓
        </button>
      </div>
    </div>
  )
}

export default ChapterTransition;
