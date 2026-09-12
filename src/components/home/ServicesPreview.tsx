"use client";

import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { services } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

function TiltCard({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 220,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 220,
    damping: 22,
  });

  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}>
      <Link
        ref={ref}
        href={href}
        className={className}
        onMouseMove={(e) => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const featured = services.slice(0, 8);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const getTotal = () => Math.max(track.scrollWidth - window.innerWidth + 64, 0);
      const tween = gsap.to(track, {
        x: () => -getTotal(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(getTotal(), 700)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-line bg-panel py-14 md:py-0"
    >
      <div className="shell mb-8 md:absolute md:left-0 md:right-0 md:top-10 md:z-10 md:mb-0 md:mx-auto">
        <p className="eyebrow">01 / Services</p>
        <h2 className="display mt-3 max-w-3xl text-[clamp(2rem,5vw,3.75rem)] text-paper">
          Capabilities that <span className="grad-text">compound</span>
        </h2>
      </div>

      <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible md:flex md:h-screen md:items-center md:pb-0 md:pt-28 [&::-webkit-scrollbar]:hidden">
        <div ref={trackRef} className="service-rail">
          {featured.map((service, i) => (
            <TiltCard
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative block h-[20rem] w-[min(78vw,18.5rem)] shrink-0 overflow-hidden border border-line bg-ink sm:h-[22rem] sm:w-[min(70vw,20rem)] md:h-[28rem] md:w-[24rem]"
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
                sizes="384px"
                quality={70}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-orchid/15" />
              <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
                <span className="mono text-[0.68rem] text-lilac">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-[1.85rem] text-paper md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">
                    {service.short}
                  </p>
                  <span className="mt-5 inline-block text-sm text-lilac transition-colors group-hover:text-paper">
                    Open →
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}

          <Link
            href="/services"
            className="group relative flex h-[20rem] w-[min(65vw,14rem)] shrink-0 flex-col items-center justify-center overflow-hidden border border-lilac bg-gradient-to-br from-orchid via-signal to-lilac sm:h-[22rem] md:h-[28rem] md:w-[18rem]"
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
            <span className="relative display px-4 text-center text-3xl text-paper md:text-4xl">
              All services
            </span>
            <span className="relative mt-4 mono text-[0.68rem] uppercase tracking-[0.18em] text-paper/80">
              Explore →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
