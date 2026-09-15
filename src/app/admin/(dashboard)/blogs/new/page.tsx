"use client";

import { useRouter } from "next/navigation";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function AdminNewBlogPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="eyebrow">Blogs</p>
        <h1 className="display mt-3 text-4xl text-paper">New post</h1>
      </div>
      <ContentEditor
        mode="blog"
        folder="blogs"
        onSubmit={async (values) => {
          const res = await fetch("/api/admin/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          let json: { ok?: boolean; error?: string } = {};
          try {
            json = (await res.json()) as { ok?: boolean; error?: string };
          } catch {
            throw new Error("Create failed (invalid server response)");
          }
          if (!res.ok || !json.ok) {
            throw new Error(json.error || `Create failed (${res.status})`);
          }
          router.push("/admin/blogs");
          router.refresh();
        }}
      />
    </div>
  );
}
