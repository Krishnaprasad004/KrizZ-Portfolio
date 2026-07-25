"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const EYE_L = { cx: 37, cy: 52 };
const EYE_R = { cx: 63, cy: 52 };
const MAX_PUPIL_OFFSET = 4;
const TRACK_RADIUS = 400;

export default function RoboBuddy() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.min(dist, TRACK_RADIUS) / TRACK_RADIUS;
      setPupil({
        x: (dx / dist) * pull * MAX_PUPIL_OFFSET,
        y: (dy / dist) * pull * MAX_PUPIL_OFFSET,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let blinkOffId: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 3000;
      timeoutId = setTimeout(() => {
        setBlink(true);
        blinkOffId = setTimeout(() => setBlink(false), 150);
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(blinkOffId);
    };
  }, []);

  return (
    <motion.svg
      ref={svgRef}
      viewBox="0 0 100 100"
      aria-hidden
      className="h-20 w-20 sm:h-24 sm:w-24"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <line
        x1="50"
        y1="18"
        x2="50"
        y2="6"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="50" cy="4" r="3" fill="#3b82f6" />

      <rect
        x="12"
        y="18"
        width="76"
        height="64"
        rx="24"
        fill="rgba(59,130,246,0.08)"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      {[EYE_L, EYE_R].map((eye, i) => (
        <g key={i}>
          <circle
            cx={eye.cx}
            cy={eye.cy}
            r="12"
            fill="#0a0a0a"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
          <motion.circle
            r="5"
            fill="#3b82f6"
            animate={{
              cx: eye.cx + pupil.x,
              cy: eye.cy + pupil.y,
              scaleY: blink ? 0.1 : 1,
            }}
            transition={{
              cx: { type: "spring", stiffness: 120, damping: 12 },
              cy: { type: "spring", stiffness: 120, damping: 12 },
              scaleY: { duration: 0.1 },
            }}
            style={{ transformOrigin: `${eye.cx}px ${eye.cy}px` }}
          />
        </g>
      ))}

      <line
        x1="40"
        y1="70"
        x2="60"
        y2="70"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </motion.svg>
  );
}
