"use client";

import type { ChapterConfig, MapLocation } from '@/types/narrative'
import { CapsuleButton } from './CapsuleButton'
import { SafeImage } from './SafeImage'
import { DestinationCarousel } from './DestinationCarousel'

interface Props {
  chapter: ChapterConfig
  locations: Record<string, MapLocation>
  onOpenMap: (location: MapLocation) => void
}

export function ChapterSection({ chapter, locations, onOpenMap }: Props) {
  return (
    <section className="chapter" id={chapter.id} aria-label={`${chapter.gate} — ${chapter.title}`}>
      <p className="chapter-gate" data-reveal>
        {chapter.gate} · {chapter.title}
      </p>

      <div className="chapter-head">
        <h2 className="chapter-title" data-reveal>
          {chapter.title}
        </h2>
        <div data-reveal>
          <p className="chapter-summary">{chapter.summary}</p>
          <span className="hero-coords" style={{ color: 'var(--peat)' }}>
            {chapter.coordinates}
          </span>
        </div>
      </div>

      <figure className="chapter-figure" data-reveal>
        <SafeImage asset={chapter.image} />
        <figcaption>
          {chapter.badge} · {chapter.coordinates}
        </figcaption>
      </figure>

      <div className="chapter-body">
        <div className="chapter-text">
          <p className="chapter-lede" data-reveal>
            {chapter.lede}
          </p>
          {chapter.paragraphs.slice(0, 1).map((p) => (
            <p key={p.slice(0, 24)} data-reveal>
              {p}
            </p>
          ))}
          <blockquote className="chapter-quote" data-reveal>
            <p>“{chapter.quote}”</p>
            <cite>— {chapter.quoteAttribution}</cite>
          </blockquote>
          {chapter.paragraphs.slice(1).map((p) => (
            <p key={p.slice(0, 24)} data-reveal>
              {p}
            </p>
          ))}
          {chapter.gallery && chapter.gallery.length > 0 && (
            <DestinationCarousel items={chapter.gallery} />
          )}
          <div className="chapter-locations" data-reveal>
            {chapter.locations.map((id) =>
              locations[id] ? (
                <CapsuleButton key={id} location={locations[id]} onOpen={onOpenMap} />
              ) : null,
            )}
          </div>
        </div>
        <aside className="marginalia" aria-label="Catatan tepi">
          {chapter.marginalia.map((note) => (
            <div className="marginal-note" key={note.heading} data-reveal>
              <h4>{note.heading}</h4>
              <p>{note.text}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  )
}
