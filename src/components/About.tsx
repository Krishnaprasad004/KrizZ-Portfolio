"use client";

import { motion } from "motion/react";

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

const BIO =
  "I'm a Computer Science Engineering graduate specializing in data engineering and BI analytics, with a background that also draws on computational social science. My work spans building ETL pipelines, dashboards, and exploring GenAI applications — I care about turning raw data into systems people can actually act on.";

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
    <section
      id="about"
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
          className="text-sm font-medium tracking-widest text-blue-400 uppercase"
        >
          About
        </motion.span>

        <motion.p
          variants={item}
          className="text-lg leading-relaxed text-zinc-300 sm:text-xl"
        >
          {BIO}
        </motion.p>

        <motion.dl
          variants={item}
          className="grid grid-cols-1 gap-6 border-t border-blue-500/20 pt-8 sm:grid-cols-3"
        >
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-medium tracking-wide text-blue-400 uppercase">
                {fact.label}
              </dt>
              <dd className="mt-2 text-base text-zinc-100">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={item}>
          <span className="text-xs font-medium tracking-wide text-blue-400 uppercase">
            Stack
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-500/30 px-3 py-1 text-sm text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
