import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { services } from "@/data/content";
import { SocialIcons } from "@/components/ui/SocialIcons";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={`${siteConfig.name} logo`}
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <span className="display text-2xl text-paper">{siteConfig.name}</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-fog md:text-base">
              {siteConfig.description}
            </p>
            <div className="mt-6 space-y-2 text-sm text-paper">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block break-all hover:text-lilac"
              >
                {siteConfig.email}
              </a>
            </div>
            <SocialIcons className="mt-6" />
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-fog hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Capabilities</p>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-fog hover:text-paper"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}
          </p>
          <p className="mono text-[0.68rem] uppercase tracking-[0.14em]">
            Built to ship
          </p>
        </div>
      </div>
    </footer>
  );
}
