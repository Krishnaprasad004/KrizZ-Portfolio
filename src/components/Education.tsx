"use client";

import { motion } from "motion/react";
import ConstellationMotif from "@/components/ConstellationMotif";
import ScrambleText from "@/components/ScrambleText";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function CapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 text-blue-400"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        d="M12 4 2 9l10 5 10-5-10-5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Education() {
  return (
    <section id="education" className="section-pad relative z-10 w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-5xl flex-col gap-10"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="hud-eyebrow font-mono text-sm font-medium tracking-widest text-blue-400 uppercase">
            <ScrambleText text="Education" />
          </span>
          <ConstellationMotif className="hidden sm:block" />
        </motion.div>

        <motion.div
          variants={item}
          className="hud-frame flex max-w-3xl items-start gap-4 rounded-2xl border border-white/10 border-l-4 border-l-blue-500 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-l-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
            <CapIcon />
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold tracking-tight text-white">
              B.E. Computer Science Engineering
            </h3>
            <p className="mt-2 font-mono text-sm text-zinc-400">
              Graduated March 2025
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
