"use client";

import { motion } from "motion/react";

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    name: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    year: "July 2026",
  },
  {
    name: "Databricks Certified Data Analyst Associate",
    issuer: "Databricks",
    year: "July 2026",
  },
  {
    name: "Python for Data Analysis",
    issuer: "IBM",
    year: "2026",
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

function BadgeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 text-blue-400"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="12" cy="9" r="6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8.5 14.5 7 22l5-2.5L17 22l-1.5-7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="w-full bg-[#0a0a0a] px-6 py-24 sm:py-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-5xl flex-col gap-10"
      >
        <motion.span
          variants={item}
          className="text-sm font-medium tracking-widest text-blue-400 uppercase"
        >
          Certifications
        </motion.span>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={`${cert.issuer}-${cert.name}`}
              variants={item}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                <BadgeIcon />
              </div>

              <h3 className="mt-4 text-base font-semibold text-white">
                {cert.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                {cert.issuer} · {cert.year}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
