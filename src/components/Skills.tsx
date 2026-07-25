"use client";

import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface SkillCategory {
  category: string;
  skills: string[];
  className: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Data Engineering",
    skills: ["Databricks", "PySpark", "FastAPI", "ETL", "ELT"],
    className: "md:col-span-2",
  },
  {
    category: "Data & BI",
    skills: ["Power BI", "DAX"],
    className: "md:col-span-1",
  },
  {
    category: "GenAI",
    skills: ["LLMs", "Prompt Engineering", "RAG"],
    className: "md:col-span-1",
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub"],
    className: "md:col-span-2",
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
    <section id="skills" className="w-full bg-[#0a0a0a] px-6 py-24 sm:py-32">
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
          Skills
        </motion.span>

        <BentoGrid className="max-w-none md:grid-cols-3 md:auto-rows-[10rem]">
          {SKILL_CATEGORIES.map((group) => (
            <motion.div key={group.category} variants={item} className={group.className}>
              <BentoGridItem
                title={group.category}
                className="h-full"
                header={
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-blue-500/30 px-3 py-1 font-mono text-xs text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                }
              />
            </motion.div>
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  );
}
