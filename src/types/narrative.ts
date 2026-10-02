export type ChapterTheme =
  | 'mist-dew'
  | 'borneo-jungle'
  | 'equator-solar'
  | 'kapuas-waters'
  | 'coffee-spice'

export type AudioTrack = 'kapuas' | 'rimba' | 'sapeh' | 'kopi'

export interface MediaAsset {
  src: string
  alt: string
  position?: string
}

export interface MapLocation {
  id: string
  name: string
  capsule: string
  address: string
  dms: string
  lat: number
  lng: number
  mapX: number
  mapY: number
  category?: string
  highlight?: string
}

export interface MarginalNote {
  heading: string
  text: string
}

export interface DestinationPhotoItem {
  id: string
  name: string
  category?: string
  highlight?: string
  description: string
  image: string
  mapsUrl: string
}

export interface ChapterConfig {
  id: string
  index: string
  badge: string
  gate: string
  title: string
  summary: string
  coordinates: string
  image: MediaAsset
  lede: string
  paragraphs: string[]
  quote: string
  quoteAttribution: string
  marginalia: MarginalNote[]
  locations: string[]
  gallery?: DestinationPhotoItem[]
  audio: AudioTrack
}

export interface TransitionConfig {
  id: string
  theme: ChapterTheme
  badge: string
  caption: string
}

export interface HeroConfig {
  kicker: string
  title: string
  statement: string
  scrollLabel: string
  coordinates: string
  image: MediaAsset
  video: string
  audio: AudioTrack
}

export interface SiteConfig {
  locale: string
  siteTitle: string
  brand: { name: string; edition: string }
  hero: HeroConfig
  chapters: ChapterConfig[]
  transitions: TransitionConfig[]
  locations: Record<string, MapLocation>
  colophon: {
    quote: string
    note: string
    restartLabel: string
    credit: string
  }
  copy: {
    skipToContent: string
    continueJourney: string
    exploreFurther: string
    skipToNext: string
    audioHint: string
    audioOn: string
    audioOff: string
    mapTitle: string
    mapDirections: string
    mapClose: string
    imageUnavailable: string
    locationFallback: string
  }
}
