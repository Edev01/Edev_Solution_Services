"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type BlogItem = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
};

export default function AdminBlogsPage() {
  const router = useRouter();
  const [items, setItems] = useState<BlogItem[]>([]);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/blogs");
    const json = (await res.json()) as {
      ok?: boolean;
      items?: BlogItem[];
      error?: string;
    };
    if (!res.ok || !json.ok) {
      setError(json.error || "Failed to load");
      return;
    }
    setItems(json.items || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Blogs</p>
          <h1 className="display mt-3 text-4xl text-paper">All posts</h1>
        </div>
        <Link href="/admin/blogs/new" className="btn">
          New blog
        </Link>
      </div>

      {error ? <p className="text-sm text-heat">{error}</p> : null}

      <div className="divide-y divide-line border border-line">
        {items.length === 0 ? (
          <p className="p-5 text-fog">No blogs yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="display text-xl text-paper">{item.title}</p>
                <p className="mono mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-fog">
                  {item.published ? "Published" : "Draft"} · /blogs/{item.slug}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/blogs/${item.slug}`} className="btn btn-ghost">
                  View
                </Link>
                <Link href={`/admin/blogs/${item.id}`} className="btn btn-ghost">
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={async () => {
                    if (!confirm("Delete this blog and its R2 media?")) return;
                    const res = await fetch(`/api/admin/blogs/${item.id}`, {
                      method: "DELETE",
                    });
                    if (res.ok) {
                      await load();
                      router.refresh();
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
