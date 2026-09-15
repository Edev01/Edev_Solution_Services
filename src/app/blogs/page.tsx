import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedBlogs } from "@/lib/content-store";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Insights and updates from Edev Solutions.",
  alternates: { canonical: "/blogs" },
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <p className="eyebrow">Blogs</p>
          <h1 className="mega mt-5 max-w-[10ch] text-[clamp(2.8rem,8vw,5.5rem)] text-paper">
            Notes from the studio
          </h1>
          <p className="mt-6 max-w-xl text-fog">
            Articles, builds, and product thinking from Edev Solutions.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square overflow-hidden border border-line bg-panel">
            <Image
              src="/images/design.png"
              alt=""
              fill
              className="object-cover opacity-75"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-10 sm:p-14">
              <div className="relative h-full w-full max-h-56 max-w-56">
                <Image
                  src="/logo-mark.png"
                  alt={`${siteConfig.name} logo`}
                  fill
                  className="object-contain opacity-90 drop-shadow-[0_0_40px_rgba(176,124,255,0.35)]"
                  unoptimized
                />
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border border-line bg-ink px-4 py-3">
            <span className="mono text-[0.65rem] uppercase tracking-[0.16em] text-lilac">
              Studio notes
            </span>
            <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-fog">
              {blogs.length} {blogs.length === 1 ? "post" : "posts"}
            </span>
          </div>
        </div>
      </div>

      <div className="shell mt-14 md:mt-16">
        {blogs.length === 0 ? (
          <p className="text-fog">No published blogs yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col overflow-hidden border border-line bg-panel transition-colors hover:border-lilac"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                  {blog.coverImageUrl ? (
                    <Image
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1280px) 50vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-fog">
                      Edev
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h2 className="display text-2xl text-paper md:text-3xl">
                    {blog.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">
                    {blog.excerpt || blog.content.slice(0, 140)}
                  </p>
                  <span className="mt-5 text-sm text-lilac">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
