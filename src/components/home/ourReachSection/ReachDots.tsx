'use client';

import React from 'react';
import {motion} from 'framer-motion';

const DOT_POSITIONS = [
  "top-[18%] left-[29.5%]",
  "top-[40%] left-[57%]",
  "top-[45%] left-[22.5%]",
  "top-[45%] left-[32%]",
  "top-[32%] left-[38%]",
  "top-[33%] left-[25%]",
  "top-[67%] left-[30%]",
  "top-[54.5%] left-[27.5%]",
  "top-[52%] left-[25%]",
  "top-[48%] left-[48.2%]",
  "top-[45%] left-[43.8%]",
  "top-[78.4%] left-[30.6%]",
  "top-[68.6%] left-[37.5%]",
  "top-[25.5%] left-[29.2%]",
  "top-[57.5%] left-[33%]",
];

// Order in which the dots light up — scattered so the sequence reads as random.
const ANIMATION_ORDER = [4, 11, 1, 8, 14, 6, 0, 9, 3, 12, 7, 2, 10, 5, 13];

const DURATION = 2;                            // total per-dot animation (seconds)
const STEP = 0.75;                             // gap between dots (= scale-up time)
const KEYFRAME_TIMES = [0, 0.375, 0.625, 1];   // 0.75s up, 0.5s hold, 0.75s down
const CYCLE = DOT_POSITIONS.length * STEP;     // full loop length
const REPEAT_DELAY = CYCLE - DURATION;         // wait before each dot fires again

const ReachDot = ({position, delay}: { position: string; delay: number }) => {
  const transition = {
    duration: DURATION,
    times: KEYFRAME_TIMES,
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatDelay: REPEAT_DELAY,
    delay,
  };

  return (
    <div className={`absolute ${position} size-1 md:size-2 lg:size-1.5 xl:size-2.5`}>
      {/* dot: size-2.5 (10px) -> size-4.5 (18px) === scale 1.8 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary-red"
        initial={{scale: 1}}
        animate={{scale: [1, 1.8, 1.8, 1]}}
        transition={transition}
      />
      {/* ring: fades in 16px outside the expanded dot */}
      <motion.div
        className="absolute size-6 md:size-8.5 lg:size-7.5 xl:size-11.5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-red"
        initial={{opacity: 0}}
        animate={{opacity: [0, 1, 1, 0]}}
        transition={transition}
      />
    </div>
  );
};

export default function ReachDots() {
  return (
    <>
      {DOT_POSITIONS.map((position, index) => (
        <ReachDot key={index} position={position} delay={ANIMATION_ORDER[index] * STEP}/>
      ))}
    </>
  );
}
