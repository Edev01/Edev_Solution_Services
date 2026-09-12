import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassButton } from "@/components/ui/GlassButton";

const pillars = [
  {
    title: "Agentic by design", body: "Multi-agent workflows with guardrails, memory, and evaluation, intelligence that operates, not demos.", }, {
    title: "Cloud that stays quiet", body: "Landing zones, pipelines, and observability engineered so shipping feels boring in the best way.", }, {
    title: "Product craft", body: "Web and mobile surfaces with glass-calm interaction, performance budgets, and SEO from day one.", }, ];

export function AboutTeaser() {
  return (
    <section className="relative section-pad py-20 sm:py-24">
      <div className="container-edev grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="img-frame relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] glass lg:max-w-none">
          <Image
            src="/images/team.jpg"
            alt="Product team building software together"
            fill
            className="object-cover opacity-90"
            sizes="(max-width: 1024px) 28rem, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-edev-ink/85 via-edev-violet/25 to-transparent" />
          <div className="absolute bottom-0 p-6">
            <p className="display text-2xl font-semibold text-white">
              Web · Mobile · Agentic
            </p>
            <p className="mt-2 text-sm text-edev-mist/75">
              Built for teams who need speed without sacrificing craft.
            </p>
          </div>
        </div>

        <div>
          <FadeIn>
            <SectionHeading
              eyebrow="About Edev"
              title="A solutions studio for the agentic era"
              description="Edev blends software engineering, cloud architecture, and product design into one delivery motion, so your stack compounds instead of fragmenting."
            />
          </FadeIn>

          <div className="mt-8 space-y-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl glass-soft p-5">
                <h3 className="display text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-edev-mist/70">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <GlassButton href="/about">Our story</GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}
