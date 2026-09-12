import Image from "next/image";

export function Atmosphere({
  variant = "default",
}: {
  variant?: "default" | "dense";
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div
        className={`absolute inset-0 ${
          variant === "dense"
            ? "bg-gradient-to-b from-[#2a1450] via-edev-deep to-edev-ink"
            : "bg-gradient-to-b from-[#241048] via-edev-deep to-edev-ink"
        }`}
      />
      <div className="absolute inset-0 opacity-[0.28]">
        <Image
          src="/images/code.jpg"
          alt=""
          fill
          priority={variant === "default"}
          className="object-cover"
          sizes="100vw"
          quality={40}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-edev-ink/50 via-edev-deep/55 to-edev-ink" />
    </div>
  );
}
