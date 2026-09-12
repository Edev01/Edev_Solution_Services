import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { GlassButton } from "@/components/ui/GlassButton";
import { CTABand } from "@/components/home/CTABand";
import { services } from "@/data/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services", description: `Explore ${siteConfig.name} services, agentic AI, cloud infrastructure, web platforms, mobile apps, DevOps, automation, ML, and more.`, alternates: { canonical: "/services" }, keywords: [
    ...siteConfig.keywords, "web development", "mobile development", "agentic cloud", ], };

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <Atmosphere />
        <div className="section-pad relative z-10 pb-14 pt-10 sm:pb-16 sm:pt-14">
          <div className="container-edev max-w-3xl">
            <SectionHeading
              eyebrow="Services"
              title="Web, mobile, agentic AI, cloud, and the systems between them"
              description="Deep capability across product engineering and infrastructure. Pick a lane, or ask us to orchestrate the full stack."
            />
            <div className="mt-8">
              <GlassButton href="/contact" size="lg">
                Request a proposal
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pb-20">
        <div className="container-edev grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl glass-soft"
            >
              <div className="img-frame relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  quality={55}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-edev-ink via-edev-deep/35 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="display text-xl font-semibold text-white sm:text-2xl">
                  {service.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-edev-mist/70">
                  {service.summary}
                </p>
                <span className="mt-5 inline-flex text-sm text-edev-lilac group-hover:text-white">
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
