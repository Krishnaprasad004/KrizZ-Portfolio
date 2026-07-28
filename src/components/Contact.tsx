"use client";

import { motion } from "motion/react";
import ConstellationMotif from "@/components/ConstellationMotif";

const ROLES = ["Data Engineer", "BI Analyst", "GenAI Explorer"];

const GITHUB_URL = "https://github.com/Krishnaprasad004";
const LINKEDIN_URL = "https://www.linkedin.com/in/krishna-prasad-h-515a81194/";
const EMAIL = "prasadkamal04@gmail.com";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-4 w-4"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-4 w-4"
    >
      <path
        d="M9.5 14.5 14.5 9.5M11 6.5l1.5-1.5a3.5 3.5 0 0 1 5 5L16 11.5M13 17.5 11.5 19a3.5 3.5 0 0 1-5-5L8 12.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-4 w-4"
    >
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" strokeLinecap="round" />
    </svg>
  );
}

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

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad relative z-10 w-full overflow-hidden text-center"
    >
      <span
        aria-hidden
        className="font-heading pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[140px] leading-none font-bold text-white/[0.03] select-none sm:text-[220px] md:text-[280px]"
      >
        HIRE
      </span>

      <div className="section-container relative z-10">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 font-mono text-xs font-medium tracking-widest text-blue-300 uppercase backdrop-blur-md">
            Available for Hire
          </span>
          <ConstellationMotif className="hidden sm:block" />
        </motion.div>

        <motion.h2
          variants={item}
          className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          {ROLES.join(" / ")}
        </motion.h2>

        <motion.p variants={item} className="text-lg text-zinc-400">
          Have a project in mind or just want to say hi? Reach out — I&apos;d
          love to hear from you.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 rounded-full border border-blue-500/60 bg-blue-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.8)]"
          >
            <MailIcon />
            Hire Me
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-200 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50 hover:text-white"
          >
            Connect on LinkedIn
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 flex w-full flex-col items-center gap-4 border-t border-white/10 pt-8"
        >
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50 hover:text-blue-400"
            >
              <LinkIcon />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50 hover:text-blue-400"
            >
              <ShareIcon />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/50 hover:text-blue-400"
            >
              <MailIcon />
            </a>
          </div>
          <p className="font-mono text-xs text-zinc-500">
            © 2026 Krishna Prasad H. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
