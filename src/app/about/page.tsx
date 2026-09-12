import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { GlassButton } from "@/components/ui/GlassButton";
import { CTABand } from "@/components/home/CTABand";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About", description: `About ${siteConfig.legalName}, agentic AI, cloud, web, and mobile solutions crafted with glass-calm product design.`, alternates: { canonical: "/about" }, };

const values = [
  {
    title: "Clarity over noise", body: "Architecture, copy, and interfaces that make the next decision obvious.", }, {
    title: "Ship with guardrails", body: "Agents, pipelines, and releases that are measurable, recoverable, and calm.", }, {
    title: "Craft as leverage", body: "Motion, typography, and performance treated as product infrastructure, not decoration.", }, ];

const timeline = [
  {
    label: "Discover", body: "Map constraints, users, and the real system boundaries before writing code.", }, {
    label: "Design", body: "Shape the product surface and technical backbone as one composition.", }, {
    label: "Build", body: "Ship in vertical slices with observability and evaluation baked in.", }, {
    label: "Operate", body: "Harden delivery, cost, and reliability so the team can keep moving.", }, ];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <Atmosphere variant="dense" />
        <div className="section-pad relative z-10 pb-16 pt-10 sm:pb-20 sm:pt-14">
          <div className="container-edev grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="About"
                title={`${siteConfig.name} builds agentic systems that feel human to use`}
                description="We are a solutions studio for web platforms, mobile products, cloud infrastructure, and autonomous agent workflows, delivered with one visual language and one engineering standard."
              />
              <div className="mt-8 flex flex-nowrap gap-2 sm:gap-3">
                <GlassButton
                  href="/contact"
                  size="lg"
                  className="min-w-0 flex-1 !px-3 !text-sm sm:!px-7 sm:!text-base"
                >
                  Work with us
                </GlassButton>
                <GlassButton
                  href="/services"
                  size="lg"
                  className="min-w-0 flex-1 !px-3 !text-sm sm:!px-7 sm:!text-base"
                >
                  See services
                </GlassButton>
              </div>
            </div>
            <div className="img-frame relative aspect-[5/4] overflow-hidden rounded-[2rem] glass">
              <Image
                src="/images/laptop.jpg"
                alt="Developer building a modern web application"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-edev-ink/80 via-transparent to-edev-violet/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad py-16 sm:py-20">
        <div className="container-edev">
          <FadeIn>
            <SectionHeading
              eyebrow="How we work"
              title="A delivery motion that compounds"
              description="From first conversation to production, we keep discovery, design, and engineering in the same loop."
            />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((step, i) => (
              <div
                key={step.label}
                className="h-full rounded-3xl glass-soft p-5 sm:p-6"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-edev-orchid">
                  0{i + 1}
                </p>
                <h3 className="display mt-3 text-xl font-semibold text-white">
                  {step.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-edev-mist/70">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad py-16 sm:py-20">
        <div className="container-edev grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="img-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] glass">
            <Image
              src="/images/mobile.jpg"
              alt="Mobile app product design on a smartphone"
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-edev-ink via-edev-deep/30 to-transparent" />
          </div>
          <div>
            <FadeIn>
              <SectionHeading
                eyebrow="Values"
                title="What shows up in every engagement"
              />
            </FadeIn>
            <div className="mt-8 space-y-4">
              {values.map((value) => (
                <div key={value.title} className="rounded-2xl glass p-5">
                  <h3 className="display text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-edev-mist/70">{value.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <GlassButton href="/contact" size="lg">
                Start a project
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
