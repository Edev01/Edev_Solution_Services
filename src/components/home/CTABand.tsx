"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { contactHrefForService } from "@/lib/contact-services";
import { siteConfig } from "@/lib/site";

export function CTABand({ serviceSlug }: { serviceSlug?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const contactHref = serviceSlug
    ? contactHrefForService(serviceSlug)
    : "/contact";

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="orb left-1/4 top-0 h-64 w-64 bg-orchid/25" />
      <div className="orb right-1/5 bottom-0 h-56 w-56 bg-heat/15" />

      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center mega whitespace-nowrap text-[clamp(4rem,18vw,14rem)] text-line/80"
        aria-hidden
      >
        LET’S BUILD
      </motion.div>

      <motion.div style={{ scale }} className="shell relative z-10 text-center">
        <p className="eyebrow">04 / Next</p>
        <h2 className="display mx-auto mt-4 max-w-3xl text-[clamp(2.1rem,6.5vw,4.5rem)] text-paper">
          Ready when{" "}
          <span className="grad-text">you are</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-sm text-fog sm:text-base">
          Tell us what you’re shipping.
        </p>
        <div className="mx-auto mt-5 flex max-w-md flex-col items-center gap-2 text-sm sm:text-base">
          <a
            href={siteConfig.phoneHref}
            className="text-paper transition-colors hover:text-lilac"
          >
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="break-all text-paper transition-colors hover:text-lilac"
          >
            {siteConfig.email}
          </a>
        </div>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link href={contactHref} className="btn">
            Start a project
          </Link>
          <a href={siteConfig.phoneHref} className="btn btn-ghost">
            Call us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
