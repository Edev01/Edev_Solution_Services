import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABand } from "@/components/home/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesPreview />
      <AboutTeaser />
      <Testimonials />
      <CTABand />
    </>
  );
}
