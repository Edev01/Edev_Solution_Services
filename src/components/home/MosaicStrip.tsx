"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/data/content";

const featured = services.filter((s) =>
  ["agentic-ai", "web-platforms", "mobile-apps", "cloud-infrastructure"].includes(
    s.slug
  )
);

export function MosaicStrip() {
  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="shell mb-8 md:mb-12">
        <p className="eyebrow">Signal board</p>
        <h2 className="display mt-3 max-w-2xl text-[clamp(2rem,5vw,3.4rem)] text-paper">
          Four surfaces. One{" "}
          <span className="grad-text">operating system</span> for shipping.
        </h2>
      </div>

      <div className="shell grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((item, i) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
          >
            <Link
              href={`/services/${item.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden border border-line"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="mono text-[0.62rem] text-lilac">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display mt-2 text-2xl text-paper md:text-3xl">
                  {item.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
