"use client";

import type { MapLocation } from '@/types/narrative'

interface Props {
  location: MapLocation
  variant?: 'light' | 'glass'
  onOpen: (location: MapLocation) => void
}

export function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export function CapsuleButton({ location, variant = 'light', onOpen }: Props) {
  return (
    <button
      type="button"
      className={`capsule capsule--${variant}`}
      onClick={() => onOpen(location)}
      aria-label={`${location.name} — lihat di peta`}
    >
      <PinIcon />
      <span>{location.capsule}</span>
      <span className="capsule-arrow" aria-hidden="true">
        ↗
      </span>
    </button>
  )
}
