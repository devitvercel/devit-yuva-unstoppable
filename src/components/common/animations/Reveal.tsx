"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";

/**
 * Reveal — minimal, professional scroll-reveal wrapper.
 *
 * Fades + lifts its children into view the first time they enter the viewport.
 * Kept deliberately subtle (short distance, soft easing, runs once) so it reads
 * as polish rather than motion for its own sake, and never re-triggers while
 * scrolling back and forth.
 *
 * Performance notes:
 *   - Only `opacity` and `transform` are animated (GPU-friendly, no layout work),
 *     so it stays smooth even on long pages with many sections.
 *   - `viewport.once` means each element animates a single time, then frees up.
 *   - Respects the user's "reduce motion" OS setting (renders static).
 */
const Reveal = ({
  children,
  className,
  delay = 0.05,
  y = 12,
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  /** Optional stagger when several Reveals sit side by side. */
  delay?: number;
  /** Distance (px) the element travels up into place. */
  y?: number;
  /** Duration of the animation in seconds. */
  duration?: number;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isComplete, setIsComplete] = useState(false);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => setIsComplete(true)}
      style={{
        willChange: isComplete ? "auto" : "opacity, transform",
        ...(isComplete ? { transform: "none", opacity: 1 } : {}),
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
