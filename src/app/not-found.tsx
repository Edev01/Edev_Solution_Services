import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center pt-28 pb-16">
      <div className="shell max-w-lg text-center">
        <p className="eyebrow">404</p>
        <h1 className="mega mt-4 text-[clamp(3rem,10vw,5.5rem)] text-paper">
          Page not found
        </h1>
        <p className="mt-5 text-fog">
          That route doesn’t exist, or it moved. Let’s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn">
            Go home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Contact
          </Link>
          <Link href="/services" className="btn btn-ghost">
            Services
          </Link>
        </div>
      </div>
    </section>
  );
}
