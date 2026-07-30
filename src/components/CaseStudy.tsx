"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";

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

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div variants={item} className="border-t border-blue-500/20 pt-8">
      <h2 className="font-mono text-xs font-medium tracking-wide text-blue-400 uppercase">
        {label}
      </h2>
      <div className="mt-3 text-base leading-relaxed text-zinc-300">
        {children}
      </div>
    </motion.div>
  );
}

export default function CaseStudy({ project }: { project: Project }) {
  const toolsUsed = project.toolsUsed ?? project.tags;

  return (
    <main className="relative z-10 w-full bg-[#0a0a0a]">
      <div
        className="h-64 w-full bg-cover bg-center bg-no-repeat sm:h-80 lg:h-96"
        style={{ backgroundImage: project.coverImage }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 sm:py-20"
      >
        <motion.div variants={item}>
          <Link
            href="/#projects"
            className="text-sm text-zinc-400 transition-colors hover:text-blue-400"
          >
            ← Back to projects
          </Link>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-4">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-500/30 px-3 py-1 font-mono text-xs text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <Section label="Problem">
          <p>{project.problem ?? "Add problem statement here."}</p>
        </Section>

        <Section label="Approach">
          <p>{project.approach ?? "Add approach details here."}</p>
        </Section>

        {project.dashboardOverview && (
          <Section label="Dashboard Overview">
            <p>{project.dashboardOverview}</p>
          </Section>
        )}

        {project.kpis && project.kpis.length > 0 && (
          <Section label="KPIs">
            <div className="flex flex-wrap gap-2">
              {project.kpis.map((kpi) => (
                <span
                  key={kpi}
                  className="rounded-full border border-blue-500/30 px-3 py-1 font-mono text-sm text-zinc-300"
                >
                  {kpi}
                </span>
              ))}
            </div>
          </Section>
        )}

        {project.visualizations && project.visualizations.length > 0 && (
          <Section label="Visualizations">
            <ul className="flex flex-col gap-2">
              {project.visualizations.map((v) => (
                <li key={v} className="flex gap-2">
                  <span className="text-blue-400">•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {project.insights && project.insights.length > 0 && (
          <Section label="Insights Generated">
            <ul className="flex flex-col gap-2">
              {project.insights.map((insight) => (
                <li key={insight} className="flex gap-2">
                  <span className="text-blue-400">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {project.features && project.features.length > 0 && (
          <Section label="Features">
            <ul className="flex flex-col gap-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-blue-400">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {project.businessValue && (
          <Section label="Business Value">
            <p>{project.businessValue}</p>
          </Section>
        )}

        <Section label="Tools Used">
          <div className="flex flex-wrap gap-2">
            {toolsUsed.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-blue-500/30 px-3 py-1 font-mono text-sm text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </Section>

        <Section label="Result">
          <p>{project.result ?? "Add result / impact here."}</p>
        </Section>

        {project.gallery && project.gallery.length > 0 && (
          <Section label="Gallery">
            <div className="flex flex-col gap-4">
              {project.gallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 768px, 100vw"
                  />
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section label="Links">
          {project.githubUrl || project.demoUrl ? (
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-blue-500/60 px-5 py-2 text-sm font-medium text-white shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.8)]"
                >
                  GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-blue-500/60 px-5 py-2 text-sm font-medium text-white shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.8)]"
                >
                  Live Demo
                </a>
              )}
            </div>
          ) : (
            <p className="text-zinc-500">Link coming soon.</p>
          )}
        </Section>
      </motion.div>
    </main>
  );
}
