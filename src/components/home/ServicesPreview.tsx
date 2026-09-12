import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassButton } from "@/components/ui/GlassButton";
import { services } from "@/data/content";

export function ServicesPreview() {
  const featured = services.slice(0, 6);

  return (
    <section className="relative section-pad py-20 sm:py-24">
      <div className="container-edev">
        <FadeIn>
          <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="What we build"
              title="Services across agents, cloud, web, and mobile"
              description="Every engagement is designed as a product surface, measurable outcomes, clear architecture, and interfaces that stay calm under pressure."
            />
            <GlassButton href="/services">View all services</GlassButton>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative block h-full overflow-hidden rounded-3xl glass-soft"
            >
              <div className="img-frame relative h-44 overflow-hidden sm:h-48">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={60}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-edev-ink via-edev-deep/40 to-transparent" />
              </div>
              <div className="space-y-3 p-5 sm:p-6">
                <h3 className="display text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-edev-mist/70">
                  {service.short}
                </p>
                <span className="inline-flex text-sm text-edev-lilac transition-colors group-hover:text-white">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
