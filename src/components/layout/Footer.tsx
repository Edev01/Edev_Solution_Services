import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { services } from "@/data/content";

const footerLinks = [
  { href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" }, { href: "/contact", label: "Contact" }, ];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const topServices = services.slice(0, 6);

  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 section-pad pb-10 pt-14">
      <div className="container-edev">
        <div className="glass rounded-3xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt={`${siteConfig.name} logo`}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <span className="display text-xl font-semibold text-white sm:text-2xl">
                  {siteConfig.name}
                </span>
              </Link>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-edev-mist/70 sm:text-base">
                {siteConfig.description}
              </p>

              <div className="mt-5 space-y-1.5 text-sm sm:text-base">
                <p>
                  <a
                    href={siteConfig.phoneHref}
                    className="text-edev-mist/80 transition-colors hover:text-white"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-edev-mist/80 transition-colors hover:text-white"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn glass-btn-sm !px-3"
                  aria-label="Edev Solutions on Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn glass-btn-sm !px-3"
                  aria-label="Edev Solutions on Instagram"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>

            <div>
              <h2 className="display text-sm font-semibold uppercase tracking-[0.18em] text-edev-lilac/80">
                Explore
              </h2>
              <ul className="mt-4 space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-edev-mist/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="display text-sm font-semibold uppercase tracking-[0.18em] text-edev-lilac/80">
                Services
              </h2>
              <ul className="mt-4 space-y-2">
                {topServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-edev-mist/75 transition-colors hover:text-white"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-edev-mist/55">
            <p>
              © {year} {siteConfig.legalName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
