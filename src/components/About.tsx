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

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Krishnaprasad004",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/krishna-prasad-h-515a81194/",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:prasadkamal04@gmail.com",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="m3 6 9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
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
    <section id="about" className="relative z-10 w-full px-6 py-24 sm:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-5xl flex-col gap-10"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-widest text-blue-400 uppercase">
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
          <motion.div variants={item} className="flex flex-col gap-4">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
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
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50">
                <h3 className="font-heading text-base font-semibold tracking-tight text-white">
                  End-to-End Systems
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Building ETL pipelines, dashboards, and GenAI applications
                  that connect raw data to real systems.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50">
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

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-medium tracking-wide text-blue-400 uppercase">
                  Stack
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  Pondicherry, India
                </span>
              </div>
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
            </div>

            <div className="flex flex-wrap gap-3">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50 hover:text-white"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
