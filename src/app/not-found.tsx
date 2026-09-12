import Link from "next/link";
import { GlassButton } from "@/components/ui/GlassButton";

export default function NotFound() {
  return (
    <section className="section-pad flex min-h-[70vh] items-center justify-center pt-28">
      <div className="container-edev max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-edev-orchid">404</p>
        <h1 className="display mt-3 text-4xl font-semibold text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-edev-mist/70">
          That route doesn’t exist, or it moved. Let’s get you back into the
          purple.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GlassButton href="/">Go home</GlassButton>
          <GlassButton href="/contact">Contact</GlassButton>
          <Link href="/services" className="glass-btn">
            Services
          </Link>
        </div>
      </div>
    </section>
  );
}
