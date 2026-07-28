"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "motion/react";
import { getLenis, markProgrammaticScroll } from "@/lib/lenis";
import { projects } from "@/data/projects";

const SECTIONS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Certifications", id: "certifications" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const CommandPaletteContext = createContext<{ open: () => void } | null>(
  null
);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) {
    throw new Error(
      "useCommandPalette must be used within a CommandPaletteProvider"
    );
  }
  return ctx;
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0 text-zinc-500"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export default function CommandPaletteProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  const goToSection = (id: string) => {
    setOpen(false);
    if (pathname === "/") {
      const lenis = getLenis();
      if (lenis) {
        markProgrammaticScroll();
        lenis.scrollTo(`#${id}`);
        return;
      }
    }
    router.push(`/#${id}`);
  };

  const goToProject = (slug: string) => {
    setOpen(false);
    router.push(`/projects/${slug}`);
  };

  return (
    <CommandPaletteContext.Provider value={{ open: () => setOpen(true) }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-[15vh] backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            >
              <Command
                loop
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-blue-400 [&_[cmdk-group-heading]]:uppercase"
              >
                <div className="flex items-center gap-2.5 border-b border-white/10 px-4">
                  <SearchIcon />
                  <Command.Input
                    autoFocus
                    placeholder="Jump to a section or project..."
                    className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-zinc-500"
                  />
                </div>

                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="px-3 py-6 text-center text-sm text-zinc-500">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Sections">
                    {SECTIONS.map((section) => (
                      <Command.Item
                        key={section.id}
                        value={section.label}
                        onSelect={() => goToSection(section.id)}
                        className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-zinc-300 data-[selected=true]:bg-blue-500/10 data-[selected=true]:text-white"
                      >
                        {section.label}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="Projects">
                    {projects.map((project) => (
                      <Command.Item
                        key={project.slug}
                        value={project.title}
                        onSelect={() => goToProject(project.slug)}
                        className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-zinc-300 data-[selected=true]:bg-blue-500/10 data-[selected=true]:text-white"
                      >
                        {project.title}
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CommandPaletteContext.Provider>
  );
}
