"use client";

import { motion } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ConstellationMotif from "@/components/ConstellationMotif";

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

export default function Projects() {
  return (
    <section id="projects" className="section-pad relative z-10 w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-5xl flex-col gap-10"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-widest text-blue-400 uppercase">
            Projects
          </span>
          <ConstellationMotif className="hidden sm:block" />
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div key={project.slug} variants={item} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
