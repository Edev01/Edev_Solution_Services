import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.legalName}. Call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mega mt-5 max-w-[10ch] text-[clamp(2.8rem,8vw,5.5rem)] text-paper">
            Tell us what you’re building
          </h1>
          <p className="mt-6 max-w-md text-fog">
            Share a short brief and we’ll get back to you from our inbox.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={siteConfig.phoneHref} className="btn">
              {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="btn btn-ghost">
              {siteConfig.email}
            </a>
          </div>
          <p className="mt-10 mono text-[0.68rem] uppercase tracking-[0.16em] text-fog">
            Or browse{" "}
            <Link href="/services" className="text-signal">
              services
            </Link>
          </p>
        </div>

        <div className="border border-line bg-panel p-5 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
