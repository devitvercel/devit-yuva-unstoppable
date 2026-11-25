"use client";

import {useEffect, useRef, type RefObject} from "react";

type WheelScrollTarget =
  | RefObject<HTMLElement | null>
  | (() => HTMLElement | null | undefined);

interface HorizontalWheelScrollOptions {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  /** Accumulated horizontal delta before advancing one step. */
  threshold?: number;
  enabled?: boolean;
}

function resolveTarget(target: WheelScrollTarget): HTMLElement | null | undefined {
  return typeof target === "function" ? target() : target.current;
}

/**
 * Maps trackpad / mouse-wheel horizontal gestures to prev/next actions.
 * Used for custom carousels and Embla instances where drag is disabled.
 */
export function useHorizontalWheelScroll(
  target: WheelScrollTarget,
  {
    onScrollLeft,
    onScrollRight,
    threshold = 45,
    enabled = true,
  }: HorizontalWheelScrollOptions
) {
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    if (!enabled) return;

    const element = resolveTarget(targetRef.current);
    if (!element) return;

    let accumulated = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const onWheel = (event: WheelEvent) => {
      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      if (absX <= absY || absX < 1) return;

      event.preventDefault();

      accumulated += event.deltaX;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accumulated = 0;
      }, 150);

      if (accumulated >= threshold) {
        onScrollRight();
        accumulated = 0;
      } else if (accumulated <= -threshold) {
        onScrollLeft();
        accumulated = 0;
      }
    };

    element.addEventListener("wheel", onWheel, {passive: false});
    return () => {
      element.removeEventListener("wheel", onWheel);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [enabled, onScrollLeft, onScrollRight, threshold]);
}
