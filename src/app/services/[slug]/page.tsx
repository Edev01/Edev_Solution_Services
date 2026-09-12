import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/home/CTABand";
import { getService, services } from "@/data/content";
import { contactHrefForService } from "@/lib/contact-services";
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
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="shell pb-12 md:pb-16">
          <p className="eyebrow">Service</p>
          <h1 className="mega mt-5 max-w-[12ch] text-[clamp(2.8rem,9vw,6rem)] text-paper">
            {service.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-fog md:text-lg">
            {service.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={contactHrefForService(service.slug)} className="btn">
              Discuss this service
            </Link>
            <Link href="/services" className="btn btn-ghost">
              All services
            </Link>
          </div>
        </div>

        <div className="relative h-[38vw] min-h-52 max-h-[26rem] w-full overflow-hidden border-y border-line">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover opacity-65"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Outcomes</p>
            <ul className="mt-6 space-y-0 divide-y divide-line border-y border-line">
              {service.outcomes.map((item) => (
                <li key={item} className="py-5 text-paper md:text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Capabilities</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.capabilities.map((item) => (
                <span
                  key={item}
                  className="border border-line px-3 py-2 mono text-[0.68rem] uppercase tracking-[0.12em] text-fog"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-fog md:text-base">
              {service.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-panel py-16 md:py-20">
        <div className="shell">
          <p className="eyebrow">Related</p>
          <h2 className="display mt-3 text-3xl text-paper md:text-4xl">
            More capabilities
          </h2>
          <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group bg-panel transition-colors hover:bg-ink"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover opacity-55 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="display text-xl text-paper">{item.title}</h3>
                  <p className="mt-2 text-sm text-fog">{item.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand serviceSlug={service.slug} />
    </>
  );
}
