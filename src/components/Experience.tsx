"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ConstellationMotif from "@/components/ConstellationMotif";
import ScrambleText from "@/components/ScrambleText";

interface ExperienceEntry {
  role: string;
  company: string;
  duration?: string;
  current?: boolean;
  bullets: string[];
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Data Engineer Intern",
    company: "Decision Minds, Pondicherry",
    current: true,
    bullets: [
      "Building ETL pipelines and dashboards for data engineering and BI analytics projects.",
      "Exploring GenAI applications within the analytics workflow.",
    ],
  },
  {
    role: "Data Science Engineer Intern",
    company: "Jidoka Technologies",
    duration: "Dec 2025 – Feb 2026",
    bullets: ["Focused on computer vision projects."],
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={`h-4 w-4 shrink-0 text-blue-400 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExperienceItem({ exp }: { exp: ExperienceEntry }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={item} className="relative pl-10">
      <span className="absolute top-1.5 left-0 h-3 w-3 rounded-full border-2 border-blue-400 bg-[#0a0a0a] shadow-[0_0_8px_rgba(59,130,246,0.6)]" />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
      >
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-tight text-white">
            {exp.role}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-blue-400">{exp.company}</span>
            {exp.duration && (
              <>
                <span className="text-zinc-600">·</span>
                <span className="font-mono text-zinc-400">{exp.duration}</span>
              </>
            )}
            {exp.current && (
              <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-xs text-amber-300">
                Current
              </span>
            )}
          </div>
        </div>

        <ChevronIcon open={open} />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="mt-3 flex flex-col gap-2 pb-1">
            {exp.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-2 text-base leading-relaxed text-zinc-300"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-pad relative z-10 w-full overflow-hidden"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col gap-[30px]"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="hud-eyebrow font-mono text-sm font-medium tracking-widest text-blue-400 uppercase">
            <ScrambleText text="Experience" />
          </span>
          <ConstellationMotif className="hidden sm:block" />
        </motion.div>

        <div className="relative flex max-w-3xl flex-col gap-8">
          <div className="absolute top-1.5 bottom-1.5 left-[5px] w-px bg-blue-500/20" />

          {EXPERIENCE.map((exp) => (
            <ExperienceItem key={`${exp.role}-${exp.company}`} exp={exp} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
