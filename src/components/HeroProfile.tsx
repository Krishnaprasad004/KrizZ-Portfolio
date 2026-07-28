"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "motion/react";
import Image from "next/image";

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

function OrbitBadge({ children }: { children: string }) {
  return (
    <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 text-center font-mono text-[9px] leading-tight text-sky-200 shadow-[0_0_14px_rgba(56,189,248,0.2)] backdrop-blur-md">
      {children}
    </div>
  );
}

function RingPath({ radius }: { radius: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#38bdf8]/25"
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
              <OrbitBadge>{label}</OrbitBadge>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CountUpStat({
  value,
  label,
  start,
}: {
  value: number;
  label: string;
  start: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, value]);

  return (
    <div className="flex flex-col items-center gap-1 sm:items-start">
      <span className="font-heading text-3xl font-semibold text-white">
        {display}
      </span>
      <span className="font-mono text-[11px] tracking-widest text-zinc-400 uppercase">
        {label}
      </span>
    </div>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <path d="M8 3h5a2 2 0 0 1 2 2v3H8a2 2 0 0 0-2 2v2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 21h-5a2 2 0 0 1-2-2v-3h7a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="5.5" r="0.75" fill="currentColor" />
      <circle cx="14.5" cy="18.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function SqlIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v14c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PowerBiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 20V12M11 20V4M18 20v-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 20h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DatabricksIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 3 4 7l8 4 8-4-8-4Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12l8 4 8-4M4 17l8 4 8-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SKILLS = [
  { name: "Python", icon: <PythonIcon /> },
  { name: "SQL", icon: <SqlIcon /> },
  { name: "Power BI", icon: <PowerBiIcon /> },
  { name: "Databricks", icon: <DatabricksIcon /> },
];

export default function HeroProfile() {
  const statRowRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statRowRef, { once: true, margin: "-40px" });

  return (
    <section className="section-pad relative z-10 flex w-full items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex items-center justify-center"
        >
          <div className="relative flex h-[560px] w-[560px] max-w-full origin-center scale-[0.62] items-center justify-center sm:scale-100">
            <RingPath radius={165} />
            <RingPath radius={225} />

            <OrbitRing
              radius={165}
              duration={20}
              labels={["Data Engineer", "Problem Solver"]}
            />
            <OrbitRing
              radius={225}
              duration={30}
              reverse
              labels={["GenAI Explorer", "Builder"]}
            />

            <motion.div
              variants={photoItem}
              className="relative z-10 h-[200px] w-[200px] overflow-hidden rounded-full border-2 border-white/30 shadow-[0_0_30px_rgba(59,130,246,0.35)] backdrop-blur-sm"
            >
              <Image
                src="/profile.png"
                alt="Krishna Prasad H"
                fill
                priority
                sizes="200px"
                className="rounded-full object-cover object-[center_8%]"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
        >
          <motion.span
            variants={item}
            className="font-mono text-xs font-medium tracking-[0.2em] text-blue-400 uppercase"
          >
            Data-Driven, Deployment-Ready
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl"
          >
            Krishna Prasad H
          </motion.h1>

          <motion.p variants={item} className="text-lg text-zinc-300">
            Data Engineer · Pondicherry, India
          </motion.p>

          <motion.blockquote
            variants={item}
            className="max-w-md rounded-2xl border border-white/10 border-l-2 border-l-blue-400 bg-white/5 px-6 py-4 text-base text-zinc-300 italic backdrop-blur-md"
          >
            &ldquo;Turning raw data into decisions — one pipeline at a
            time.&rdquo;
          </motion.blockquote>

          <motion.div
            ref={statRowRef}
            variants={item}
            className="flex gap-10"
          >
            <CountUpStat value={5} label="Projects" start={statsInView} />
            <CountUpStat value={2} label="Internships" start={statsInView} />
            <CountUpStat
              value={3}
              label="Certifications"
              start={statsInView}
            />
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-zinc-300 backdrop-blur-md"
              >
                {skill.icon}
                {skill.name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
