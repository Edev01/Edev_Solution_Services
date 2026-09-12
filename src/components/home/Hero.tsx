"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/site";

const lanes = [
  "Agentic AI",
  "Cloud",
  "Web Platforms",
  "Mobile",
  "DevOps",
  "Automation",
  "Machine Learning",
  "Cybersecurity",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const lineW = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20 sm:pt-28 md:pt-32"
    >
      <motion.div
        style={{ scale: scaleBg }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <Image
          src="/images/hero-atmosphere.png"
          alt=""
          fill
          priority
          className="object-cover opacity-35 sm:opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/65 to-ink" />
        <div className="diamond-grid absolute inset-0 opacity-35 sm:opacity-50" />
      </motion.div>

      <div
        className="pointer-events-none absolute -left-28 top-24 h-48 w-48 rounded-full bg-orchid/25 blur-3xl sm:h-72 sm:w-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-40 h-44 w-44 rounded-full bg-signal/20 blur-3xl sm:h-64 sm:w-64"
        aria-hidden
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex flex-1 flex-col justify-center py-8 sm:py-10"
      >
        <div className="shell">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="eyebrow mb-4 sm:mb-6"
          >
            Studio · Built to ship
          </motion.p>

          <h1 className="mega text-[clamp(2.5rem,12vw,8.5rem)] leading-[0.92] text-paper">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Edev
            </motion.span>
            <motion.span
              className="grad-text block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Solutions
            </motion.span>
          </h1>

          <motion.div
            style={{ width: lineW }}
            className="mt-5 h-px bg-gradient-to-r from-signal via-lilac to-transparent sm:mt-6"
          />

          <motion.div
            className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8 lg:flex-row lg:items-end lg:justify-between"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="max-w-md text-[0.95rem] leading-relaxed text-fog sm:max-w-xl sm:text-base md:text-lg">
              <span className="sm:hidden">
                Agentic systems, cloud, web, and mobile — shaped as one product
                surface.
              </span>
              <span className="hidden sm:inline">
                {siteConfig.tagline} Web, mobile, cloud, and agent workflows
                shaped as one continuous product surface.
              </span>
            </p>

            <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="btn w-full justify-center sm:w-auto">
                Start a project
              </Link>
              <Link
                href="/services"
                className="btn btn-ghost w-full justify-center sm:w-auto"
              >
                View services
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-10 mt-auto border-t border-line/80">
        <div className="overflow-hidden py-3.5 sm:py-4">
          <div className="ticker mono text-[0.62rem] uppercase tracking-[0.16em] text-fog sm:text-[0.68rem] sm:tracking-[0.2em]">
            {[...lanes, ...lanes].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="inline-flex shrink-0 items-center gap-2 px-1"
              >
                <span className="text-lilac">◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
