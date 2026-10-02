"use client";

import { siteConfig } from '@/config/siteConfig'
import { useHaptic } from '@/hooks/useHaptic'

export function Colophon() {
  const vibrate = useHaptic()
  const restart = () => {
    vibrate(15)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <footer className="colophon" id="kolofon">
      <p className="colophon-quote" data-reveal>
        {siteConfig.colophon.quote}
      </p>
      <p className="colophon-note" data-reveal>
        {siteConfig.colophon.note}
      </p>
      <button type="button" className="colophon-restart" onClick={restart} data-reveal>
        ↑ {siteConfig.colophon.restartLabel}
      </button>
      <p className="colophon-credit">{siteConfig.colophon.credit}</p>
    </footer>
  )
}
