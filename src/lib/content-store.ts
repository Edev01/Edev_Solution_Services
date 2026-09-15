import { getDb, type BlogDoc, type MediaAsset, type WorkDoc } from "@/lib/mongo";

function normalizeBlogImages(doc: BlogDoc) {
  if (Array.isArray(doc.images) && doc.images.length > 0) {
    return doc.images.filter((img) => img?.url);
  }
  const legacy = doc as BlogDoc & {
    coverImageUrl?: string | null;
    coverImageKey?: string | null;
  };
  if (legacy.coverImageUrl) {
    return [
      {
        url: legacy.coverImageUrl,
        key: legacy.coverImageKey || "",
      },
    ];
  }
  return [];
}

function normalizeWorkImages(doc: WorkDoc & Record<string, unknown>): MediaAsset[] {
  if (Array.isArray(doc.images) && doc.images.length > 0) {
    return doc.images.filter((img) => img?.url);
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

function normalizeWorkVideos(doc: WorkDoc & Record<string, unknown>): MediaAsset[] {
  if (Array.isArray(doc.videos) && doc.videos.length > 0) {
    return doc.videos.filter((vid) => vid?.url);
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

function mapBlog(doc: BlogDoc & { _id: { toString(): string } }) {
  const images = normalizeBlogImages(doc);
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    images,
    coverImageUrl: images[0]?.url || null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function mapWork(doc: WorkDoc & { _id: { toString(): string } }) {
  const images = normalizeWorkImages(doc as WorkDoc & Record<string, unknown>);
  const videos = normalizeWorkVideos(doc as WorkDoc & Record<string, unknown>);
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
    videoUrl: videos[0]?.url || null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function getPublishedBlogs() {
  try {
    const db = await getDb();
    const docs = await db
      .collection<BlogDoc>("blogs")
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();
    return docs.map(mapBlog);
  } catch (error) {
    console.error("getPublishedBlogs", error);
    return [];
  }
}

export async function getPublishedBlogBySlug(slug: string) {
  try {
    const db = await getDb();
    const doc = await db
      .collection<BlogDoc>("blogs")
      .findOne({ slug, published: true });
    return doc ? mapBlog(doc) : null;
  } catch (error) {
    console.error("getPublishedBlogBySlug", error);
    return null;
  }
}

export async function getPublishedWork() {
  try {
    const db = await getDb();
    const docs = await db
      .collection<WorkDoc>("work")
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();
    return docs.map(mapWork);
  } catch (error) {
    console.error("getPublishedWork", error);
    return [];
  }
}

export async function getPublishedWorkBySlug(slug: string) {
  try {
    const db = await getDb();
    const doc = await db
      .collection<WorkDoc>("work")
      .findOne({ slug, published: true });
    return doc ? mapWork(doc) : null;
  } catch (error) {
    console.error("getPublishedWorkBySlug", error);
    return null;
  }
}
