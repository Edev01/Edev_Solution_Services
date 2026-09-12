import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTABand } from "@/components/home/CTABand";
import { services } from "@/data/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore ${siteConfig.name} services — agentic AI, cloud, web, mobile, DevOps, automation, ML, and more.`,
  alternates: { canonical: "/services" },
  keywords: [
    ...siteConfig.keywords,
    "web development",
    "mobile development",
    "agentic cloud",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-28 md:pt-36">
        <div className="shell pb-12 md:pb-16">
          <p className="eyebrow">Services</p>
          <h1 className="mega mt-5 max-w-[14ch] text-[clamp(2.8rem,9vw,6.5rem)] text-paper">
            Capability without the template look
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-fog md:text-lg">
            Deep lanes across product engineering and infrastructure. Pick one,
            or ask us to orchestrate the full stack.
          </p>
          <Link href="/contact" className="btn mt-8">
            Request a proposal
          </Link>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="shell">
          <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col bg-ink transition-colors hover:bg-panel"
              >
                <div className="relative h-44 overflow-hidden md:h-52">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    quality={55}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <span className="absolute left-4 top-4 mono text-[0.68rem] text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h2 className="display text-2xl text-paper md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">
                    {service.summary}
                  </p>
                  <span className="mt-5 text-sm text-signal">View details →</span>
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
