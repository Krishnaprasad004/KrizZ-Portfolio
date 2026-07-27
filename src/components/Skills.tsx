"use client";

import { motion } from "motion/react";
import ConstellationMotif from "@/components/ConstellationMotif";

interface SkillCategory {
  category: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Data & BI",
    skills: ["Power BI", "DAX"],
  },
  {
    category: "Data Engineering",
    skills: ["Databricks", "PySpark", "FastAPI", "ETL", "ELT"],
  },
  {
    category: "GenAI",
    skills: ["LLMs", "Prompt Engineering", "RAG"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub"],
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

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 w-full px-6 py-24 sm:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-5xl flex-col gap-10"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-widest text-blue-400 uppercase">
            Skills
          </span>
          <ConstellationMotif className="hidden sm:block" />
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((group) => (
            <motion.div key={group.category} variants={item} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                <h3 className="font-heading text-sm font-semibold tracking-tight text-white">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-500/30 px-3 py-1 font-mono text-xs text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
