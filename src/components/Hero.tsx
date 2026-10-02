"use client";

import { useRef, useState } from 'react'
import type { HeroConfig } from '@/types/narrative'

interface Props {
  hero: HeroConfig
  scrollTargetId: string
  scrollLabel: string
}

export function Hero({ hero, scrollTargetId, scrollLabel }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  const scrollNext = () => {
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="hero" id="prolog">
      <div className="hero-media" aria-hidden="true">
        <img className="film-warmth" src={hero.image.src} alt="" style={{ objectPosition: hero.image.position }} />
        {!videoFailed && (
          <video
            ref={videoRef}
            className={videoReady ? 'is-ready film-warmth' : 'film-warmth'}
            src={hero.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          />
        )}
      </div>
      <div className="hero-shade" />
      <div className="hero-inner">
        <p className="hero-kicker" data-reveal>
          {hero.kicker}
        </p>
        <h1 className="hero-title" data-reveal>
          Narasi Kota <em>Khatulistiwa</em>
        </h1>
        <p className="hero-statement" data-reveal>
          {hero.statement}
        </p>
        <div className="hero-meta" data-reveal>
          <span className="hero-coords">{hero.coordinates}</span>
        </div>
      </div>
      <button type="button" className="hero-scrollcue" onClick={scrollNext} aria-label={scrollLabel}>
        <span className="cue-label">{scrollLabel}</span>
        <span className="cue-arrow" aria-hidden="true">
          ↓
        </span>
      </button>
    </header>
  )
}
