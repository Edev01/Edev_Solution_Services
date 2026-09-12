import Image from "next/image";
import { GlassButton } from "@/components/ui/GlassButton";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <Atmosphere />
      <div className="section-pad relative z-10 flex min-h-[calc(100svh-7rem)] items-end pb-16 sm:items-center sm:pb-20">
        <div className="container-edev grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[#1a0f36] sm:h-[4.5rem] sm:w-[4.5rem]">
                <Image
                  src="/logo.png"
                  alt={`${siteConfig.name} logo`}
                  width={64}
                  height={64}
                  className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                  priority
                />
              </span>
              <span className="display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {siteConfig.name}
              </span>
            </div>

            <h1 className="display text-balance text-3xl font-semibold leading-[1.08] text-white sm:text-4xl lg:text-5xl xl:text-[3.35rem]">
              {siteConfig.tagline}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-edev-mist/75 sm:text-lg">
              Web, mobile, agentic AI, and cloud, built as one calm purple
              stack with interfaces that feel like glass, not plastic.
            </p>

            <div className="mt-8 flex flex-nowrap gap-2 sm:gap-3">
              <GlassButton
                href="/contact"
                size="lg"
                className="min-w-0 flex-1 !px-3 !text-sm sm:flex-none sm:!px-7 sm:!text-base"
              >
                Talk to Edev
              </GlassButton>
              <GlassButton
                href="/services"
                size="lg"
                className="min-w-0 flex-1 !px-3 !text-sm sm:flex-none sm:!px-7 sm:!text-base"
              >
                Explore services
              </GlassButton>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-md lg:block xl:max-w-lg">
            <div className="img-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/20 bg-[#1a0f36]">
              <Image
                src="/images/hero.jpg"
                alt="Laptop with code for a modern web product"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1280px) 28rem, 32rem"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-edev-ink/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-edev-lilac/80">
                  Web · Mobile · DevOps
                </p>
                <p className="mt-2 display text-xl font-semibold text-white">
                  Systems that think, ship, and scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
