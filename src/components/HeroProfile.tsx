"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "motion/react";

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

function LightbulbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-300" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.5.4.85 1 .95 1.65L9.5 16h5l.15-.55c.1-.65.45-1.25.95-1.65A6 6 0 0 0 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-300" stroke="currentColor" strokeWidth={1.5}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5 6.5 21l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.83 2.83a2 2 0 0 1-2.83-2.83L14.7 6.3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-300" stroke="currentColor" strokeWidth={1.5}>
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v6c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 11v6c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-300" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

interface OrbitItem {
  label: string;
  icon: React.ReactNode;
}

function OrbitBadge({ icon, children }: { icon: React.ReactNode; children: string }) {
  return (
    <div className="relative flex h-[84px] w-[84px] flex-col items-center justify-center gap-1 rounded-full border border-blue-400/30 bg-white/5 p-2 text-center font-mono text-[9px] leading-tight text-blue-200 shadow-[0_0_14px_rgba(62,166,255,0.25)] backdrop-blur-md">
      <span
        aria-hidden
        className="absolute top-2 right-2.5 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 shadow-[0_0_6px_rgba(62,166,255,0.9)]"
      />
      {icon}
      <span>{children}</span>
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

/** Slow rotating conic-gradient sweep across the whole orbit, for a radar/HUD feel. */
function ScanSweep() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, rgba(62,166,255,0.16) 20deg, transparent 50deg)",
        animationName: "spin-cw",
        animationDuration: "6s",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      }}
    />
  );
}

/** Pulsing corner brackets framing the whole orbit, matching the HUD language used in Hero's role box. */
function HudCorners() {
  const corners = [
    "top-2 left-2 border-t-2 border-l-2",
    "top-2 right-2 border-t-2 border-r-2",
    "bottom-2 left-2 border-b-2 border-l-2",
    "bottom-2 right-2 border-b-2 border-r-2",
  ];

  return (
    <>
      {corners.map((pos) => (
        <motion.span
          key={pos}
          aria-hidden
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className={`pointer-events-none absolute h-6 w-6 border-blue-400 ${pos}`}
        />
      ))}
    </>
  );
}

function OrbitRing({
  radius,
  duration,
  reverse,
  items,
}: {
  radius: number;
  duration: number;
  reverse?: boolean;
  items: OrbitItem[];
}) {
  const angleStep = 360 / items.length;

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
      {items.map((it, i) => {
        const angleRad = (angleStep * i * Math.PI) / 180;
        const x = radius * Math.cos(angleRad);
        const y = radius * Math.sin(angleRad);
        return (
          <div
            key={it.label}
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
              <OrbitBadge icon={it.icon}>{it.label}</OrbitBadge>
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
      <span className="font-heading text-3xl font-semibold text-amber-400">
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

const INNER_RING_ITEMS: OrbitItem[] = [
  { label: "Data Engineer", icon: <DatabaseIcon /> },
  { label: "Problem Solver", icon: <LightbulbIcon /> },
];

const OUTER_RING_ITEMS: OrbitItem[] = [
  { label: "GenAI Explorer", icon: <SparkleIcon /> },
  { label: "Builder", icon: <WrenchIcon /> },
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
            <HudCorners />
            <ScanSweep />

            <RingPath radius={165} />
            <RingPath radius={225} />

            <OrbitRing radius={165} duration={20} items={INNER_RING_ITEMS} />
            <OrbitRing radius={225} duration={30} reverse items={OUTER_RING_ITEMS} />

            <div className="relative z-10 flex h-[200px] w-[200px] items-center justify-center">
              <motion.div
                aria-hidden
                animate={{ opacity: [0.35, 0.8, 0.35], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-blue-400/25 blur-xl"
              />

              <motion.div
                variants={photoItem}
                className="relative z-10 flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-full border-2 border-white/30 bg-white/5 shadow-[0_0_30px_rgba(59,130,246,0.35)] backdrop-blur-sm"
              >
                <span className="font-heading bg-gradient-to-br from-white via-blue-200 to-blue-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
                  KP
                </span>
              </motion.div>
            </div>
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
            className="hud-eyebrow font-mono text-sm font-medium tracking-[0.2em] text-blue-400 uppercase"
          >
            Data-Driven, Deployment-Ready
          </motion.span>

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
