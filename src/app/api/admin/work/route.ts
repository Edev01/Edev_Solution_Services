import { NextResponse } from "next/server";
import { getAdminSession, slugify } from "@/lib/auth";
import { getDb, type MediaAsset, type WorkDoc } from "@/lib/mongo";

function normalizeAssets(input: unknown): MediaAsset[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(
      (item): item is MediaAsset =>
        !!item &&
        typeof item === "object" &&
        typeof (item as MediaAsset).url === "string" &&
        typeof (item as MediaAsset).key === "string" &&
        Boolean((item as MediaAsset).url)
    )
    .map((item) => ({ url: item.url, key: item.key }));
}

function legacyImages(doc: WorkDoc & Record<string, unknown>): MediaAsset[] {
  if (Array.isArray(doc.images) && doc.images.length > 0) {
    return normalizeAssets(doc.images);
  }
  const url = doc.coverImageUrl;
  if (typeof url === "string" && url) {
    return [
      {
        url,
        key: typeof doc.coverImageKey === "string" ? doc.coverImageKey : "",
      },
    ];
  }
  return [];
}

function legacyVideos(doc: WorkDoc & Record<string, unknown>): MediaAsset[] {
  if (Array.isArray(doc.videos) && doc.videos.length > 0) {
    return normalizeAssets(doc.videos);
  }
  const url = doc.videoUrl;
  if (typeof url === "string" && url) {
    return [
      {
        url,
        key: typeof doc.videoKey === "string" ? doc.videoKey : "",
      },
    ];
  }
  return [];
}

function serialize(doc: WorkDoc & { _id: { toString(): string } } & Record<string, unknown>) {
  const images = legacyImages(doc);
  const videos = legacyVideos(doc);
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    clientName: doc.clientName || null,
    clientReview: doc.clientReview || null,
    images,
    videos,
    coverImageUrl: images[0]?.url || null,
    coverImageKey: images[0]?.key || null,
    videoUrl: videos[0]?.url || null,
    videoKey: videos[0]?.key || null,
    published: doc.published,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const db = await getDb();
  const docs = await db
    .collection<WorkDoc>("work")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json({ ok: true, items: docs.map(serialize) });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<WorkDoc>;
    const title = (body.title || "").trim();
    if (!title) {
      return NextResponse.json(
        { ok: false, error: "Title is required." },
        { status: 400 }
      );
    }

    const db = await getDb();
    let slug = slugify(body.slug || title) || `work-${Date.now()}`;
    const existing = await db.collection("work").findOne({ slug });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const now = new Date();
    const doc: WorkDoc = {
      title,
      slug,
      description: (body.description || "").trim(),
      clientName: (body.clientName || "").trim() || null,
      clientReview: (body.clientReview || "").trim() || null,
      images: normalizeAssets(body.images),
      videos: normalizeAssets(body.videos),
      published: Boolean(body.published),
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection<WorkDoc>("work").insertOne(doc);
    return NextResponse.json({
      ok: true,
      item: serialize({ ...doc, _id: result.insertedId }),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not create work item.",
      },
      { status: 500 }
    );
  }
}
