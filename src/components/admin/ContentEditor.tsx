"use client";

import { FormEvent, useState } from "react";

type MediaValue = {
  url: string;
  key: string;
};

export type ContentFormValues = {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  description?: string;
  clientName?: string;
  clientReview?: string;
  published: boolean;
  images?: MediaValue[];
  videos?: MediaValue[];
  coverImageUrl?: string | null;
  coverImageKey?: string | null;
  videoUrl?: string | null;
  videoKey?: string | null;
};

async function uploadFile(file: File, folder: "blogs" | "work") {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const json = (await res.json()) as {
    ok?: boolean;
    url?: string;
    key?: string;
    error?: string;
  };
  if (!res.ok || !json.ok || !json.url || !json.key) {
    throw new Error(json.error || "Upload failed");
  }
  return { url: json.url, key: json.key };
}

function initialImages(initial?: Partial<ContentFormValues>): MediaValue[] {
  if (initial?.images?.length) {
    return initial.images.filter((img) => img.url);
  }
  if (initial?.coverImageUrl) {
    return [
      {
        url: initial.coverImageUrl,
        key: initial.coverImageKey || "",
      },
    ];
  }
  return [];
}

function initialVideos(initial?: Partial<ContentFormValues>): MediaValue[] {
  if (initial?.videos?.length) {
    return initial.videos.filter((vid) => vid.url);
  }
  if (initial?.videoUrl) {
    return [
      {
        url: initial.videoUrl,
        key: initial.videoKey || "",
      },
    ];
  }
  return [];
}

export function ContentEditor({
  mode,
  folder,
  initial,
  onSubmit,
}: {
  mode: "blog" | "work";
  folder: "blogs" | "work";
  initial?: Partial<ContentFormValues>;
  onSubmit: (values: ContentFormValues) => Promise<void>;
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [clientName, setClientName] = useState(initial?.clientName || "");
  const [clientReview, setClientReview] = useState(initial?.clientReview || "");
  const [published, setPublished] = useState(Boolean(initial?.published));
  const [images, setImages] = useState<MediaValue[]>(() => initialImages(initial));
  const [videos, setVideos] = useState<MediaValue[]>(() =>
    mode === "work" ? initialVideos(initial) : []
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (mode === "blog") {
        await onSubmit({
          title,
          slug,
          excerpt,
          content,
          published,
          images,
        });
      } else {
        await onSubmit({
          title,
          slug,
          description,
          clientName,
          clientReview,
          published,
          images,
          videos,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function uploadMany(
    files: File[],
    kind: "image" | "video",
    onDone: (uploaded: MediaValue[]) => void
  ) {
    if (!files.length) return;
    setBusy(true);
    setError("");
    try {
      const uploaded: MediaValue[] = [];
      for (const file of files) {
        uploaded.push(await uploadFile(file, folder));
      }
      onDone(uploaded);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : kind === "image"
            ? "Image upload failed"
            : "Video upload failed"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block space-y-2">
        <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
          Title
        </span>
        <input
          className="field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="block space-y-2">
        <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
          Slug (optional)
        </span>
        <input
          className="field"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="auto-from-title"
        />
      </label>

      {mode === "blog" ? (
        <>
          <label className="block space-y-2">
            <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
              Excerpt
            </span>
            <textarea
              className="field min-h-24"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </label>
          <label className="block space-y-2">
            <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
              Content
            </span>
            <textarea
              className="field min-h-48"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </>
      ) : (
        <>
          <label className="block space-y-2">
            <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
              Description
            </span>
            <textarea
              className="field min-h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
              Client name
            </span>
            <input
              className="field"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </label>
          <label className="block space-y-2">
            <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
              Client review
            </span>
            <textarea
              className="field min-h-28"
              value={clientReview}
              onChange={(e) => setClientReview(e.target.value)}
            />
          </label>
        </>
      )}

      <div className="space-y-3 border border-line p-4">
        <p className="mono text-[0.68rem] uppercase tracking-[0.14em] text-lilac">
          Images
        </p>
        <p className="text-sm text-fog">
          Add one or more images. First image is used as the card cover.
        </p>
        {images.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {images.map((img, index) => (
              <div
                key={`${img.key}-${index}`}
                className="space-y-2 border border-line p-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt=""
                  className="max-h-40 w-full object-cover"
                />
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-fog">No images yet</p>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={async (e) => {
            const files = Array.from(e.target.files || []);
            await uploadMany(files, "image", (uploaded) =>
              setImages((prev) => [...prev, ...uploaded])
            );
            e.target.value = "";
          }}
        />
      </div>

      {mode === "work" ? (
        <div className="space-y-3 border border-line p-4">
          <p className="mono text-[0.68rem] uppercase tracking-[0.14em] text-lilac">
            Videos
          </p>
          <p className="text-sm text-fog">
            Add one or more videos. They autoplay on the public site.
          </p>
          {videos.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {videos.map((vid, index) => (
                <div
                  key={`${vid.key}-${index}`}
                  className="space-y-2 border border-line p-2"
                >
                  <video
                    src={vid.url}
                    controls
                    className="max-h-48 w-full bg-ink"
                  />
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() =>
                      setVideos((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-fog">No videos yet</p>
          )}
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              await uploadMany(files, "video", (uploaded) =>
                setVideos((prev) => [...prev, ...uploaded])
              );
              e.target.value = "";
            }}
          />
        </div>
      ) : null}

      <label className="flex items-center gap-3 text-sm text-paper">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published
      </label>

      {error ? <p className="text-sm text-heat">{error}</p> : null}

      <button type="submit" className="btn" disabled={busy}>
        {busy ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
