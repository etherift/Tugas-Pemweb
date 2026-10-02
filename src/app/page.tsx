"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { siteConfig } from "@/config/siteConfig";
import type { AudioTrack, MapLocation } from "@/types/narrative";
import { Hero } from "@/components/Hero";
import { ChapterSection } from "@/components/ChapterSection";
import ChapterTransition from "@/components/ChapterTransition";
import { RiverProgress } from "@/components/RiverProgress";
import { AudioToggle } from "@/components/AudioToggle";
import { Colophon } from "@/components/Colophon";
import { MapModal } from "@/components/MapModal";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useReveal } from "@/hooks/useReveal";

const CHAPTER_LABELS = ['I', 'II', 'III', 'IV'];

export default function Home() {
  const [showCinematic, setShowCinematic] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("intro") === "false" || params.get("skip") === "true") {
        return false;
      }
    }
    return true;
  });
  const [isCinematicDismissing, setIsCinematicDismissing] = useState<boolean>(false);
  const [isCinematicMuted, setIsCinematicMuted] = useState<boolean>(false);
  const [hasEnteredExperience, setHasEnteredExperience] = useState<boolean>(false);
  const [isGateDismissing, setIsGateDismissing] = useState<boolean>(false);
  const [videoHasError, setVideoHasError] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const cinematicVideoSrc =
    process.env.NEXT_PUBLIC_CINEMATIC_VIDEO_URL ||
    "/videos/pontianak-intro-compressed.mp4";
  const isIframeVideo =
    cinematicVideoSrc.includes("player.cloudinary.com") ||
    cinematicVideoSrc.includes("embed") ||
    cinematicVideoSrc.includes("iframe");

  useReducedMotion();
  useReveal(showCinematic);

  const [mapLocation, setMapLocation] = useState<MapLocation | null>(null);

  const railSections = useMemo(
    () => [
      { id: 'prolog', label: '00' },
      ...siteConfig.chapters.map((c, i) => ({ id: c.id, label: CHAPTER_LABELS[i] ?? c.index })),
      { id: 'kolofon', label: 'V' },
    ],
    [],
  );
  const sectionIds = useMemo(() => railSections.map((s) => s.id), [railSections]);
  const activeSection = useActiveSection(sectionIds);

  const activeChapter = siteConfig.chapters.find((c) => c.id === activeSection);
  const activeTrack: AudioTrack = activeChapter ? activeChapter.audio : siteConfig.hero.audio;

  const handleDismissCinematic = useCallback(() => {
    setIsCinematicDismissing(true);

    const scrollToTarget = () => {
      const target = document.getElementById("prolog") || document.querySelector("main");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToTarget();

    setTimeout(() => {
      setShowCinematic(false);
      setIsCinematicDismissing(false);
      scrollToTarget();
    }, 650);
  }, []);

  const toggleVideoPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, []);

  const handlePermitSoundAndEnter = useCallback(async () => {
    if (isGateDismissing) return;
    setIsGateDismissing(true);
    setIsCinematicMuted(false);

    const video = videoRef.current;
    if (video) {
      try {
        if (video.readyState >= 1) {
          video.currentTime = 0;
        }
      } catch { }

      video.muted = false;
      video.volume = 0.85;

      try {
        await video.play();
      } catch {
        if (video) {
          video.muted = true;
          setIsCinematicMuted(true);
          try {
            await video.play();
          } catch { }
        }
      }
    }

    setTimeout(() => {
      setHasEnteredExperience(true);
      setIsGateDismissing(false);
    }, 700);
  }, [isGateDismissing]);

  const handleEnterSilent = useCallback(async () => {
    if (isGateDismissing) return;
    setIsGateDismissing(true);
    setIsCinematicMuted(true);

    const video = videoRef.current;
    if (video) {
      try {
        if (video.readyState >= 1) {
          video.currentTime = 0;
        }
      } catch { }

      video.muted = true;
      try {
        await video.play();
      } catch { }
    }

    setTimeout(() => {
      setHasEnteredExperience(true);
      setIsGateDismissing(false);
    }, 700);
  }, [isGateDismissing]);

  const toggleCinematicAudio = useCallback(() => {
    setIsCinematicMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
        if (!next) {
          videoRef.current.volume = 0.85;
          void videoRef.current.play().catch(() => { });
        }
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!showCinematic || !hasEnteredExperience) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 60) {
        handleDismissCinematic();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      if (touchStartY - currentY > 80) {
        handleDismissCinematic();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "Escape") {
        handleDismissCinematic();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCinematic, hasEnteredExperience, handleDismissCinematic]);

  return (
    <div className="relative min-h-screen bg-[#faf6f0] text-[#2e3230] font-sans selection:bg-[#4a7c59] selection:text-[#faf6f0]">
      {showCinematic && (
        <section
          aria-label="Layar Pembuka Sinematik Pontianak"
          className={`fixed inset-0 z-[100] w-full h-full bg-[#0c0f0d] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCinematicDismissing ? "opacity-0 -translate-y-8 scale-[1.02] pointer-events-none" : "opacity-100 translate-y-0 scale-100"
            }`}
        >
          {!hasEnteredExperience && (
            <div
              className={`absolute inset-0 z-40 bg-[#0c0f0d] flex flex-col items-center justify-between p-6 md:p-12 transition-all duration-800 ease-out ${isGateDismissing ? "opacity-0 scale-105 blur-lg pointer-events-none" : "opacity-100 scale-100"
                }`}
              style={{
                background: "radial-gradient(circle at 50% 45%, rgba(28, 44, 33, 0.75) 0%, rgba(12, 15, 13, 0.95) 70%, #080a09 100%)",
              }}
            >
              <div className="relative z-10 w-full flex items-center justify-between text-xs tracking-widest uppercase font-mono text-[#faf6f0]/75">
                <span className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f5d070] shadow-[0_0_10px_#f5d070] animate-ping" />
                  Garis Khatulistiwa • 00°00&apos;00&quot;
                </span>
                <span className="hidden sm:inline-block tracking-[0.25em] text-[#f5d070]/80">Kalimantan Barat</span>
              </div>

              <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center my-auto py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#f5d070]/60 bg-[#f5d070]/10 text-[#f5d070] font-mono text-2xl mb-7 shadow-[0_0_45px_rgba(245,208,112,0.3)] ring-4 ring-[#f5d070]/15">
                  0°
                </div>

                <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#f5d070] font-semibold mb-3 block">
                  Pengalaman Sinematik
                </span>
                <h1 className="font-serif text-4xl md:text-6xl text-[#faf6f0] tracking-tight leading-tight mb-4 font-normal drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                  Pesona Pontianak
                </h1>
                <p className="font-sans font-light text-base md:text-lg text-[#e6ded3] leading-relaxed max-w-md mx-auto mb-9">
                  Dokumenter sinematik kota seribu parit, denyut Sungai Kapuas, dan titik nol derajat khatulistiwa.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                  <button
                    type="button"
                    onClick={handlePermitSoundAndEnter}
                    disabled={isGateDismissing}
                    style={{ color: '#ffffff' }}
                    className={`group relative w-full sm:w-auto inline-flex items-center justify-center gap-3.5 px-9 py-4 rounded-full bg-gradient-to-r from-[#2f5c3d] via-[#3a714b] to-[#2f5c3d] hover:from-[#376b47] hover:to-[#468559] font-semibold text-base tracking-wide transition-all duration-300 shadow-[0_10px_35px_rgba(47,92,61,0.55),0_0_25px_rgba(245,208,112,0.2)] hover:shadow-[0_15px_45px_rgba(58,113,75,0.75),0_0_35px_rgba(245,208,112,0.4)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer border-2 border-[#f5d070]/70 hover:border-[#f5d070] ${
                      isGateDismissing ? "opacity-75 scale-95 pointer-events-none" : ""
                    }`}
                  >
                    <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-base transition-transform duration-300 group-hover:scale-110">
                      {isGateDismissing ? "⏳" : "🔊"}
                    </span>
                    <span style={{ color: '#ffffff' }}>
                      {isGateDismissing ? "Membuka Sinematik..." : "Izinkan Suara untuk Melanjutkan"}
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleEnterSilent}
                  disabled={isGateDismissing}
                  style={{ color: '#e6ded3' }}
                  className={`mt-5 text-xs font-mono uppercase tracking-[0.25em] hover:!text-[#f5d070] transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-[#f5d070] cursor-pointer py-1.5 px-4 ${
                    isGateDismissing ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  Lanjutkan tanpa suara →
                </button>
              </div>

              <div className="relative z-10 w-full text-center text-xs font-light text-[#faf6f0]/50 tracking-wider">
                Pengalaman audio visual imersif terbaik disarankan dengan headphone
              </div>
            </div>
          )}

          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center select-none">
            <div className="relative w-full h-full overflow-hidden">
              {!videoHasError ? (
                isIframeVideo ? (
                  <iframe
                    src={`${cinematicVideoSrc}${cinematicVideoSrc.includes("?") ? "&" : "?"}autoplay=${hasEnteredExperience ? "true" : "false"}&muted=${isCinematicMuted ? "true" : "false"}`}
                    className="w-full h-full border-0 select-none"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    onError={() => setVideoHasError(true)}
                  />
                ) : (
                  <video
                    ref={videoRef}
                    poster="/media/hero-kapuas-dawn.png"
                    preload="auto"
                    playsInline
                    muted={isCinematicMuted}
                    onEnded={handleDismissCinematic}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onError={() => {
                      if (!videoRef.current || videoRef.current.error) {
                        setVideoHasError(true);
                      }
                    }}
                    className="w-full h-full object-cover object-center select-none transition-opacity duration-700"
                  >
                    <source src={cinematicVideoSrc} type="video/mp4" />
                    <source src="https://res.cloudinary.com/zmagrhdv/video/upload/v1790820973/pontianak-intro-compressed.mp4" type="video/mp4" />
                    <source src="/media/hero-kapuas.mp4" type="video/mp4" />
                  </video>
                )
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('/media/hero-kapuas-dawn.png')` }}
                />
              )}

              {hasEnteredExperience && !isIframeVideo && (
                <button
                  type="button"
                  aria-label={isVideoPlaying ? "Jeda video sinematik" : "Putar video sinematik"}
                  className="absolute inset-0 z-10 w-full h-full bg-transparent border-0 cursor-pointer pointer-events-auto flex items-center justify-center group focus:outline-none"
                  onClick={toggleVideoPlay}
                >
                  {!isVideoPlaying && (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/60 backdrop-blur-md border border-[#f5d070]/60 flex items-center justify-center text-[#f5d070] text-2xl md:text-3xl shadow-[0_0_30px_rgba(245,208,112,0.3)] transition-transform group-hover:scale-110">
                      ▶
                    </div>
                  )}
                </button>
              )}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/60" />
            </div>
          </div>

          {hasEnteredExperience && (
            <>
              <div className="absolute top-6 right-6 md:top-8 md:right-10 z-30 flex items-center gap-3 pointer-events-auto">
                {!isIframeVideo && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCinematicAudio();
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs text-white transition-all shadow-lg cursor-pointer"
                    title="Bisu / Nyalakan audio video"
                  >
                    <span>{isCinematicMuted ? "🔇 Bisu" : "🔊 Suara Video"}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismissCinematic();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a7c59] hover:bg-[#3c6548] text-[#faf6f0] text-xs font-semibold tracking-wide transition-all shadow-[0_4px_25px_rgba(74,124,89,0.5)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                >
                  <span>Lewati Video</span>
                  <span>→</span>
                </button>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismissCinematic();
                  }}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white backdrop-blur-md border border-white/20 hover:border-[#f5d070]/60 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f5d070] font-medium">
                    Gulir ke bawah
                  </span>
                  <span className="hidden sm:inline-block text-xs text-white/80">
                    untuk masuk ke halaman utama
                  </span>
                  <span className="w-5 h-5 rounded-full bg-[#f5d070]/20 flex items-center justify-center text-[#f5d070] text-xs font-bold group-hover:translate-y-0.5 transition-transform animate-bounce">
                    ↓
                  </span>
                </button>
              </div>
            </>
          )}
        </section>
      )}

      <a className="skip-link" href="#prolog">
        {siteConfig.copy.skipToContent}
      </a>

      <RiverProgress sections={railSections} activeId={activeSection} />
      <AudioToggle track={activeTrack} />

      <main id="main">
        <Hero
          hero={siteConfig.hero}
          scrollTargetId={siteConfig.transitions[0].id}
          scrollLabel={siteConfig.hero.scrollLabel}
        />

        {siteConfig.chapters.map((chapter, i) => {
          const transition = siteConfig.transitions[i];
          return (
            <div key={chapter.id} id={transition.id}>
              <ChapterTransition
                transition={transition}
                nextSectionId={chapter.id}
                skipLabel={siteConfig.copy.skipToNext}
              />
              <ChapterSection
                chapter={chapter}
                locations={siteConfig.locations}
                onOpenMap={setMapLocation}
              />
            </div>
          );
        })}

        <Colophon />
      </main>

      <MapModal location={mapLocation} onClose={() => setMapLocation(null)} />
    </div>
  );
}
