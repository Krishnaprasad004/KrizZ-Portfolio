"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const photoItem = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function OrbitLabel({ children }: { children: string }) {
  return (
    <span className="font-mono text-[11px] whitespace-nowrap text-sky-300 rounded-full border border-[#38bdf8]/40 bg-[#0a0a0a] px-3 py-1 shadow-[0_0_10px_rgba(56,189,248,0.25)]">
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative flex h-[420px] w-[420px] items-center justify-center sm:h-[480px] sm:w-[480px]">
          <OrbitingCircles radius={160} duration={20}>
            <OrbitLabel>Data Engineer</OrbitLabel>
            <OrbitLabel>Problem Solver</OrbitLabel>
          </OrbitingCircles>

          <OrbitingCircles radius={215} duration={30} reverse>
            <OrbitLabel>GenAI Explorer</OrbitLabel>
            <OrbitLabel>Builder</OrbitLabel>
          </OrbitingCircles>

          <motion.div
            variants={photoItem}
            className="relative z-10 h-[160px] w-[160px] overflow-hidden rounded-full border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.5)] sm:h-[180px] sm:w-[180px]"
          >
            <Image
              src="/profile.png"
              alt="Krishna Prasad H"
              fill
              priority
              sizes="180px"
              className="rounded-full object-cover object-[center_8%]"
            />
          </motion.div>
        </div>

        <motion.h1
          variants={item}
          className="font-heading mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Krishna Prasad H
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-lg text-zinc-100 [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] sm:text-xl"
        >
          Data Engineer / Data Analyst
        </motion.p>

        <motion.a
          variants={item}
          href="#"
          className="mt-10 rounded-full border border-blue-500/60 px-8 py-3 text-sm font-medium text-white shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.8)]"
        >
          View My Work
        </motion.a>
      </motion.div>
    </section>
  );
}
