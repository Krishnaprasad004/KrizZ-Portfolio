"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

const PARTICLE_COUNT = 14;

interface Particle {
  id: number;
  dx: number;
  dy: number;
  size: number;
  delay: number;
}

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (360 / PARTICLE_COUNT) * i + (Math.random() * 20 - 10);
    const distance = 44 + Math.random() * 32;
    const rad = (angle * Math.PI) / 180;
    return {
      id: i,
      dx: Math.cos(rad) * distance,
      dy: Math.sin(rad) * distance,
      size: 3 + Math.random() * 3,
      delay: Math.random() * 0.05,
    };
  });
}

function ParticleBurst({ particles }: { particles: Particle[] }) {
  return (
    <>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.65, delay: p.delay, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 rounded-full bg-[#3b82f6]"
          style={{
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
          }}
        />
      ))}
    </>
  );
}

interface Burst {
  id: number;
  particles: Particle[];
}

export default function Hero() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const triggerBurst = () => {
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id, particles: createParticles() }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 700);
  };

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative flex h-[360px] w-[360px] items-center justify-center sm:h-[400px] sm:w-[400px]">
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
          className="font-heading mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Krishna Prasad H
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-lg text-zinc-100 [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] sm:text-xl"
        >
          Data Engineer / Data Analyst
        </motion.p>

        <motion.div variants={item} className="relative mt-10 inline-block">
          <a
            href="#"
            onClick={triggerBurst}
            className="relative z-10 block rounded-full border border-blue-500/60 px-8 py-3 text-sm font-medium text-white shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.8)]"
          >
            View My Work
          </a>

          <div className="pointer-events-none absolute inset-0 z-0">
            <AnimatePresence>
              {bursts.map((burst) => (
                <ParticleBurst key={burst.id} particles={burst.particles} />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
