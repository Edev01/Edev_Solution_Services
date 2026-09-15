"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLogoutButton } from "@/components/layout/SiteChrome";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/work", label: "Work" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-ink">
      <div className="shell flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/admin" className="display text-xl text-paper">
            Edev Admin
          </Link>
          <nav className="flex flex-wrap gap-3">
            {links.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mono text-[0.68rem] uppercase tracking-[0.14em] ${
                    active ? "text-lilac" : "text-fog hover:text-paper"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="btn btn-ghost">
            View site
          </Link>
          <AdminLogoutButton />
        </div>
      </div>
    </header>
  );
}
