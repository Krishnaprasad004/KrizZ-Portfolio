"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/data/projects";

const MAX_TILT_DEG = 8;

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

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
      >
        <div
          className="aspect-video w-full shrink-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: project.coverImage }}
        />

        <div className="flex flex-1 flex-col p-6">
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
      </motion.div>
    </Link>
  );
}
