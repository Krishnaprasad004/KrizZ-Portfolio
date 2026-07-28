"use client";

import { motion } from "motion/react";
import ConstellationMotif from "@/components/ConstellationMotif";

interface PipelineStep {
  label: string;
  sublabel: string;
}

interface Pillar {
  title: string;
  description: string;
  pipeline: PipelineStep[];
  stack: string[];
  icon: React.ReactNode;
}

function DataEngineeringIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v6c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 11v6c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BiAnalyticsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 20V10M11 20V4M18 20v-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 20h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GenAiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <path
        d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function StepIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
    </svg>
  );
}

function DownArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 text-[#38bdf8]" aria-hidden>
      <path d="M8 2v11M4 9l4 4 4-4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerticalPipeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <div className="mt-5 flex flex-col items-stretch">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-col items-center">
          <div className="flex w-full items-center gap-2 rounded-lg border border-blue-500/30 bg-white/[0.02] px-3 py-2">
            <StepIcon />
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-xs text-zinc-200">{step.label}</span>
              <span className="font-mono text-[10px] text-zinc-500 uppercase">{step.sublabel}</span>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="py-1">
              <DownArrowIcon />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const PILLARS: Pillar[] = [
  {
    title: "Data Engineering",
    description: "Building scalable pipelines and data infrastructure.",
    pipeline: [
      { label: "Sources", sublabel: "Source" },
      { label: "ETL", sublabel: "Process" },
      { label: "Databricks", sublabel: "Platform" },
      { label: "Warehouse", sublabel: "Storage" },
      { label: "Dashboards", sublabel: "Output" },
    ],
    stack: ["Databricks", "PySpark", "FastAPI", "ETL", "ELT"],
    icon: <DataEngineeringIcon />,
  },
  {
    title: "BI & Analytics",
    description: "Turning raw data into dashboards and decisions.",
    pipeline: [
      { label: "Raw Data", sublabel: "Source" },
      { label: "SQL", sublabel: "Query" },
      { label: "Power BI", sublabel: "Platform" },
      { label: "Dashboards", sublabel: "Visual" },
      { label: "Decisions", sublabel: "Output" },
    ],
    stack: ["Power BI", "DAX"],
    icon: <BiAnalyticsIcon />,
  },
  {
    title: "GenAI",
    description: "Applying LLMs to real-world workflows.",
    pipeline: [
      { label: "Input", sublabel: "Source" },
      { label: "LLM", sublabel: "Model" },
      { label: "RAG Retrieval", sublabel: "Process" },
      { label: "Response", sublabel: "Output" },
    ],
    stack: ["LLMs", "Prompt Engineering", "RAG"],
    icon: <GenAiIcon />,
  },
];

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

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="8" width="18" height="8" rx="2" />
      <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" strokeLinecap="round" />
    </svg>
  );
}

function FunnelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 4h16l-6 8v6l-4 2v-8L4 4Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitBranchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 8v8M6 8c0 4 4 3 12 3M18 11v0" strokeLinecap="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-blue-400">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

const CORE_TECH = [
  { name: "Python", icon: <PythonIcon /> },
  { name: "SQL", icon: <SqlIcon /> },
  { name: "Power BI", icon: <PowerBiIcon /> },
  { name: "Databricks", icon: <DatabricksIcon /> },
  { name: "PySpark", icon: <SparkIcon /> },
  { name: "FastAPI", icon: <ApiIcon /> },
  { name: "ETL", icon: <FunnelIcon /> },
  { name: "ELT", icon: <FunnelIcon /> },
  { name: "Git", icon: <GitBranchIcon /> },
  { name: "GitHub", icon: <GitHubIcon /> },
];

const MARQUEE_ITEMS = [...CORE_TECH, ...CORE_TECH];

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

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative z-10 w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="section-container flex flex-col gap-10"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-widest text-blue-400 uppercase">
            Skills
          </span>
          <ConstellationMotif className="hidden sm:block" />
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <motion.div key={pillar.title} variants={item} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                  {pillar.icon}
                </div>

                <h3 className="font-heading mt-4 text-lg font-semibold tracking-tight text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{pillar.description}</p>

                <VerticalPipeline steps={pillar.pipeline} />

                <div className="mt-auto pt-5">
                  <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                    Stack
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {pillar.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-blue-500/30 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item}>
          <span className="font-mono text-xs font-medium tracking-widest text-blue-400 uppercase">
            Core Technologies
          </span>

          <div className="mt-4 hidden flex-wrap items-center gap-x-2 gap-y-3 sm:flex">
            {CORE_TECH.map((tech, i) => (
              <div key={tech.name} className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 font-mono text-sm text-zinc-300">
                  {tech.icon}
                  {tech.name}
                </span>
                {i < CORE_TECH.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-zinc-600" />
                )}
              </div>
            ))}
          </div>

          <div
            className="relative mt-4 w-full overflow-hidden sm:hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div
              className="flex w-max items-center gap-3"
              style={{ animation: "marquee 22s linear infinite" }}
            >
              {MARQUEE_ITEMS.map((tech, i) => (
                <span
                  key={`${tech.name}-${i}`}
                  className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-white/5 px-4 py-2 font-mono text-xs whitespace-nowrap text-zinc-300 backdrop-blur-md"
                >
                  {tech.icon}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
