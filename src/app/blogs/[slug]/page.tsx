import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/home/CTABand";
import { FadeIn } from "@/components/ui/FadeIn";
import { getPublishedBlogBySlug, getPublishedBlogs } from "@/lib/content-store";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function splitParagraphs(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) return { title: "Blog not found" };
  return {
    title: blog.title,
    description: blog.excerpt || blog.content.slice(0, 150),
    alternates: { canonical: `/blogs/${blog.slug}` },
    openGraph: {
      title: `${blog.title} · ${siteConfig.name}`,
      description: blog.excerpt || blog.content.slice(0, 150),
      images: blog.coverImageUrl
        ? [{ url: blog.coverImageUrl, alt: blog.title }]
        : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) notFound();

  const others = (await getPublishedBlogs())
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  const cover = blog.images[0] || null;
  const gallery = blog.images.slice(1);
  const paragraphs = splitParagraphs(blog.content);
  const published = formatDate(blog.createdAt);
  const readMins = Math.max(
    1,
    Math.ceil(blog.content.split(/\s+/).filter(Boolean).length / 200)
  );

  return (
    <>
      <article>
        <section className="pt-24 pb-10 md:pt-28 md:pb-12">
          <div className="shell grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
            <FadeIn>
              <Link
                href="/blogs"
                className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog transition-colors hover:text-lilac"
              >
                ← All blogs
              </Link>
              <p className="eyebrow mt-5">Blog</p>
              <h1 className="mega mt-4 max-w-[16ch] text-[clamp(2.2rem,6vw,4.2rem)] text-paper">
                {blog.title}
              </h1>
              {blog.excerpt ? (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-fog md:text-lg">
                  {blog.excerpt}
                </p>
              ) : null}
              <p className="mt-6 mono text-[0.65rem] uppercase tracking-[0.14em] text-fog">
                <span className="text-lilac">{siteConfig.name}</span>
                {published ? `, ${published}` : ""}
                {blog.images.length > 0
                  ? `, ${blog.images.length} ${
                      blog.images.length === 1 ? "image" : "images"
                    }`
                  : ""}
              </p>
            </FadeIn>

            <aside>
              <FadeIn direction="right">
                <div className="border border-line bg-panel p-5">
                  <p className="mono text-[0.65rem] uppercase tracking-[0.16em] text-lilac">
                    In this note
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fog">
                    Product thinking from the {siteConfig.name} studio, built to
                    ship, not to fill space.
                  </p>
                  <div className="mt-6 space-y-4 border-t border-line pt-5">
                    {published ? (
                      <div>
                        <p className="mono text-[0.6rem] uppercase tracking-[0.14em] text-fog">
                          Published
                        </p>
                        <p className="mt-1 text-sm text-paper">{published}</p>
                      </div>
                    ) : null}
                    <div>
                      <p className="mono text-[0.6rem] uppercase tracking-[0.14em] text-fog">
                        Reading
                      </p>
                      <p className="mt-1 text-sm text-paper">~{readMins} min</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </aside>
          </div>
        </section>

        {cover ? (
          <FadeIn>
            <div className="relative h-[38vw] min-h-48 max-h-[26rem] w-full overflow-hidden border-y border-line">
              <Image
                src={cover.url}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/40" />
            </div>
          </FadeIn>
        ) : null}

        <section className="py-10 md:py-14">
          <div className="shell max-w-3xl">
            <FadeIn>
              <div className="space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-[1.85] text-fog md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>

            {gallery.length > 0 ? (
              <FadeIn delay={0.08} className="mt-10">
                <p className="eyebrow">Visuals</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {gallery.map((img, index) => (
                    <div
                      key={`${img.key || img.url}-${index}`}
                      className={`relative overflow-hidden border border-line bg-panel ${
                        gallery.length === 1 ||
                        (gallery.length % 2 === 1 &&
                          index === gallery.length - 1)
                          ? "sm:col-span-2 aspect-[21/9]"
                          : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`${blog.title} visual ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </FadeIn>
            ) : null}

            <FadeIn className="mt-10">
              <Link href="/blogs" className="btn btn-ghost">
                ← All blogs
              </Link>
            </FadeIn>
          </div>
        </section>
      </article>

      {others.length > 0 ? (
        <section className="border-t border-line bg-panel py-16 md:py-20">
          <div className="shell">
            <FadeIn>
              <p className="eyebrow">More</p>
              <h2 className="display mt-3 text-3xl text-paper md:text-4xl">
                Keep reading
              </h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((item, index) => (
                <FadeIn key={item.id} delay={index * 0.08}>
                  <Link
                    href={`/blogs/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden border border-line bg-ink transition-colors hover:border-lilac"
                  >
                    <div className="relative h-40 overflow-hidden bg-panel">
                      {item.coverImageUrl ? (
                        <Image
                          src={item.coverImageUrl}
                          alt={item.title}
                          fill
                          className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-fog">
                          Edev
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="display text-xl text-paper">{item.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-fog line-clamp-2">
                        {item.excerpt || item.content.slice(0, 100)}
                      </p>
                      <span className="mt-4 text-sm text-lilac">Read →</span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTABand />
    </>
  );
}
