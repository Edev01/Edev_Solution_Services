"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lines = [
  { text: "We design systems that think,", accent: false },
  { text: "interfaces that stay calm,", accent: true },
  { text: "and platforms that ship.", accent: false },
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

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-32">
      <motion.p
        style={{ x, rotate }}
        className="pointer-events-none absolute left-[-5%] top-12 mega whitespace-nowrap text-[clamp(3.5rem,16vw,12rem)] text-line/90"
        aria-hidden
      >
        SIGNAL · SYSTEMS · SHIP
      </motion.p>

      <div className="shell relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-14">
        <div>
          <p className="eyebrow">02 / About</p>
          <div className="mt-5 space-y-1.5 sm:mt-6 sm:space-y-2">
            {lines.map((line, i) => (
              <motion.h2
                key={line.text}
                initial={{ opacity: 0, y: 36, clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`display text-[clamp(1.65rem,5.2vw,3.75rem)] ${
                  line.accent ? "grad-text" : "text-paper"
                }`}
              >
                {line.text}
              </motion.h2>
            ))}
          </div>
        </div>

        <motion.div style={{ y }} className="max-w-md border border-line bg-panel p-6 lg:justify-self-end lg:p-8">
          <p className="text-base leading-relaxed text-fog md:text-lg">
            Edev Solutions blends agentic AI, cloud architecture, web and mobile
            product craft into one delivery motion — so your stack compounds
            instead of fragmenting.
          </p>
          <Link href="/about" className="btn mt-7">
            Our story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
