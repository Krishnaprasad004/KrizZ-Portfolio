"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ConstellationMotif from "@/components/ConstellationMotif";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_QUERY = "(min-width: 1024px)";

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
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from matchMedia, unavailable during SSR so can't be computed during render
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) return;

    const track = trackRef.current;
    const viewport = viewportRef.current;
    const section = sectionRef.current;
    if (!track || !viewport || !section) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - viewport.offsetWidth);

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getScrollAmount(),
          // Lenis already smooths the underlying scroll motion; a numeric
          // (time-based) scrub here would add a second, independent lag on
          // top of it. Since the pin's start/end are raw-scroll-position
          // based but a lagged tween value isn't, fast scrolling could reach
          // `end` and release the pin before the animation caught up,
          // freezing the track short of its target. `true` ties x directly
          // to scroll position with no extra lag, so it always finishes
          // exactly when the pin releases.
          scrub: true,
          pin: true,
          // Explicit, not relying on the default: without this, the
          // .pin-spacer GSAP inserts was measured at just the section's own
          // height (900px) with zero reserved padding for the 844px pin
          // duration, so the page's total scroll height came up short by
          // exactly that amount — Engineering Systems ended up overlapping
          // into where Projects was still supposed to be scrolling.
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // getScrollAmount() depends on the track's rendered width, which can
      // still shift after web fonts finish loading (card titles/descriptions
      // reflow) — the pin's scroll distance is locked in at the last refresh,
      // so without this it can go stale. Refresh once, after fonts settle.
      document.fonts?.ready?.then(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 w-full shrink-0 px-6 py-24 sm:py-32 lg:h-screen lg:py-0"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex h-full max-w-6xl flex-col gap-10 lg:justify-center"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-widest text-blue-400 uppercase">
            Projects
          </span>
          <ConstellationMotif className="hidden sm:block" />
        </motion.div>

        {isDesktop ? (
          <div ref={viewportRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6"
              style={{ width: "max-content" }}
            >
              {projects.map((project) => (
                <div key={project.slug} className="w-[380px] shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <motion.div key={project.slug} variants={item} className="h-full">
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
