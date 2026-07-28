import type Lenis from "lenis";

let instance: Lenis | null = null;
let programmaticUntil = 0;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Marks an upcoming scroll as programmatic (nav click, command palette),
 *  so scroll-direction-based UI (e.g. navbar hide-on-scroll) can ignore it. */
export function markProgrammaticScroll(durationMs = 1500) {
  programmaticUntil = Date.now() + durationMs;
}

export function isProgrammaticScroll() {
  return Date.now() < programmaticUntil;
}
