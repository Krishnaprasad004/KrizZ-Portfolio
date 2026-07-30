"use client";

import { motion } from "motion/react";
import ConstellationMotif from "@/components/ConstellationMotif";

const FACTS = [
  { label: "Role", value: "Data Engineer Intern" },
  { label: "Specialty", value: "Data Engineering & BI Analytics" },
  {
    label: "Currently",
    value: "Data Engineer Intern @ Decision Minds, Pondicherry",
  },
];

const STACK = [
  "Python",
  "SQL",
  "Power BI",
  "DAX",
  "Databricks",
  "PySpark",
  "FastAPI",
];

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

export default function About() {
  return (
    <section id="about" className="section-pad relative z-10 w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-5xl flex-col gap-10"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="hud-eyebrow font-mono text-sm font-medium tracking-widest text-blue-400 uppercase">
            About
          </span>
          <ConstellationMotif className="hidden sm:block" />
        </motion.div>

        <motion.div variants={item}>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            About Me
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-blue-500 to-transparent" />
        </motion.div>

        <motion.p
          variants={item}
          className="max-w-3xl text-lg leading-relaxed text-zinc-300 sm:text-xl"
        >
          I&apos;m a Computer Science Engineering graduate specializing in{" "}
          <span className="font-medium text-blue-400">
            data engineering and BI analytics
          </span>
          , with a background that also draws on{" "}
          <span className="font-medium text-blue-400">
            computational social science
          </span>
          . My work spans building ETL pipelines, dashboards, and exploring{" "}
          <span className="font-medium text-blue-400">
            GenAI applications
          </span>{" "}
          — I care about turning raw data into systems people can actually
          act on.
        </motion.p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <motion.div variants={item} className="flex flex-col justify-between gap-6">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
              >
                <span className="font-mono text-xs font-medium tracking-wide text-blue-400 uppercase">
                  {fact.label}
                </span>
                <p className="mt-2 text-base text-zinc-100">{fact.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="hud-frame rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50">
                <h3 className="font-heading text-base font-semibold tracking-tight text-white">
                  End-to-End Systems
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Building ETL pipelines, dashboards, and GenAI applications
                  that connect raw data to real systems.
                </p>
              </div>

              <div className="hud-frame rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50">
                <h3 className="font-heading text-base font-semibold tracking-tight text-white">
                  Real-World Solutions
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  A Computer Science Engineering background with a focus on
                  computational social science — turning raw data into
                  systems people can actually act on.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <span className="font-mono text-xs font-medium tracking-wide text-blue-400 uppercase">
                Stack
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-blue-500/30 px-3 py-1 font-mono text-sm text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-4 font-mono text-xs text-zinc-500">
                Pondicherry, India
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
