"use client";

import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] btn"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="relative z-10 min-h-[70vh] overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}

export function AdminLogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
