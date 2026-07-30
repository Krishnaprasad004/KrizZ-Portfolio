"use client";

import { useEffect } from "react";

/**
 * Gives every `.hud-frame` card a light source that tracks the cursor.
 *
 * Uses one delegated pointermove listener on the document rather than a
 * listener per card, and only writes two CSS custom properties — the actual
 * gradient lives in globals.css, so this never triggers React re-renders.
 */
export default function HudSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let lastEvent: PointerEvent | null = null;

    const apply = () => {
      ticking = false;
      const e = lastEvent;
      if (!e) return;
      const target = (e.target as Element | null)?.closest?.(".hud-frame");
      if (!(target instanceof HTMLElement)) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      target.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
