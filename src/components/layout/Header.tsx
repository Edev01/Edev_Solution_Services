"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { SocialIcons } from "@/components/ui/SocialIcons";

const links = [
  { href: "/", label: "Home", index: "01" },
  { href: "/about", label: "About", index: "02" },
  { href: "/services", label: "Services", index: "03" },
  { href: "/work", label: "Work", index: "04" },
  { href: "/blogs", label: "Blogs", index: "05" },
  { href: "/contact", label: "Contact", index: "06" },
];

function MenuToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="relative z-[70] flex h-11 w-11 items-center justify-center md:hidden"
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
    >
      <span className="sr-only">{open ? "Close" : "Menu"}</span>
      <span className="relative block h-3.5 w-5">
        <motion.span
          className="absolute left-0 top-0 h-[1.5px] w-full bg-paper"
          animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className="absolute left-0 top-[6px] h-[1.5px] w-full bg-paper"
          animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute left-0 top-[12px] h-[1.5px] w-full bg-paper"
          animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
      </span>
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 transition-colors duration-300 ${
          open ? "z-[70]" : "z-50"
        } ${
          scrolled || open
            ? "border-b border-line bg-ink/95"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-3 md:h-[4.25rem]">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <Image
              src="/logo.png"
              alt={`${siteConfig.name} logo`}
              width={40}
              height={40}
              className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9 md:h-10 md:w-10"
              priority
            />
            <span className="display truncate text-base text-paper sm:text-lg md:text-xl">
              <span className="sm:hidden">Edev</span>
              <span className="hidden sm:inline">{siteConfig.name}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${
                  isActive(link.href) ? "text-lilac" : "text-fog hover:text-paper"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn">
              Start a project
            </Link>
          </nav>

          <MenuToggle open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 bg-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="orb right-[-20%] top-24 h-64 w-64 bg-orchid/30" />
            <div className="orb left-[-30%] bottom-20 h-56 w-56 bg-signal/20" />

            <nav
              className="relative flex h-full flex-col px-6 pb-8 pt-20"
              aria-label="Mobile"
            >
              <p className="eyebrow mb-6">Navigate</p>
              <div className="flex flex-1 flex-col">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.45 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-baseline justify-between border-b border-line py-5 ${
                        isActive(link.href) ? "text-lilac" : "text-paper"
                      }`}
                    >
                      <span className="display text-[clamp(2.4rem,10vw,3.4rem)]">
                        {link.label}
                      </span>
                      <span className="mono text-[0.68rem] text-fog">
                        {link.index}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-8 space-y-5"
              >
                <Link
                  href="/contact"
                  className="btn w-full"
                  onClick={() => setOpen(false)}
                >
                  Start a project
                </Link>
                <div className="flex items-center justify-between gap-4">
                  <SocialIcons size="sm" />
                </div>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
