"use client";

import { useEffect, useRef } from 'react'
import type { MapLocation } from '@/types/narrative'
import { siteConfig } from '@/config/siteConfig'
import { useHaptic } from '@/hooks/useHaptic'

interface Props {
  location: MapLocation | null
  onClose: () => void
}

export function MapModal({ location, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const vibrate = useHaptic()

  useEffect(() => {
    if (!location) return
    vibrate(15)
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [location, onClose, vibrate])

  if (!location) return null

  const embed = `https://www.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`

  return (
    <div className="mapmodal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="mapmodal"
        role="dialog"
        aria-modal="true"
        aria-label={`${siteConfig.copy.mapTitle}: ${location.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mapmodal-head">
          <div>
            <h3 className="mapmodal-title">{location.name}</h3>
            <p className="mapmodal-coords">{location.dms}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="mapmodal-close"
            onClick={onClose}
            aria-label={siteConfig.copy.mapClose}
          >
            ✕
          </button>
        </div>
        <div className="mapmodal-frame">
          <iframe title={`${siteConfig.copy.mapTitle} — ${location.name}`} src={embed} loading="lazy" allowFullScreen />
        </div>
        <div className="mapmodal-foot">
          <p className="mapmodal-address">{location.address}</p>
          <a className="mapmodal-directions" href={directions} target="_blank" rel="noreferrer">
            {siteConfig.copy.mapDirections} ↗
          </a>
        </div>
      </div>
    </div>
  )
}
