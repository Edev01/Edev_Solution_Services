import { MongoClient, Db, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("MONGODB_URI is not set");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || "edev");
}

export { ObjectId };

export type MediaAsset = {
  url: string;
  key: string;
};

export type BlogImage = MediaAsset;

export type BlogDoc = {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  images: BlogImage[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkDoc = {
  _id?: ObjectId;
  title: string;
  slug: string;
  description: string;
  clientName?: string | null;
  clientReview?: string | null;
  images: MediaAsset[];
  videos: MediaAsset[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminDoc = {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  createdAt: Date;
};
