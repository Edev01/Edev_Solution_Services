type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow, title, description, align = "left", }: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-edev-orchid sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="display text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-edev-mist/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
