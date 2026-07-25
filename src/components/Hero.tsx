"use client";

import { motion } from "motion/react";
import Image from "next/image";

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

const ORBS = [
  {
    className: "top-[10%] left-[12%] h-[350px] w-[350px]",
    duration: 18,
    drift: { x: [0, 50, -20, 0], y: [0, -40, 30, 0] },
    opacity: 0.18,
  },
  {
    className: "right-[10%] bottom-[8%] h-[420px] w-[420px]",
    duration: 24,
    drift: { x: [0, -45, 25, 0], y: [0, 35, -25, 0] },
    opacity: 0.15,
  },
  {
    className: "top-[18%] right-[18%] h-[280px] w-[280px]",
    duration: 21,
    drift: { x: [0, 30, -35, 0], y: [0, 25, 20, 0] },
    opacity: 0.16,
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 70%)",
        }}
      />

      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={{
            x: orb.drift.x,
            y: orb.drift.y,
            scale: [1, 1.15, 0.92, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`pointer-events-none absolute z-0 rounded-full blur-3xl ${orb.className}`}
          style={{
            background: `radial-gradient(circle, rgba(59,130,246,${orb.opacity}) 0%, rgba(59,130,246,0) 70%)`,
          }}
        />
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          variants={photoItem}
          className="relative mb-6 h-[160px] w-[160px] overflow-hidden rounded-full border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.5)] sm:h-[180px] sm:w-[180px]"
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

        <motion.h1
          variants={item}
          className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
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
