"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Vortex } from "@/components/ui/vortex";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const photoItem = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <Vortex
        backgroundColor="#000000"
        baseHue={220}
        rangeHue={30}
        particleCount={450}
        rangeY={800}
        baseSpeed={0.1}
        rangeSpeed={1.2}
        containerClassName="min-h-screen w-full"
        className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-8 text-center"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center"
        >
          <motion.div
            variants={photoItem}
            className="relative mb-6 h-[160px] w-[160px] overflow-hidden rounded-full border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.5)] sm:h-[180px] sm:w-[180px]"
          >
            <Image
              src="/profile.png"
              alt="Krishna Prasad H"
              fill
              priority
              sizes="180px"
              className="rounded-full object-cover object-[center_8%]"
            />
          </motion.div>

          <motion.h1
            variants={item}
            className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Krishna Prasad H
          </motion.h1>

          <TextGenerateEffect
            words="Data Engineer / Data Analyst"
            duration={0.5}
            className="mt-4 text-lg text-zinc-100 [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] sm:text-xl"
          />

          <motion.a
            variants={item}
            href="#"
            className="mt-10 rounded-full border border-blue-500/60 px-8 py-3 text-sm font-medium text-white shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.8)]"
          >
            View My Work
          </motion.a>
        </motion.div>
      </Vortex>
    </section>
  );
}
