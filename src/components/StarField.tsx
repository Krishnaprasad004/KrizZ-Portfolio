"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  maxOpacity: number;
  cycleDuration: number;
  phase: number;
}

function createStars(width: number, height: number, count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.6 + Math.random() * 1.3,
    maxOpacity: 0.3 + Math.random() * 0.6,
    cycleDuration: 2500 + Math.random() * 4500,
    phase: Math.random() * 10000,
  }));
}

function starOpacity(star: Star, t: number): number {
  const local = (t + star.phase) % star.cycleDuration;
  const p = local / star.cycleDuration;
  let envelope: number;
  if (p < 0.2) envelope = p / 0.2;
  else if (p < 0.65) envelope = 1;
  else envelope = 1 - (p - 0.65) / 0.35;
  return envelope * star.maxOpacity;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const frameRef = useRef<number>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      starsRef.current = createStars(rect.width, rect.height, 90);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of starsRef.current) {
        const opacity = starOpacity(star, t);
        if (opacity <= 0.01) continue;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", setSize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
