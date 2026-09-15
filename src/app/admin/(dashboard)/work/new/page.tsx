"use client";

import { useRouter } from "next/navigation";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function AdminNewWorkPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="eyebrow">Work</p>
        <h1 className="display mt-3 text-4xl text-paper">New work</h1>
      </div>
      <ContentEditor
        mode="work"
        folder="work"
        onSubmit={async (values) => {
          const res = await fetch("/api/admin/work", {
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
          router.push("/admin/work");
          router.refresh();
        }}
      />
    </div>
  );
}
