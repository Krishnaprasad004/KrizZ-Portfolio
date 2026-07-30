"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 300;
const FRAME_DIR = "/face";
const framePath = (i: number) =>
  `${FRAME_DIR}/frame-${String(i).padStart(3, "0")}.webp`;

const SRC_ASPECT = 1280 / 720;

export default function FaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded = new Array<boolean>(FRAME_COUNT).fill(false);

    let currentFrame = 1;
    let targetFrame = 1;
    let rafId: number | null = null;
    let scrollTicking = false;

    function nearestLoadedIndex(target: number) {
      const rounded = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.round(target))
      );
      if (loaded[rounded - 1]) return rounded;
      for (let d = 1; d < FRAME_COUNT; d++) {
        const lo = rounded - d;
        const hi = rounded + d;
        if (lo >= 1 && loaded[lo - 1]) return lo;
        if (hi <= FRAME_COUNT && loaded[hi - 1]) return hi;
      }
      return null;
    }

    function draw() {
      if (!canvas || !ctx) return;
      const idx = nearestLoadedIndex(currentFrame);
      if (idx === null) return;
      const img = images[idx - 1];

      const cw = canvas.width;
      const ch = canvas.height;
      const canvasAspect = cw / ch;

      let dw: number, dh: number;
      if (canvasAspect > SRC_ASPECT) {
        dw = cw;
        dh = cw / SRC_ASPECT;
      } else {
        dh = ch;
        dw = ch * SRC_ASPECT;
      }
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function settleLoop() {
      currentFrame += (targetFrame - currentFrame) * 0.15;
      if (Math.abs(targetFrame - currentFrame) < 0.05) {
        currentFrame = targetFrame;
        draw();
        rafId = null;
        return;
      }
      draw();
      rafId = requestAnimationFrame(settleLoop);
    }

    function kickSettle() {
      if (rafId === null) rafId = requestAnimationFrame(settleLoop);
    }

    function computeTargetFromScroll() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      targetFrame = 1 + clamped * (FRAME_COUNT - 1);
    }

    function onScroll() {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        computeTargetFromScroll();
        kickSettle();
        scrollTicking = false;
      });
    }

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
      draw();
    }

    resize();
    computeTargetFromScroll();
    currentFrame = targetFrame;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.onload = () => {
        loaded[i - 1] = true;
        if (Math.abs(i - currentFrame) < 20) draw();
      };
      images[i - 1] = img;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[#0a0a0a]/40" />
    </div>
  );
}
