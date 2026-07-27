"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getLenis } from "@/lib/lenis";

const ROLES = ["Data Engineer", "BI Analyst", "GenAI Explorer"];
const ROLE_INTERVAL_MS = 2600;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function CornerBrackets() {
  const corners = [
    "top-0 left-0 border-t border-l",
    "top-0 right-0 border-t border-r",
    "bottom-0 left-0 border-b border-l",
    "bottom-0 right-0 border-b border-r",
  ];

  return (
    <>
      {corners.map((pos) => (
        <motion.span
          key={pos}
          aria-hidden
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className={`pointer-events-none absolute h-3 w-3 border-blue-400 ${pos}`}
        />
      ))}
    </>
  );
}

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, ROLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative inline-block px-6 py-3">
      <CornerBrackets />
      <div className="relative h-8 w-56 overflow-hidden sm:h-9 sm:w-64">
        <AnimatePresence mode="wait">
          <motion.span
            key={ROLES[index]}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center text-lg text-blue-300 sm:text-xl"
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-500"
    >
      <span className="font-mono text-[11px] tracking-widest uppercase">
        Scroll
      </span>
      <motion.svg
        viewBox="0 0 16 24"
        className="h-5 w-3.5 text-blue-400"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M8 1v18M2 13l6 6 6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export default function Hero() {
  const handleScrollTo = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const lenis = getLenis();
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(href);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.span
          variants={item}
          className="font-mono text-sm tracking-widest text-zinc-400 uppercase"
        >
          Hi, I&apos;m
        </motion.span>

        <motion.h2
          variants={item}
          className="font-heading mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Krishna Prasad H
        </motion.h2>

        <motion.div variants={item} className="mt-4">
          <RotatingRole />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-2 max-w-md text-base text-zinc-400 sm:text-lg"
        >
          Designing reliable data pipelines, BI systems, and exploring
          GenAI applications.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, "#projects")}
            className="rounded-full border border-blue-500/60 px-8 py-3 text-sm font-medium text-white shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.8)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-zinc-200 transition-colors duration-300 hover:border-blue-500/50 hover:text-white"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
