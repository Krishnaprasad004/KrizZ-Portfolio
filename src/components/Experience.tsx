"use client";

import { motion } from "motion/react";

interface ExperienceEntry {
  role: string;
  company: string;
  duration?: string;
  current?: boolean;
  description: string;
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Data Engineer Intern",
    company: "Decision Minds, Pondicherry",
    current: true,
    description:
      "Working on data engineering and BI analytics projects, building ETL pipelines and dashboards, and exploring GenAI applications.",
  },
  {
    role: "Data Science Engineer Intern",
    company: "Jidoka Technologies",
    duration: "Dec 2025 – Feb 2026",
    description: "Focused on computer vision projects.",
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

export default function Experience() {
  return (
    <section
      id="experience"
      className="w-full bg-[#0a0a0a] px-6 py-24 sm:py-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-3xl flex-col gap-10"
      >
        <motion.span
          variants={item}
          className="font-mono text-sm font-medium tracking-widest text-blue-400 uppercase"
        >
          Experience
        </motion.span>

        <div className="relative flex flex-col gap-12">
          <div className="absolute top-1.5 bottom-1.5 left-[5px] w-px bg-blue-500/20" />

          {EXPERIENCE.map((exp) => (
            <motion.div
              key={`${exp.role}-${exp.company}`}
              variants={item}
              className="relative pl-10"
            >
              <span className="absolute top-1.5 left-0 h-3 w-3 rounded-full border-2 border-blue-400 bg-[#0a0a0a] shadow-[0_0_8px_rgba(59,130,246,0.6)]" />

              <h3 className="font-heading text-lg font-semibold tracking-tight text-white">{exp.role}</h3>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-blue-400">{exp.company}</span>
                {exp.duration && (
                  <>
                    <span className="text-zinc-600">·</span>
                    <span className="font-mono text-zinc-400">{exp.duration}</span>
                  </>
                )}
                {exp.current && (
                  <span className="rounded-full border border-blue-500/40 px-2 py-0.5 font-mono text-xs text-blue-300">
                    Current
                  </span>
                )}
              </div>

              <p className="mt-3 text-base leading-relaxed text-zinc-300">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
