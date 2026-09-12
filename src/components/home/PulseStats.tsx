"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Services", value: 12, suffix: "" },
  { label: "Focus areas", value: 6, suffix: "+" },
  { label: "Delivery lanes", value: 4, suffix: "" },
  { label: "Response", value: 24, suffix: "h" },
];

function CountUp({ to, active }: { to: number; active: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, to]);

  return <>{n}</>;
}

export function PulseStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="border-y border-line bg-ink py-10 md:py-14">
      <div className="shell grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className="bg-ink px-4 py-6 md:px-6 md:py-8"
          >
            <p className="display text-[clamp(2.2rem,5vw,3.5rem)] text-paper">
              <CountUp to={stat.value} active={inView} />
              <span className="text-lilac">{stat.suffix}</span>
            </p>
            <p className="mono mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-fog">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
