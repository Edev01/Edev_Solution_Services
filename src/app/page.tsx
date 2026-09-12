import { Hero } from "@/components/home/Hero";
import { PulseStats } from "@/components/home/PulseStats";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { MosaicStrip } from "@/components/home/MosaicStrip";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABand } from "@/components/home/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PulseStats />
      <ServicesPreview />
      <MosaicStrip />
      <AboutTeaser />
      <Testimonials />
      <CTABand />
    </>
  );
}
