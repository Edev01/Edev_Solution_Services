import { marqueeWords } from "@/data/content";

export function Marquee() {
  const line = marqueeWords.join("   ·   ");
  const track = `${line}   ·   ${line}   ·   `;

  return (
    <div className="section-pad py-3 sm:py-4">
      <div className="container-edev">
        <div className="glass-marquee relative overflow-hidden rounded-full px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#1a0d33]/90 to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#1a0d33]/90 to-transparent sm:w-16" />
          <div className="marquee-track">
            <span className="marquee-text">{track}</span>
            <span className="marquee-text" aria-hidden>
              {track}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
