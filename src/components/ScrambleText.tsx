"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}*#%&";
const FRAMES_PER_CHAR = 3;

/**
 * Renders `text`, but the first time it scrolls into view each character
 * "decodes" from random glyphs into its final letter, left to right.
 *
 * The real string is what renders on the server and on first paint, so the
 * effect is purely additive — no layout shift, and nothing is hidden from
 * search engines or screen readers (the animating span is aria-hidden and
 * the true text stays in the accessibility tree).
 */
export default function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number | null = null;
    let frame = 0;
    let done = false;

    const tick = () => {
      const revealed = Math.floor(frame / FRAMES_PER_CHAR);
      if (revealed >= text.length) {
        setDisplay(text);
        done = true;
        rafId = null;
        return;
      }

      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealed || text[i] === " ") {
          out += text[i];
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      frame++;
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !done && rafId === null) {
          frame = 0;
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [text]);

  return (
    <>
      <span ref={ref} aria-hidden>
        {display}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
