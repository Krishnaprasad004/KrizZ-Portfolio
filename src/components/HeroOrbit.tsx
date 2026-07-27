"use client";

import { motion } from "motion/react";
import Image from "next/image";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
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
        zIndex: 1,
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
              zIndex: 1,
              opacity: 1,
            }}
          >
            <div
              style={{
                animationName: "spin-cw",
                animationDuration: `${duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDirection: reverse ? "normal" : "reverse",
                opacity: 1,
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

export default function HeroOrbit() {
  return (
    <section className="relative z-10 flex w-full items-center justify-center overflow-hidden px-6 py-24 sm:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative flex h-[520px] w-[520px] items-center justify-center"
      >
        <RingPath radius={170} />
        <RingPath radius={230} />

        <OrbitRing
          radius={170}
          duration={20}
          labels={["Data Engineer", "Problem Solver"]}
        />
        <OrbitRing
          radius={230}
          duration={30}
          reverse
          labels={["GenAI Explorer", "Builder"]}
        />

        <motion.div
          variants={photoItem}
          className="relative z-10 h-[180px] w-[180px] overflow-hidden rounded-full border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
        >
          <Image
            src="/profile.png"
            alt="Krishna Prasad H"
            fill
            sizes="180px"
            className="rounded-full object-cover object-[center_8%]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
