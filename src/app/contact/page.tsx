import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { GlassButton } from "@/components/ui/GlassButton";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.legalName}. Call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="section-pad relative pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="container-edev grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Tell us what you’re building"
            description="Share a short brief and we’ll get back to you from our inbox."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <GlassButton href={siteConfig.phoneHref} size="lg">
              {siteConfig.phoneDisplay}
            </GlassButton>
            <GlassButton href={`mailto:${siteConfig.email}`} size="lg">
              {siteConfig.email}
            </GlassButton>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/20 bg-[#1a0f36] p-5 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
