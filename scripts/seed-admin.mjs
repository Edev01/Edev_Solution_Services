/**
 * Seed admin user into MongoDB from env.
 *
 * Usage:
 *   npm run seed:admin
 *   npm run seed:admin -- --update   # also refresh password from ADMIN_PASSWORD
 *
 * Required env (from .env or shell):
 *   MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD
 * Optional:
 *   MONGODB_DB (default: edev)
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env) || process.env[key] === "") {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "edev";
const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "";
const shouldUpdate = process.argv.includes("--update");

if (!uri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}
if (!email || !password) {
  console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD");
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const admins = client.db(dbName).collection("admins");
  const existing = await admins.findOne({ email });

  if (existing && !shouldUpdate) {
    console.log(`Admin already exists: ${email}`);
    console.log("Run with --update to refresh the password from ADMIN_PASSWORD.");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  if (existing && shouldUpdate) {
    await admins.updateOne(
      { email },
      { $set: { passwordHash, updatedAt: new Date() } }
    );
    console.log(`Admin password updated: ${email}`);
  } else {
    await admins.insertOne({
      email,
      passwordHash,
      createdAt: new Date(),
    });
    console.log(`Admin created: ${email}`);
  }

  console.log(`Database: ${dbName}`);
  console.log("Done. Login at /admin/login");
} catch (error) {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await client.close();
}
