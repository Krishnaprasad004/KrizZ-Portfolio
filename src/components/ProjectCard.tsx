"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/data/projects";

const MAX_TILT_DEG = 8;
const MAX_VISIBLE_TAGS = 3;

/** Derives a short one-line subtitle from a project's existing description — no new copy. */
function deriveSubtitle(description: string): string {
  const colonIndex = description.indexOf(":");
  const base =
    colonIndex > 0 ? description.slice(0, colonIndex) : description.split(".")[0];
  const trimmed = base.trim();
  return trimmed.length > 64 ? `${trimmed.slice(0, 61).trimEnd()}…` : trimmed;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]),
    { stiffness: 300, damping: 25 }
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]),
    { stiffness: 300, damping: 25 }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const extraTagCount = project.tags.length - visibleTags.length;

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
      >
        <div
          className="aspect-video w-full shrink-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: project.coverImage }}
        />

        <div className="flex flex-1 flex-col p-6">
          <span className="font-mono text-[11px] tracking-wide text-blue-400 uppercase">
            {project.tags.join(", ")}
          </span>

          <h3 className="font-heading mt-2 text-lg font-bold tracking-tight text-white">
            {project.title}
          </h3>

          <p className="mt-1 text-sm font-medium text-zinc-300">
            {deriveSubtitle(project.description)}
          </p>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-500/30 px-3 py-1 font-mono text-xs text-zinc-300"
              >
                {tag}
              </span>
            ))}
            {extraTagCount > 0 && (
              <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-zinc-400">
                +{extraTagCount}
              </span>
            )}
          </div>

          <div className="mt-auto pt-5">
            <div className="flex w-full items-center justify-center gap-2 rounded-full border border-blue-500/60 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              View Details
              <ArrowIcon />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
