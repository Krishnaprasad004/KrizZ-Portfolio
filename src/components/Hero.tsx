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

function OrbitLabel({ children }: { children: string }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-[#38bdf8]/40 bg-[#0a0a0a] px-3 py-1 font-mono text-[11px] text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.25)]">
      {children}
    </span>
  );
}

function RingPath({ radius }: { radius: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38bdf8]/20"
      style={{ width: radius * 2, height: radius * 2 }}
    />
  );
}

function OrbitRing({
  radius,
  duration,
  reverse,
  labels,
}: {
  radius: number;
  duration: number;
  reverse?: boolean;
  labels: string[];
}) {
  const angleStep = 360 / labels.length;

  return (
    <div
      className="absolute inset-0"
      style={{
        animationName: "spin-cw",
        animationDuration: `${duration}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {labels.map((label, i) => {
        const angleRad = (angleStep * i * Math.PI) / 180;
        const x = radius * Math.cos(angleRad);
        const y = radius * Math.sin(angleRad);
        return (
          <div
            key={label}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            }}
          >
            <div
              style={{
                animationName: "spin-cw",
                animationDuration: `${duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDirection: reverse ? "normal" : "reverse",
              }}
            >
              <OrbitLabel>{label}</OrbitLabel>
            </div>
          </div>
        );
      })}
    </div>
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
          <RingPath radius={160} />
          <RingPath radius={215} />

          <OrbitRing
            radius={160}
            duration={20}
            labels={["Data Engineer", "Problem Solver"]}
          />
          <OrbitRing
            radius={215}
            duration={30}
            reverse
            labels={["GenAI Explorer", "Builder"]}
          />

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
