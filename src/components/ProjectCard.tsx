"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <CardSpotlight
        color="#3b82f6"
        className="flex h-full flex-col overflow-hidden p-0"
      >
        <div
          className="relative z-20 aspect-video w-full shrink-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: project.coverImage }}
        />

        <div className="relative z-20 flex flex-1 flex-col p-6">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-white">{project.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-500/30 px-3 py-1 font-mono text-xs text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardSpotlight>
    </Link>
  );
}
