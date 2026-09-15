import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedWork } from "@/lib/content-store";
import { siteConfig } from "@/lib/site";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";

export const metadata: Metadata = {
  title: "Work",
  description: "Client work, reviews, and delivery stories from Edev Solutions.",
  alternates: { canonical: "/work" },
};

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const items = await getPublishedWork();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <p className="eyebrow">Work</p>
          <h1 className="mega mt-5 max-w-[10ch] text-[clamp(2.8rem,8vw,5.5rem)] text-paper">
            Built with clients
          </h1>
          <p className="mt-6 max-w-xl text-fog">
            Selected projects, reviews, and delivery clips from the studio.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square overflow-hidden border border-line bg-panel">
            <Image
              src="/images/web.png"
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
              Client work
            </span>
            <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-fog">
              {items.length} {items.length === 1 ? "project" : "projects"}
            </span>
          </div>
        </div>
      </div>

      <div className="shell mt-14 md:mt-16">
        {items.length === 0 ? (
          <p className="text-fog">No published work yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((item) => {
              const leadVideo =
                item.videos[0]?.url || item.videoUrl || null;
              const leadImage =
                item.images[0]?.url || item.coverImageUrl || null;

              return (
                <article
                  key={item.id}
                  className="overflow-hidden border border-line bg-panel"
                >
                  <div className="relative aspect-video bg-ink">
                    {leadVideo ? (
                      <AutoPlayVideo
                        src={leadVideo}
                        poster={leadImage || undefined}
                        className="h-full w-full object-cover"
                      />
                    ) : leadImage ? (
                      <Image
                        src={leadImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-fog">
                        Work
                      </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6">
                    <h2 className="display text-2xl text-paper md:text-3xl">
                      {item.title}
                    </h2>
                    {item.clientName ? (
                      <p className="mono mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-lilac">
                        {item.clientName}
                      </p>
                    ) : null}
                    <p className="mt-3 text-sm leading-relaxed text-fog">
                      {item.description.slice(0, 160)}
                      {item.description.length > 160 ? "…" : ""}
                    </p>
                    {(item.images.length > 0 || item.videos.length > 0) && (
                      <p className="mono mt-3 text-[0.6rem] uppercase tracking-[0.14em] text-fog">
                        {item.images.length > 0
                          ? `${item.images.length} ${
                              item.images.length === 1 ? "image" : "images"
                            }`
                          : ""}
                        {item.images.length > 0 && item.videos.length > 0
                          ? ", "
                          : ""}
                        {item.videos.length > 0
                          ? `${item.videos.length} ${
                              item.videos.length === 1 ? "video" : "videos"
                            }`
                          : ""}
                      </p>
                    )}
                    {item.clientReview ? (
                      <p className="mt-4 border-t border-line pt-4 text-sm italic text-paper/90">
                        “{item.clientReview}”
                      </p>
                    ) : null}
                    <Link
                      href={`/work/${item.slug}`}
                      className="mt-5 inline-block text-sm text-lilac"
                    >
                      Open details →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
