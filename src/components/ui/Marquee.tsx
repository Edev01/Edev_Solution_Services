"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { marqueeWords } from "@/data/content";

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const words = marqueeWords.join("   ·   ");
    const duplicate = `${words}   ·   ${words}   ·   `;
    track.innerHTML = `<span class="marquee-text">${duplicate}</span><span class="marquee-text" aria-hidden>${duplicate}</span>`;

    const spans = track.querySelectorAll(".marquee-text");
    const totalWidth = spans[0].clientWidth;

    gsap.set(spans, { x: 0 });

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.to(spans, { x: -totalWidth, duration: 60 }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="section-pad py-3 sm:py-4">
      <div className="container-edev">
        <div className="glass-marquee relative overflow-hidden rounded-full px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#1a0d33]/90 to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#1a0d33]/90 to-transparent sm:w-16" />
          <div ref={trackRef} className="flex" />
        </div>
      </div>
    </div>
  );
}
