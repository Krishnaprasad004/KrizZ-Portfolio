"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";

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
  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const extraTagCount = project.tags.length - visibleTags.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
    >
      {/* 1. Cover image — rounded top corners come from the card's own
          overflow-hidden clipping this flush-edge image. */}
      <div
        className="aspect-[3/1] w-full shrink-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: project.coverImage }}
      />

      <div className="flex flex-1 flex-col p-4">
        {/* 2. Tech-tag line */}
        <span className="block pb-4 font-mono text-[11px] tracking-wide text-blue-400 uppercase">
          {project.tags.join(", ")}
        </span>

        {/* 3. Title */}
        <h3 className="font-heading text-lg font-bold tracking-tight text-white">
          {project.title}
        </h3>

        {/* 4. Subtitle / category */}
        <p className="mt-1 text-sm font-medium text-zinc-300">
          {deriveSubtitle(project.description)}
        </p>

        {/* 5. Description — clamped to 2 lines so every card stays the same height */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        {/* 6. Pill tags */}
        <div className="mt-3 flex flex-wrap gap-2">
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

        {/* 7. View Details CTA */}
        <div className="mt-auto pt-4">
          <div className="flex w-full items-center justify-center gap-2 rounded-full border border-blue-500/60 bg-blue-500/10 px-5 py-2 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            View Details
            <ArrowIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}
