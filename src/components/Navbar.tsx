"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getLenis, markProgrammaticScroll, isProgrammaticScroll } from "@/lib/lenis";
import CommandPaletteTrigger from "@/components/CommandPaletteTrigger";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
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
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState("");
  const lastScrollY = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Scroll-spy: highlights whichever section currently owns the middle of the
  // viewport. The rootMargin band keeps exactly one section "active" at a time
  // instead of flickering between two during the handover.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.href.slice(1))
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const winner = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (winner) setActiveId(winner.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Single source of truth for how much clearance every section needs under
  // the fixed navbar: measure its real rendered bottom edge (not the
  // hide-on-scroll-animated position — the resting position, since that's
  // the worst case a scroll-margin needs to clear) and publish it as a CSS
  // var. globals.css reads --navbar-clearance instead of a hardcoded value,
  // so it can never drift out of sync with the navbar's actual size.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const NAVBAR_BUFFER_PX = 24;

    const updateClearance = () => {
      const bottom = wrapper.getBoundingClientRect().bottom;
      document.documentElement.style.setProperty(
        "--navbar-clearance",
        `${Math.ceil(bottom + NAVBAR_BUFFER_PX)}px`
      );
    };

    updateClearance();
    document.fonts?.ready?.then(updateClearance);

    const resizeObserver = new ResizeObserver(updateClearance);
    resizeObserver.observe(wrapper);
    window.addEventListener("resize", updateClearance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateClearance);
    };
  }, []);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const lenis = getLenis();
    if (!lenis) return;
    event.preventDefault();
    markProgrammaticScroll();
    setHidden(false);
    lenis.scrollTo(href);
  };

  // Hide the floating navbar while the user scrolls down through content
  // (it would otherwise sit on top of and visually slice whatever passes
  // underneath it), and reveal it again on scroll-up or near the page top.
  useEffect(() => {
    if (reduced) return;
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (!isProgrammaticScroll()) {
          if (currentY < 96) {
            setHidden(false);
          } else if (delta > 4) {
            setHidden(true);
          } else if (delta < -4) {
            setHidden(false);
          }
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <div
      ref={wrapperRef}
      className="fixed top-4 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2 sm:top-6"
    >
      <motion.div
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: hidden ? "none" : "auto" }}
      >
      <nav className="rounded-full border border-white/10 bg-black/90 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl">
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
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? "true" : undefined}
                    initial="rest"
                    animate={isActive ? "hover" : "rest"}
                    whileHover="hover"
                    className={`relative text-sm font-medium transition-colors duration-200 hover:text-white ${
                      isActive
                        ? "text-white [text-shadow:0_0_12px_rgba(62,166,255,0.65)]"
                        : "text-zinc-300"
                    }`}
                  >
                    {link.label}
                    <motion.span
                      variants={underline}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ originX: 0 }}
                      className={`absolute -bottom-1 left-0 h-px w-full bg-blue-400 ${
                        isActive ? "shadow-[0_0_8px_rgba(62,166,255,0.9)]" : ""
                      }`}
                    />
                  </motion.a>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-1 items-center justify-end gap-2">
            <CommandPaletteTrigger />

            <button
              type="button"
              onClick={() => {
                setMobileOpen((open) => !open);
                setHidden(false);
              }}
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
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        setMobileOpen(false);
                        handleNavClick(e, link.href);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center gap-2 border-t border-white/10 py-4 text-sm font-medium transition-colors duration-200 hover:text-white ${
                        isActive ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {isActive && (
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(62,166,255,0.9)]"
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
      </motion.div>
    </div>
  );
}
