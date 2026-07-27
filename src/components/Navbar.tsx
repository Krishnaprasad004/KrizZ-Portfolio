"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getLenis } from "@/lib/lenis";
import CommandPaletteTrigger from "@/components/CommandPaletteTrigger";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Engineering Systems", href: "#engineering-systems" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const underline = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const lenis = getLenis();
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(href);
  };

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2 sm:top-6">
      <nav className="rounded-full border border-white/10 bg-black/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="flex items-center gap-4 px-5 py-2.5 sm:px-7 sm:py-3">
          <div className="flex flex-1 flex-col leading-tight">
            <span className="text-sm font-semibold tracking-widest text-white">
              Krishna Prasad H
            </span>
            <span className="font-mono text-[10px] tracking-wide text-blue-400 uppercase">
              Data Engineer
            </span>
          </div>

          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="relative text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                  <motion.span
                    variants={underline}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="absolute -bottom-1 left-0 h-px w-full bg-blue-400"
                  />
                </motion.a>
              </li>
            ))}
          </ul>

          <div className="flex flex-1 items-center justify-end gap-2">
            <CommandPaletteTrigger />

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }
                }
                className="h-px w-6 bg-zinc-200"
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }
                }
                className="h-px w-6 bg-zinc-200"
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col overflow-hidden px-6 lg:hidden"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      handleNavClick(e, link.href);
                    }}
                    className="block border-t border-white/10 py-4 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
