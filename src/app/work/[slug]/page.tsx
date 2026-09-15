import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/home/CTABand";
import { FadeIn } from "@/components/ui/FadeIn";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";
import {
  getPublishedWork,
  getPublishedWorkBySlug,
} from "@/lib/content-store";
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
  const item = await getPublishedWorkBySlug(slug);
  if (!item) return { title: "Work not found" };
  return {
    title: item.title,
    description: item.description.slice(0, 150),
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      title: `${item.title} · ${siteConfig.name}`,
      description: item.description.slice(0, 150),
      images: item.coverImageUrl
        ? [{ url: item.coverImageUrl, alt: item.title }]
        : undefined,
    },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPublishedWorkBySlug(slug);
  if (!item) notFound();

  const others = (await getPublishedWork())
    .filter((w) => w.slug !== item.slug)
    .slice(0, 3);

  const paragraphs = splitParagraphs(item.description);
  const published = formatDate(item.createdAt);
  const readMins = Math.max(
    1,
    Math.ceil(item.description.split(/\s+/).filter(Boolean).length / 200)
  );

  const leadVideo = item.videos[0] || null;
  const leadImage = item.images[0] || null;
  const restVideos = item.videos.slice(1);
  const restImages = leadVideo ? item.images : item.images.slice(1);

  return (
    <>
      <article>
        <section className="pt-24 pb-10 md:pt-28 md:pb-12">
          <div className="shell grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
            <FadeIn>
              <Link
                href="/work"
                className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog transition-colors hover:text-lilac"
              >
                ← All work
              </Link>
              <p className="eyebrow mt-5">Work</p>
              <h1 className="mega mt-4 max-w-[16ch] text-[clamp(2.2rem,6vw,4.2rem)] text-paper">
                {item.title}
              </h1>
              {item.clientName ? (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-fog md:text-lg">
                  Built for {item.clientName}
                </p>
              ) : null}
              <p className="mt-6 mono text-[0.65rem] uppercase tracking-[0.14em] text-fog">
                <span className="text-lilac">{siteConfig.name}</span>
                {item.clientName ? `, ${item.clientName}` : ""}
                {published ? `, ${published}` : ""}
                {item.images.length > 0
                  ? `, ${item.images.length} ${
                      item.images.length === 1 ? "image" : "images"
                    }`
                  : ""}
                {item.videos.length > 0
                  ? `, ${item.videos.length} ${
                      item.videos.length === 1 ? "video" : "videos"
                    }`
                  : ""}
              </p>
            </FadeIn>

            <aside>
              <FadeIn direction="right">
                <div className="border border-line bg-panel p-5">
                  <p className="mono text-[0.65rem] uppercase tracking-[0.16em] text-lilac">
                    Project note
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fog">
                    Delivery from the {siteConfig.name} studio, built to ship,
                    not to fill space.
                  </p>
                  <div className="mt-6 space-y-4 border-t border-line pt-5">
                    {item.clientName ? (
                      <div>
                        <p className="mono text-[0.6rem] uppercase tracking-[0.14em] text-fog">
                          Client
                        </p>
                        <p className="mt-1 text-sm text-paper">{item.clientName}</p>
                      </div>
                    ) : null}
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

        {leadVideo || leadImage ? (
          <FadeIn>
            <div className="relative h-[42vw] min-h-52 max-h-[30rem] w-full overflow-hidden border-y border-line bg-ink">
              {leadVideo ? (
                <AutoPlayVideo
                  src={leadVideo.url}
                  poster={leadImage?.url}
                  className="h-full w-full object-cover"
                />
              ) : leadImage ? (
                <>
                  <Image
                    src={leadImage.url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    unoptimized
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/40" />
                </>
              ) : null}
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

            {item.clientReview ? (
              <FadeIn delay={0.08} className="mt-10">
                <blockquote className="border border-line bg-panel p-5 text-lg text-paper md:p-6">
                  “{item.clientReview}”
                  {item.clientName ? (
                    <footer className="mono mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-lilac">
                      {item.clientName}
                    </footer>
                  ) : null}
                </blockquote>
              </FadeIn>
            ) : null}

            {(restImages.length > 0 || restVideos.length > 0) && (
              <FadeIn delay={0.1} className="mt-10">
                <p className="eyebrow">Visuals</p>
                <div className="mt-5 space-y-4">
                  {restVideos.map((vid, index) => (
                    <div
                      key={`vid-${vid.key || vid.url}-${index}`}
                      className="overflow-hidden border border-line bg-ink"
                    >
                      <AutoPlayVideo
                        src={vid.url}
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {restImages.map((img, index) => (
                      <div
                        key={`img-${img.key || img.url}-${index}`}
                        className={`relative overflow-hidden border border-line bg-panel ${
                          restImages.length === 1 ||
                          (restImages.length % 2 === 1 &&
                            index === restImages.length - 1)
                            ? "sm:col-span-2 aspect-[21/9]"
                            : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={img.url}
                          alt={`${item.title} image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            <FadeIn className="mt-10">
              <Link href="/work" className="btn btn-ghost">
                ← All work
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
                More work
              </h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((related, index) => {
                const relatedCover =
                  related.images[0]?.url || related.coverImageUrl;
                const relatedVideo =
                  related.videos[0]?.url || related.videoUrl;
                return (
                  <FadeIn key={related.id} delay={index * 0.08}>
                    <Link
                      href={`/work/${related.slug}`}
                      className="group flex h-full flex-col overflow-hidden border border-line bg-ink transition-colors hover:border-lilac"
                    >
                      <div className="relative h-40 overflow-hidden bg-panel">
                        {relatedVideo ? (
                          <AutoPlayVideo
                            src={relatedVideo}
                            poster={relatedCover || undefined}
                            className="h-full w-full object-cover"
                            controls={false}
                          />
                        ) : relatedCover ? (
                          <Image
                            src={relatedCover}
                            alt={related.title}
                            fill
                            className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-fog">
                            Work
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="display text-xl text-paper">
                          {related.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm text-fog line-clamp-2">
                          {related.description.slice(0, 100)}
                        </p>
                        <span className="mt-4 text-sm text-lilac">Open →</span>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <CTABand />
    </>
  );
}
