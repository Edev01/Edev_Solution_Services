"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lines = [
  { text: "We design systems that think,", accent: false },
  { text: "interfaces that stay calm,", accent: true },
  { text: "and platforms that ship.", accent: false },
];

const beats = [
  { label: "Discover", detail: "Map the real constraints" },
  { label: "Design", detail: "One product surface" },
  { label: "Build", detail: "Ship in vertical slices" },
  { label: "Operate", detail: "Keep the system calm" },
];

export function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const x = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const floatY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-32">
      <motion.p
        style={{ x, rotate }}
        className="pointer-events-none absolute left-[-5%] top-12 mega whitespace-nowrap text-[clamp(3.5rem,16vw,12rem)] text-line/90"
        aria-hidden
      >
        SIGNAL · SYSTEMS · SHIP
      </motion.p>

      <div className="shell relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow">02 / About</p>
          <div className="mt-5 space-y-1.5 sm:mt-6 sm:space-y-2">
            {lines.map((line, i) => (
              <motion.h2
                key={line.text}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`display text-[clamp(1.65rem,5.2vw,3.75rem)] ${
                  line.accent ? "grad-text" : "text-paper"
                }`}
              >
                {line.text}
              </motion.h2>
            ))}
          </div>

          {/* Fills the left space with motion + brand visual */}
          <motion.div
            style={{ y: floatY }}
            className="relative mt-8 hidden overflow-hidden border border-line lg:block"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/consulting.png"
                alt=""
                fill
                className="object-cover opacity-70"
                sizes="520px"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/40 to-transparent" />
              <motion.div
                animate={{ rotate: [0, 8, 0], y: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 right-4 h-16 w-16 md:h-20 md:w-20"
              >
                <Image
                  src="/logo.png"
                  alt=""
                  fill
                  className="object-contain drop-shadow-[0_0_24px_rgba(176,124,255,0.45)]"
                />
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-px border-t border-line bg-line">
              {beats.map((beat) => (
                <div key={beat.label} className="bg-panel px-4 py-3">
                  <p className="mono text-[0.62rem] uppercase tracking-[0.14em] text-lilac">
                    {beat.label}
                  </p>
                  <p className="mt-1 text-sm text-fog">{beat.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y }}
          className="max-w-md border border-line bg-panel p-6 lg:justify-self-end lg:p-8"
        >
          <p className="mono text-[0.65rem] uppercase tracking-[0.16em] text-lilac">
            Studio note
          </p>
          <p className="mt-4 text-base leading-relaxed text-fog md:text-lg">
            Edev Solutions blends agentic AI, cloud architecture, web and mobile
            product craft into one delivery motion, so your stack compounds
            instead of fragmenting.
          </p>
          <ul className="mt-6 space-y-3 border-t border-line pt-5 lg:hidden">
            {beats.map((beat) => (
              <li
                key={beat.label}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="text-paper">{beat.label}</span>
                <span className="text-fog">{beat.detail}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="btn mt-7">
            Our story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
