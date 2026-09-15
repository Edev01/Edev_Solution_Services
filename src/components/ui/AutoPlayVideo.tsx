"use client";

import { useEffect, useRef } from "react";

export function AutoPlayVideo({
  src,
  poster,
  className = "",
  controls = true,
}: {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const play = () => {
      void el.play().catch(() => {
        // Autoplay can still be blocked; muted + playsInline covers most browsers.
      });
    };
    if (el.readyState >= 2) play();
    else el.addEventListener("loadeddata", play, { once: true });
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      controls={controls}
      preload="auto"
    />
  );
}
