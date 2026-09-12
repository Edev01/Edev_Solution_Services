import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTABand } from "@/components/home/CTABand";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.legalName} — agentic AI, cloud, web, and mobile systems built as one product surface.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Clarity over noise",
    body: "Architecture, copy, and interfaces that make the next decision obvious.",
  },
  {
    title: "Ship with guardrails",
    body: "Agents, pipelines, and releases that are measurable, recoverable, and calm.",
  },
  {
    title: "Craft as leverage",
    body: "Motion, typography, and performance treated as product infrastructure.",
  },
];

const timeline = [
  {
    label: "Discover",
    body: "Map constraints, users, and the real system boundaries before writing code.",
  },
  {
    label: "Design",
    body: "Shape the product surface and technical backbone as one composition.",
  },
  {
    label: "Build",
    body: "Ship in vertical slices with observability and evaluation baked in.",
  },
  {
    label: "Operate",
    body: "Harden delivery, cost, and reliability so the team can keep moving.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="shell pb-16 md:pb-24">
          <p className="eyebrow">About</p>
          <h1 className="mega mt-5 max-w-[12ch] text-[clamp(3rem,10vw,7rem)] text-paper">
            Systems that feel human to use
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-fog md:text-lg">
            {siteConfig.name} is a solutions studio for web platforms, mobile
            products, cloud infrastructure, and autonomous agent workflows —
            delivered with one visual language and one engineering standard.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn">
              Work with us
            </Link>
            <Link href="/services" className="btn btn-ghost">
              See services
            </Link>
          </div>
        </div>

        <div className="relative h-[42vw] min-h-56 max-h-[28rem] w-full overflow-hidden border-y border-line">
          <Image
            src="/images/web.png"
            alt="Abstract floating web interface panels"
            fill
            className="object-cover opacity-70"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent" />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <p className="eyebrow">How we work</p>
          <h2 className="display mt-3 max-w-2xl text-4xl text-paper md:text-5xl">
            A delivery motion that compounds
          </h2>
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((step, i) => (
              <div key={step.label} className="bg-ink p-6 md:p-7">
                <p className="mono text-[0.68rem] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display mt-4 text-2xl text-paper">{step.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-panel py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Values</p>
            <h2 className="display mt-3 text-4xl text-paper md:text-5xl">
              What shows up in every engagement
            </h2>
            <div className="relative mt-10 aspect-[4/5] max-w-sm overflow-hidden border border-line">
              <Image
                src="/images/mobile.png"
                alt="Abstract luminous mobile product silhouette"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
            </div>
          </div>
          <div className="space-y-0 divide-y divide-line border-y border-line">
            {values.map((value) => (
              <div key={value.title} className="py-8">
                <h3 className="display text-2xl text-paper md:text-3xl">
                  {value.title}
                </h3>
                <p className="mt-3 max-w-xl text-fog">{value.body}</p>
              </div>
            ))}
            <div className="py-8">
              <Link href="/contact" className="btn">
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
