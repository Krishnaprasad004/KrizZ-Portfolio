"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getLenis } from "@/lib/lenis";

interface Certification {
  name: string;
  issuer: string;
  year: string;
  image: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    name: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    year: "July 2026",
    image: "/certificates/databricks-data-engineer-associate.png",
  },
  {
    name: "Databricks Certified Data Analyst Associate",
    issuer: "Databricks",
    year: "July 2026",
    image: "/certificates/databricks-data-analyst-associate.png",
  },
  {
    name: "Python for Data Analysis",
    issuer: "IBM",
    year: "2026",
    image: "/certificates/ibm-python-for-data-analysis.png",
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

function ViewIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export default function Certifications() {
  const [openCert, setOpenCert] = useState<Certification | null>(null);

  useEffect(() => {
    if (!openCert) return;

    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCert(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openCert]);

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
          className="font-mono text-sm font-medium tracking-widest text-blue-400 uppercase"
        >
          Certifications
        </motion.span>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <motion.button
              key={`${cert.issuer}-${cert.name}`}
              type="button"
              variants={item}
              onClick={() => setOpenCert(cert)}
              className="group relative block w-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                <BadgeIcon />
              </div>

              <h3 className="font-heading mt-4 text-base font-semibold tracking-tight text-white">
                {cert.name}
              </h3>
              <p className="mt-2 font-mono text-sm text-zinc-400">
                {cert.issuer} · {cert.year}
              </p>

              <span className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ViewIcon />
                View Certificate
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {openCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw]"
            >
              <button
                type="button"
                onClick={() => setOpenCert(null)}
                aria-label="Close"
                className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full border border-blue-500/60 bg-[#0a0a0a] text-white shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.8)]"
              >
                <CloseIcon />
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={openCert.image}
                alt={openCert.name}
                className="max-h-[90vh] max-w-[90vw] rounded-lg border border-white/10 object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
