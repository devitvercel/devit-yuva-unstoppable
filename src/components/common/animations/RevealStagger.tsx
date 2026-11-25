"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Children, isValidElement, type ReactNode } from "react";

/**
 * RevealStagger — sibling version of {@link Reveal} for multi-card rows.
 *
 * Renders a container (keeping whatever layout classes you pass, e.g. a grid or
 * flex row) and cascades its direct children in one-by-one as the row scrolls
 * into view. Each child fades + lifts with a small delay after the previous, so
 * cards arrive as a gentle sequence rather than all at once.
 *
 * SSR-safe: children stay server-rendered and are simply wrapped in a motion
 * item on the client. Animates `opacity`/`transform` only (GPU-friendly) and
 * runs once. Respects "reduce motion".
 */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const RevealStagger = ({
  children,
  className,
  itemClassName,
  viewportMargin = "0px 0px -30% 0px",
}: {
  children: ReactNode;
  className?: string;
  /** Extra classes for each item wrapper (e.g. `h-full` / `flex-1`) so the
   *  wrapper can take the place the original child held in the layout. */
  itemClassName?: string;
  /** Bounding box margin for viewport threshold. Defaults to "0px 0px -30% 0px". */
  viewportMargin?: string;
 }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some", margin: viewportMargin }}
    >
      {Children.map(children, (child) =>
        isValidElement(child) ? (
          <motion.div className={itemClassName} variants={itemVariants}>
            {child}
          </motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  );
};

export default RevealStagger;
