"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 section-pad pt-3 sm:pt-4">
        <div className="container-edev glass-nav rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2.5 rounded-xl pr-2"
              aria-label={`${siteConfig.name} home`}
            >
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl glass-soft sm:h-11 sm:w-11">
              <Image
                src="/logo.png"
                alt={`${siteConfig.name} logo`}
                width={40}
                height={40}
                className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                priority
              />
            </span>
            <span className="display text-base font-semibold tracking-tight text-white sm:text-lg">
              {siteConfig.name}
            </span>
            </Link>

            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Primary"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="glass-tab"
                  data-active={isActive(link.href)}
                  prefetch
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <Link href="/contact" className="glass-btn glass-btn-sm" prefetch>
                Start a project
              </Link>
            </div>

            <button
              type="button"
              className="glass-btn glass-btn-sm md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: solid panel from the right */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-edev-ink/70 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        />

        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={`absolute inset-y-0 right-0 flex w-[min(86vw,20rem)] flex-col border-l border-white/15 bg-[#160b2e] px-5 py-5 shadow-[-12px_0_40px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between gap-3">
            <span className="display text-xl font-semibold text-white">
              Menu
            </span>
            <button
              type="button"
              className="glass-btn glass-btn-sm"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
                data-active={isActive(link.href)}
                style={
                  isActive(link.href)
                    ? {
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.22)",
                      }
                    : undefined
                }
                prefetch
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="glass-btn mt-4 w-full"
            prefetch
            onClick={() => setOpen(false)}
          >
            Start a project
          </Link>
        </nav>
      </div>
    </>
  );
}
