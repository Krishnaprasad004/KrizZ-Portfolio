"use client";

import { motion } from "motion/react";
import ConstellationMotif from "@/components/ConstellationMotif";
import ScrambleText from "@/components/ScrambleText";

const FACTS = [
  { label: "Role", value: "Data Engineer Intern", area: "role" },
  {
    label: "Specialty",
    value: "Data Engineering & BI Analytics",
    area: "spec",
  },
  {
    label: "Currently",
    value: "Data Engineer Intern @ Decision Minds, Pondicherry",
    area: "curr",
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
        className="mx-auto flex max-w-5xl flex-col gap-[30px]"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="hud-eyebrow font-mono text-sm font-medium tracking-widest text-blue-400 uppercase">
            <ScrambleText text="About" />
          </span>
          <ConstellationMotif className="hidden sm:block" />
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
          .
        </motion.p>

        <motion.div variants={item} className="about-grid">
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              style={{ gridArea: fact.area }}
              className="hud-frame flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50"
            >
              <span className="font-mono text-xs font-medium tracking-wide text-blue-400 uppercase">
                {fact.label}
              </span>
              <p className="mt-2 text-base text-zinc-100">{fact.value}</p>
            </div>
          ))}

          <div
            style={{ gridArea: "etc" }}
            className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2"
          >
            <div className="hud-frame flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50">
              <h3 className="font-heading text-base font-semibold tracking-tight text-white">
                End-to-End Systems
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                ETL pipelines, dashboards, and GenAI applications that
                connect raw data to real systems.
              </p>
            </div>

            <div className="hud-frame flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50">
              <h3 className="font-heading text-base font-semibold tracking-tight text-white">
                Real-World Solutions
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Turning raw data into systems people can actually act on.
              </p>
            </div>
          </div>

          <div
            style={{ gridArea: "stack" }}
            className="hud-frame flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50"
          >
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
      </motion.div>
    </section>
  );
}
