"use client";

import { testimonials } from "@/data/content";
import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <section className="border-y border-line bg-panel py-16 md:py-24" id="testimonials">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">03 / Proof</p>
            <h2 className="display mt-3 text-[clamp(2rem,5vw,3.5rem)] text-paper">
              Teams that ship{" "}
              <span className="grad-text">with us</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-fog md:text-base">
            Quiet delivery, clear architecture, and interfaces people finish.
          </p>
        </div>

        <div className="grid gap-px bg-line md:grid-cols-2">
          {testimonials.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative overflow-hidden bg-panel p-6 transition-colors hover:bg-ink md:p-8"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-signal/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <blockquote className="relative text-lg leading-relaxed text-paper md:text-xl">
                “{item.quote}”
              </blockquote>
              <figcaption className="relative mt-8 border-t border-line pt-5">
                <p className="display text-lg text-paper">{item.name}</p>
                <p className="mono mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-lilac">
                  {item.role} · {item.company}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
