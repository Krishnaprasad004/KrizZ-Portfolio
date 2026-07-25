"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

interface MeteorData {
  position: number;
  delay: number;
  duration: number;
}

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorCount = number || 20;
  const [meteors, setMeteors] = useState<MeteorData[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only random init; Math.random() can't run during render (purity/SSR mismatch)
    setMeteors(
      Array.from({ length: meteorCount }, (_, idx) => ({
        position: idx * (800 / meteorCount) - 400,
        delay: Math.random() * 5,
        duration: Math.floor(Math.random() * (10 - 5) + 5),
      })),
    );
  }, [meteorCount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((meteor, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-blue-400 shadow-[0_0_0_1px_rgba(59,130,246,0.3)]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#3b82f6] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: "-40px",
            left: meteor.position + "px",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.duration + "s",
          }}
        ></span>
      ))}
    </motion.div>
  );
};
