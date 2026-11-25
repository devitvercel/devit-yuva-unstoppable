"use client";

import React, { useEffect, useRef, useState } from "react";
import { YuvaLogo } from "../../../../public/SVGs/svg";

interface Slide {
  img: string;
  word: string;
}

const SLIDES: Slide[] = [
  { img: "/assets/preloader/img-1.avif", word: "Seva" },
  { img: "/assets/preloader/img-2.avif", word: "शिक्षा" },
  { img: "/assets/preloader/img-3.avif", word: "Empower" },
  { img: "/assets/preloader/img-4.avif", word: "Transform" },
  { img: "/assets/preloader/img-5.avif", word: "करुणा" },
  { img: "/assets/preloader/img-6.avif", word: "Sustainability" },
  { img: "/assets/preloader/img-7.avif", word: "प्रगति" },
];

const TICK_MS = 280;
const STEP = 100 / SLIDES.length;
const EXIT_MS = 800; // Energetic, premium outro duration as designed in Figma

interface PreloaderProps {
  children?: React.ReactNode;
  onComplete?: () => void;
  onExitStart?: () => void;
}

export default function Preloader({
  children,
  onComplete,
  onExitStart,
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [layers, setLayers] = useState<[number, number]>([
    0,
    1 % SLIDES.length,
  ]);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);

  const slideIndexRef = useRef(0);
  const activeLayerRef = useRef<0 | 1>(0);

  useEffect(() => {
    let timerId: number | ReturnType<typeof setTimeout> | null = null;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(
        () => {
          SLIDES.forEach((slide) => {
            const img = new window.Image();
            img.src = slide.img;
          });
        },
        { timeout: 200 },
      );
    } else {
      timerId = setTimeout(() => {
        SLIDES.forEach((slide) => {
          const img = new window.Image();
          img.src = slide.img;
        });
      }, 200);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (!isLoading || isExiting) return;

    const interval = setInterval(() => {
      setWordVisible(false);

      const fadeTimeout = setTimeout(() => {
        const nextIndex = (slideIndexRef.current + 1) % SLIDES.length;
        const inactiveLayer = activeLayerRef.current === 0 ? 1 : 0;

        slideIndexRef.current = nextIndex;
        activeLayerRef.current = inactiveLayer;

        setLayers((prev) => {
          const updated = [...prev] as [number, number];
          updated[inactiveLayer] = nextIndex;
          return updated;
        });
        setActiveLayer(inactiveLayer);
        setSlideIndex(nextIndex);
        setWordVisible(true);

        setProgress((prev) => {
          const next = Math.min(prev + STEP, 100);
          if (next >= 98 && !isExiting) {
            setIsExiting(true);
            onExitStart?.();
            setTimeout(() => {
              setIsLoading(false);
              onComplete?.();
            }, EXIT_MS);
          }
          return next;
        });
      }, TICK_MS * 0.35);

      return () => clearTimeout(fadeTimeout);
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [isLoading, isExiting, onComplete, onExitStart]);

  useEffect(() => {
    // Safety guard: guarantee preloader unmounts even if timers get throttled
    const maxDurationMs = SLIDES.length * TICK_MS + EXIT_MS + 1000;
    const fallbackTimer = setTimeout(() => {
      if (isLoading && !isExiting) {
        setIsExiting(true);
        onExitStart?.();
        setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
        }, EXIT_MS);
      }
    }, maxDurationMs);

    return () => clearTimeout(fallbackTimer);
  }, [isLoading, isExiting, onComplete, onExitStart]);

  return (
    <>
      {/* Underlying layout layer mounted dynamically directly beneath if passed */}
      {children ? <main className="w-full h-screen overflow-auto">{children}</main> : null}

      {isLoading && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden transition-all ease-in-out`}
          style={{
            backgroundColor: isExiting ? "var(--background)" : "#0a0a0a",
            opacity: isExiting ? 0 : 1,
            pointerEvents: isExiting ? "none" : "auto",
            transition: `background-color 400ms ease-in-out, opacity ${EXIT_MS}ms cubic-bezier(0.25, 1, 0.5, 1)`,
          }}
        >
          {/* Layer 0 Backdrop — CSS background-image for decorative low-opacity overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 h-full w-full bg-cover bg-center scale-105 transition-opacity duration-300 will-change-[opacity]"
            style={{
              backgroundImage: `url(${SLIDES[layers[0]].img})`,
              opacity: isExiting ? 0 : activeLayer === 0 ? 0.35 : 0,
            }}
          />

          {/* Layer 1 Backdrop — CSS background-image for decorative low-opacity overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 h-full w-full bg-cover bg-center scale-105 transition-opacity duration-300 will-change-[opacity]"
            style={{
              backgroundImage: `url(${SLIDES[layers[1]].img})`,
              opacity: isExiting ? 0 : activeLayer === 1 ? 0.35 : 0,
            }}
          />

          {/* Vignette Layer */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 transition-opacity duration-300 ${isExiting ? "opacity-0" : "opacity-100"}`}
          />

          {/* Core Content Container */}
          <div className="relative flex flex-col items-center justify-center gap-6 z-10 px-4 text-center w-full h-full">
            {/* Outro Brand Integration Dynamic Box */}
            <div className="relative h-32 flex items-center justify-center min-w-[240px]">
              {isExiting ? (
                /* Outro Transition: Logo explodes outward and vanishes into the white background */
                <div
                  className="w-52 h-52 text-black flex items-center justify-center drop-shadow-sm will-change-transform"
                  style={{
                    animation: `logoExplode ${EXIT_MS}ms cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                  }}
                >
                  <YuvaLogo />
                </div>
              ) : (
                /* Active Typographic Word Engine */
                <span
                  className={`text-2xl sm:text-3xl font-light tracking-[0.25em] uppercase text-white transition-all duration-200 will-change-transform ${
                    wordVisible
                      ? "opacity-100 translate-y-0 filter blur-0"
                      : "opacity-0 translate-y-2 filter blur-sm"
                  }`}
                >
                  {SLIDES[slideIndex].word}
                </span>
              )}
            </div>

            {/* Premium Progress Bar — Dismisses immediately when exiting starts */}
            <div
              className={`relative h-[2px] w-44 bg-white/10 overflow-hidden rounded-full transition-all duration-300 ${isExiting ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
            >
              <div
                className="h-full bg-gradient-to-r from-neutral-400 to-white will-change-[width]"
                style={{
                  width: `${progress}%`,
                  transition: `width ${TICK_MS}ms linear`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Embedded Global Animations */}
      <style jsx global>{`
        @keyframes logoExplode {
          0% {
            opacity: 0;
            transform: scale(0.6);
            filter: blur(4px);
          }
          15% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
          40% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            opacity: 0;
            transform: scale(2.8);
            filter: blur(2px);
          }
        }
      `}</style>
    </>
  );
}
