import { FadeIn } from "@/components/ui/FadeIn";
import { GlassButton } from "@/components/ui/GlassButton";

export function CTABand() {
  return (
    <section className="relative section-pad py-16 sm:py-20">
      <div className="container-edev">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] glass px-6 py-12 text-center sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-edev-orchid/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-edev-royal/25 blur-3xl" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-edev-orchid">
              Ready when you are
            </p>
            <h2 className="display mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Let’s build the next agentic surface together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-edev-mist/70">
              Tell us what you’re shipping. Reach us anytime.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <GlassButton href="/contact" size="lg">
                Start a project
              </GlassButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
