"use client";

import { motion } from "motion/react";

interface Pillar {
  title: string;
  description: string;
  tags: string[];
  note?: string;
  icon: React.ReactNode;
}

function DataEngineeringIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 text-blue-400"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path
        d="M5 5v6c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 11v6c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BiAnalyticsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 text-blue-400"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        d="M4 20V10M11 20V4M18 20v-7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 20h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GenAiIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 text-blue-400"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const PILLARS: Pillar[] = [
  {
    title: "Data Engineering",
    description: "Building scalable pipelines and data infrastructure.",
    tags: ["Databricks", "PySpark", "ETL", "Medallion Architecture"],
    icon: <DataEngineeringIcon />,
  },
  {
    title: "BI & Analytics",
    description: "Turning raw data into dashboards and decisions.",
    tags: ["Power BI", "DAX", "Excel", "SQL"],
    icon: <BiAnalyticsIcon />,
  },
  {
    title: "GenAI",
    description: "Applying LLMs to real-world workflows.",
    tags: ["LLMs", "Prompt Engineering"],
    note: "Currently exploring — RAG project in progress",
    icon: <GenAiIcon />,
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

export default function EngineeringSystems() {
  return (
    <section
      id="engineering-systems"
      className="w-full bg-[#0a0a0a] px-6 py-24 sm:py-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-5xl flex-col gap-10"
      >
        <motion.span
          variants={item}
          className="font-mono text-sm font-medium tracking-widest text-blue-400 uppercase"
        >
          Engineering Systems
        </motion.span>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <motion.div key={pillar.title} variants={item} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                  {pillar.icon}
                </div>

                <h3 className="font-heading mt-4 text-lg font-semibold tracking-tight text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {pillar.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-blue-500/30 px-3 py-1 font-mono text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {pillar.note && (
                  <p className="mt-4 text-xs text-zinc-500 italic">
                    {pillar.note}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
