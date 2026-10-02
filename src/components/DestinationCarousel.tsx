"use client";

import { useState, useEffect, useCallback } from 'react';
import type { DestinationPhotoItem } from '@/types/narrative';

interface Props {
  items: DestinationPhotoItem[];
}

export function DestinationCarousel({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const length = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % length);
  }, [length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    if (length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [length, isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const activeItem = items[currentIndex];
  if (!activeItem) return null;

  return (
    <div
      className="destination-carousel-wrapper my-8 relative w-full overflow-hidden rounded-2xl bg-[#f4efe6] border border-[#705c30]/15 shadow-[0_12px_40px_-15px_rgba(46,50,48,0.15)] transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-reveal
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#705c30]/10 bg-[#ede5d8]/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4a7c59] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#705c30] font-semibold">
            {length > 1 ? `Galeri Destinasi Terkait (${currentIndex + 1}/${length})` : 'Destinasi Terkait'}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#5d6660]/75 hidden sm:inline-block">
          Klik foto untuk rute Google Maps ↗
        </span>
      </div>

      <div className="relative group aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#232a25]">
        <a
          href={activeItem.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full cursor-pointer relative"
          title={`Buka peta lokasi ${activeItem.name} di Google Maps`}
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                idx === currentIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>
          ))}

          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[11px] tracking-wide border border-white/20 shadow-md group-hover:bg-[#4a7c59] group-hover:border-[#f5d070]/60 transition-colors duration-300">
              <span>Google Maps</span>
              <span className="text-[#f5d070] font-bold">↗</span>
            </span>
          </div>

          {activeItem.category && (
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#faf6f0]/90 backdrop-blur-md text-[#4a7c59] font-mono text-[11px] font-semibold tracking-wider border border-[#4a7c59]/20 shadow-sm">
                {activeItem.category}
              </span>
            </div>
          )}
        </a>

        {length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 hover:bg-black/80 text-white border border-white/25 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm shadow-md"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Foto selanjutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 hover:bg-black/80 text-white border border-white/25 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm shadow-md"
            >
              ›
            </button>
          </>
        )}

        {length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-[#f5d070]'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Lihat foto ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 bg-[#faf6f0]">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2e3230] tracking-tight">
            {activeItem.name}
          </h3>
          <a
            href={activeItem.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4a7c59] hover:text-[#3c6548] font-semibold underline underline-offset-4 decoration-[#4a7c59]/40 hover:decoration-[#4a7c59] transition-colors"
          >
            <span>Buka Petunjuk Arah</span>
            <span>↗</span>
          </a>
        </div>

        {activeItem.highlight && (
          <div className="inline-block font-mono text-xs text-[#705c30] font-medium tracking-wide mb-2.5">
            ✦ {activeItem.highlight}
          </div>
        )}

        <p className="font-sans text-sm sm:text-base text-[#5d6660] leading-relaxed font-light">
          {activeItem.description}
        </p>
      </div>
    </div>
  );
}
