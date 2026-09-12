import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { GlassButton } from "@/components/ui/GlassButton";
import { CTABand } from "@/components/home/CTABand";
import { getService, services } from "@/data/content";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} · ${siteConfig.name}`,
      description: service.summary,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <Atmosphere variant="dense" />
        <div className="section-pad relative z-10 pb-14 pt-10 sm:pb-16">
          <div className="container-edev grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-edev-orchid">
                Service
              </p>
              <h1 className="display text-balance text-4xl font-semibold text-white sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-edev-mist/75 sm:text-lg">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GlassButton href="/contact" size="lg">
                  Discuss this service
                </GlassButton>
                <GlassButton href="/services" size="lg">
                  All services
                </GlassButton>
              </div>
            </div>
            <div className="img-frame relative aspect-[5/4] overflow-hidden rounded-[2rem] glass">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-edev-ink/70 via-transparent to-edev-violet/15" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad py-16 sm:py-20">
        <div className="container-edev grid gap-6 lg:grid-cols-2">
          <div className="h-full rounded-3xl glass p-6 sm:p-8">
            <h2 className="display text-2xl font-semibold text-white">
              Outcomes
            </h2>
            <ul className="mt-6 space-y-3">
              {service.outcomes.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl glass-soft px-4 py-3 text-sm text-edev-mist/80 sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full rounded-3xl glass p-6 sm:p-8">
            <h2 className="display text-2xl font-semibold text-white">
              Capabilities
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.capabilities.map((item) => (
                <span
                  key={item}
                  className="rounded-full glass-soft px-4 py-2 text-sm text-edev-mist/85"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-edev-mist/65">
              {service.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad pb-10">
        <div className="container-edev">
          <h2 className="display mb-6 text-2xl font-semibold text-white sm:text-3xl">
            Related services
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group block overflow-hidden rounded-3xl glass-soft"
              >
                <div className="img-frame relative h-36">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-edev-ink to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-edev-mist/65">{item.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
