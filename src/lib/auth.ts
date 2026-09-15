import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getDb, type AdminDoc } from "@/lib/mongo";
import {
  ADMIN_COOKIE,
  createAdminToken,
  verifyAdminToken,
} from "@/lib/admin-token";

export { ADMIN_COOKIE, createAdminToken, verifyAdminToken };

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function getAdminSession() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  try {
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

/** Ensure a single admin exists from env credentials. */
export async function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  const db = await getDb();
  const admins = db.collection<AdminDoc>("admins");
  const existing = await admins.findOne({ email });
  if (existing) return existing;

  const passwordHash = await hashPassword(password);
  const doc: AdminDoc = {
    email,
    passwordHash,
    createdAt: new Date(),
  };
  await admins.insertOne(doc);
  return doc;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}
