"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ContentEditor,
  type ContentFormValues,
} from "@/components/admin/ContentEditor";

export default function AdminEditWorkPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [initial, setInitial] = useState<ContentFormValues | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/work/${params.id}`);
      const json = (await res.json()) as {
        ok?: boolean;
        item?: ContentFormValues & { id: string };
        error?: string;
      };
      if (!res.ok || !json.ok || !json.item) {
        setError(json.error || "Failed to load");
        return;
      }
      setInitial(json.item);
    })();
  }, [params.id]);

  if (error) return <p className="text-heat">{error}</p>;
  if (!initial) return <p className="text-fog">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="eyebrow">Work</p>
        <h1 className="display mt-3 text-4xl text-paper">Edit work</h1>
      </div>
      <ContentEditor
        mode="work"
        folder="work"
        initial={initial}
        onSubmit={async (values) => {
          const res = await fetch(`/api/admin/work/${params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          let json: { ok?: boolean; error?: string } = {};
          try {
            json = (await res.json()) as { ok?: boolean; error?: string };
          } catch {
            throw new Error("Update failed (invalid server response)");
          }
          if (!res.ok || !json.ok) {
            throw new Error(json.error || `Update failed (${res.status})`);
          }
          router.push("/admin/work");
          router.refresh();
        }}
      />
    </div>
  );
}
