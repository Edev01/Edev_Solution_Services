import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <section className="relative section-pad py-20 sm:py-24" id="testimonials">
      <div className="container-edev">
        <SectionHeading
          eyebrow="Testimonials"
          title="Teams that ship with Edev"
          description="Quiet delivery, clear architecture, and interfaces people actually enjoy using."
          align="center"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-3xl glass p-6 sm:p-8"
            >
              <blockquote className="flex-1 text-base leading-relaxed text-edev-mist/85 sm:text-lg">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-5">
                <p className="display font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-sm text-edev-lilac/80">
                  {item.role} · {item.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
