import { NextResponse } from "next/server";
import { getAdminSession, slugify } from "@/lib/auth";
import { getDb, ObjectId, type MediaAsset, type WorkDoc } from "@/lib/mongo";
import { deleteKeysFromR2 } from "@/lib/r2";

type Ctx = { params: Promise<{ id: string }> };

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

export async function GET(_request: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }
  const db = await getDb();
  const doc = await db.collection<WorkDoc>("work").findOne({ _id: new ObjectId(id) });
  if (!doc) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, item: serialize(doc) });
}

export async function PUT(request: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = (await request.json()) as Partial<WorkDoc>;
    const db = await getDb();
    const current = await db
      .collection<WorkDoc>("work")
      .findOne({ _id: new ObjectId(id) });
    if (!current) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const title = (body.title ?? current.title).trim();
    let slug = slugify(body.slug || title) || current.slug;
    const clash = await db.collection("work").findOne({
      slug,
      _id: { $ne: new ObjectId(id) },
    });
    if (clash) slug = `${slug}-${Date.now().toString(36)}`;

    const currentImages = legacyImages(current as WorkDoc & Record<string, unknown>);
    const currentVideos = legacyVideos(current as WorkDoc & Record<string, unknown>);
    const nextImages =
      body.images !== undefined ? normalizeAssets(body.images) : currentImages;
    const nextVideos =
      body.videos !== undefined ? normalizeAssets(body.videos) : currentVideos;

    const nextKeys = new Set(
      [...nextImages, ...nextVideos].map((asset) => asset.key).filter(Boolean)
    );
    const keysToDelete = [...currentImages, ...currentVideos]
      .map((asset) => asset.key)
      .filter((key) => key && !nextKeys.has(key));

    const update: WorkDoc = {
      title,
      slug,
      description: (body.description ?? current.description).trim(),
      clientName:
        body.clientName !== undefined
          ? (body.clientName || "").trim() || null
          : current.clientName,
      clientReview:
        body.clientReview !== undefined
          ? (body.clientReview || "").trim() || null
          : current.clientReview,
      images: nextImages,
      videos: nextVideos,
      published:
        body.published !== undefined ? Boolean(body.published) : current.published,
      createdAt: current.createdAt,
      updatedAt: new Date(),
    };

    await db.collection("work").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: update,
        $unset: {
          coverImageUrl: "",
          coverImageKey: "",
          videoUrl: "",
          videoKey: "",
        },
      }
    );
    await deleteKeysFromR2(keysToDelete);

    return NextResponse.json({
      ok: true,
      item: serialize({ ...update, _id: new ObjectId(id) }),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not update work item.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const current = await db
      .collection<WorkDoc>("work")
      .findOne({ _id: new ObjectId(id) });
    if (!current) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const images = legacyImages(current as WorkDoc & Record<string, unknown>);
    const videos = legacyVideos(current as WorkDoc & Record<string, unknown>);
    await deleteKeysFromR2([
      ...images.map((img) => img.key),
      ...videos.map((vid) => vid.key),
    ]);
    await db.collection("work").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not delete work item.",
      },
      { status: 500 }
    );
  }
}
