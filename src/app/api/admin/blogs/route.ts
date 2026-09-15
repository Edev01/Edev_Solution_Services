import { NextResponse } from "next/server";
import { getAdminSession, slugify } from "@/lib/auth";
import { getDb, type BlogDoc, type BlogImage } from "@/lib/mongo";

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

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const db = await getDb();
  const docs = await db
    .collection<BlogDoc>("blogs")
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
    const body = (await request.json()) as Partial<BlogDoc>;
    const title = (body.title || "").trim();
    if (!title) {
      return NextResponse.json(
        { ok: false, error: "Title is required." },
        { status: 400 }
      );
    }

    const db = await getDb();
    let slug = slugify(body.slug || title) || `blog-${Date.now()}`;
    const existing = await db.collection("blogs").findOne({ slug });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const now = new Date();
    const doc: BlogDoc = {
      title,
      slug,
      excerpt: (body.excerpt || "").trim(),
      content: (body.content || "").trim(),
      images: normalizeImages(body.images),
      published: Boolean(body.published),
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection<BlogDoc>("blogs").insertOne(doc);
    return NextResponse.json({
      ok: true,
      item: serialize({ ...doc, _id: result.insertedId }),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not create blog.",
      },
      { status: 500 }
    );
  }
}
