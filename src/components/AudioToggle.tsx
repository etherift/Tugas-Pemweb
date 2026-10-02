"use client";

import { useEffect, useRef, useState } from 'react'
import type { AudioTrack } from '@/types/narrative'
import { siteConfig } from '@/config/siteConfig'
import { useHaptic } from '@/hooks/useHaptic'

const TRACK_SOURCES: Record<AudioTrack, string> = {
  kapuas: '/media/amb-kapuas.mp3',
  rimba: '/media/amb-rimba.mp3',
  sapeh: '/media/amb-sapeh.mp3',
  kopi: '/media/amb-kopi.mp3',
}

const TRACK_LABELS: Record<AudioTrack, string> = {
  kapuas: 'RIAK KAPUAS',
  rimba: 'NAPAS RIMBA',
  sapeh: 'DAWAI SAPEH',
  kopi: 'PAGI WARKOP',
}

const FADE_MS = 1400

interface Props {
  track: AudioTrack
}

export function AudioToggle({ track }: Props) {
  const [playing, setPlaying] = useState(false)
  const [hintVisible, setHintVisible] = useState(false)
  const [activeTrack, setActiveTrack] = useState<AudioTrack>(track)
  const currentTrack = useRef<AudioTrack>(track)
  const players = useRef<Map<AudioTrack, HTMLAudioElement>>(new Map())
  const rampTimer = useRef<number>(0)
  const vibrate = useHaptic()

  useEffect(() => {
    const t1 = setTimeout(() => setHintVisible(true), 4500)
    const t2 = setTimeout(() => setHintVisible(false), 12000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const getPlayer = (key: AudioTrack) => {
    let el = players.current.get(key)
    if (!el) {
      el = new Audio(TRACK_SOURCES[key])
      el.loop = true
      el.volume = 0
      players.current.set(key, el)
    }
    return el
  }

  const rampTo = (el: HTMLAudioElement, target: number) => {
    const start = el.volume
    const t0 = performance.now()
    cancelAnimationFrame(rampTimer.current)
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / FADE_MS)
      el.volume = Math.max(0, Math.min(1, start + (target - start) * t))
      if (t < 1) {
        rampTimer.current = requestAnimationFrame(step)
      } else if (target === 0) {
        el.pause()
      }
    }
    rampTimer.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    if (!playing || track === currentTrack.current) return
    const prev = players.current.get(currentTrack.current)
    if (prev) rampTo(prev, 0)
    const next = getPlayer(track)
    next.play().catch(() => setPlaying(false))
    rampTo(next, 0.55)
    currentTrack.current = track
    setActiveTrack(track)
  }, [track, playing])

  useEffect(() => {
    const pool = players.current
    return () => {
      cancelAnimationFrame(rampTimer.current)
      pool.forEach((el) => el.pause())
    }
  }, [])

  const toggle = () => {
    vibrate(15)
    setHintVisible(false)
    if (playing) {
      const el = players.current.get(currentTrack.current)
      if (el) rampTo(el, 0)
      setPlaying(false)
    } else {
      const el = getPlayer(track)
      el.play()
        .then(() => {
          rampTo(el, 0.55)
          currentTrack.current = track
          setActiveTrack(track)
          setPlaying(true)
        })
        .catch(() => setPlaying(false))
    }
  }

  return (
    <>
      <div className={`audio-hint ${hintVisible && !playing ? 'is-visible' : ''}`} role="status">
        {siteConfig.copy.audioHint}
      </div>
      <button
        type="button"
        className={`audio-fab ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? siteConfig.copy.audioOn : siteConfig.copy.audioOff}
      >
        <span className="audio-eq" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="audio-fab-label">
          {playing ? TRACK_LABELS[activeTrack] : siteConfig.copy.audioOff}
        </span>
      </button>
    </>
  )
}
