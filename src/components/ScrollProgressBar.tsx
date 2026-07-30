"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduced = usePrefersReducedMotion();
  const spring = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });
  const scaleX = reduced ? scrollYProgress : spring;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
    />
  );
}
