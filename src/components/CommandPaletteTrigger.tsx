"use client";

import { useCommandPalette } from "@/components/CommandPaletteProvider";

function KeyboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <rect x="2.5" y="6" width="19" height="13" rx="2" />
      <path
        d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9.5 14h5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CommandPaletteTrigger() {
  const { open } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command palette"
      className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition-colors duration-200 hover:text-blue-400"
    >
      <KeyboardIcon />
    </button>
  );
}
