import { NextResponse } from "next/server";
import { getAdminSession, slugify } from "@/lib/auth";
import { getDb, ObjectId, type BlogDoc, type BlogImage } from "@/lib/mongo";
import { deleteKeysFromR2 } from "@/lib/r2";

type Ctx = { params: Promise<{ id: string }> };

function normalizeImages(input: unknown): BlogImage[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(
      (item): item is BlogImage =>
        !!item &&
        typeof item === "object" &&
        typeof (item as BlogImage).url === "string" &&
        typeof (item as BlogImage).key === "string" &&
        Boolean((item as BlogImage).url)
    )
    .map((item) => ({ url: item.url, key: item.key }));
}

function legacyImages(doc: BlogDoc & Record<string, unknown>): BlogImage[] {
  if (Array.isArray(doc.images) && doc.images.length > 0) {
    return normalizeImages(doc.images);
  }
  const url = doc.coverImageUrl;
  if (typeof url === "string" && url) {
    return [{ url, key: typeof doc.coverImageKey === "string" ? doc.coverImageKey : "" }];
  }
  return [];
}

function serialize(doc: BlogDoc & { _id: { toString(): string } } & Record<string, unknown>) {
  const images = legacyImages(doc);
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    images,
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
  const doc = await db.collection<BlogDoc>("blogs").findOne({ _id: new ObjectId(id) });
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
    const body = (await request.json()) as Partial<BlogDoc>;
    const db = await getDb();
    const current = await db
      .collection<BlogDoc>("blogs")
      .findOne({ _id: new ObjectId(id) });
    if (!current) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const title = (body.title ?? current.title).trim();
    let slug = slugify(body.slug || title) || current.slug;
    const clash = await db.collection("blogs").findOne({
      slug,
      _id: { $ne: new ObjectId(id) },
    });
    if (clash) slug = `${slug}-${Date.now().toString(36)}`;

    const currentImages = legacyImages(current as BlogDoc & Record<string, unknown>);
    const nextImages =
      body.images !== undefined ? normalizeImages(body.images) : currentImages;

    const nextKeys = new Set(nextImages.map((img) => img.key).filter(Boolean));
    const keysToDelete = currentImages
      .map((img) => img.key)
      .filter((key) => key && !nextKeys.has(key));

    // Drop legacy video fields from blogs if present
    const legacy = current as BlogDoc & {
      videoKey?: string | null;
      coverImageKey?: string | null;
    };
    if (legacy.videoKey) keysToDelete.push(legacy.videoKey);

    const update: BlogDoc = {
      title,
      slug,
      excerpt: (body.excerpt ?? current.excerpt).trim(),
      content: (body.content ?? current.content).trim(),
      images: nextImages,
      published:
        body.published !== undefined ? Boolean(body.published) : current.published,
      createdAt: current.createdAt,
      updatedAt: new Date(),
    };

    await db.collection("blogs").updateOne(
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
        error: error instanceof Error ? error.message : "Could not update blog.",
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
      .collection<BlogDoc>("blogs")
      .findOne({ _id: new ObjectId(id) });
    if (!current) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const images = legacyImages(current as BlogDoc & Record<string, unknown>);
    const legacy = current as BlogDoc & { videoKey?: string | null };
    await deleteKeysFromR2([
      ...images.map((img) => img.key),
      legacy.videoKey,
    ]);
    await db.collection("blogs").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not delete blog.",
      },
      { status: 500 }
    );
  }
}
