"use client";

import { useState } from 'react'
import type { MediaAsset } from '@/types/narrative'
import { siteConfig } from '@/config/siteConfig'

interface Props {
  asset: MediaAsset
  className?: string
}

export function SafeImage({ asset, className }: Props) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        className={className}
        role="img"
        aria-label={asset.alt}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 220,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(150deg, var(--peat), var(--night))',
          color: 'var(--gold)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        {siteConfig.copy.imageUnavailable}
      </div>
    )
  }
  return (
    <img
      className={`${className ?? ''} film-warmth`}
      src={asset.src}
      alt={asset.alt}
      loading="lazy"
      style={asset.position ? { objectPosition: asset.position } : undefined}
      onError={() => setFailed(true)}
    />
  )
}
