import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { uploadToR2 } from "@/lib/r2";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const folder = String(form.get("folder") || "blogs");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "File is required." },
        { status: 400 }
      );
    }

    if (folder !== "blogs" && folder !== "work") {
      return NextResponse.json(
        { ok: false, error: "Invalid folder." },
        { status: 400 }
      );
    }

    const maxBytes = 200 * 1024 * 1024; // 200MB
    if (file.size > maxBytes) {
      return NextResponse.json(
        { ok: false, error: "File too large (max 200MB)." },
        { status: 400 }
      );
    }

    const uploaded = await uploadToR2(file, folder);
    return NextResponse.json({ ok: true, ...uploaded });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Upload failed. Check R2 env values." },
      { status: 500 }
    );
  }
}
