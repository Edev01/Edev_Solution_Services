import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function getR2Client() {
  const accountId = requireEnv("R2_ACCOUNT_ID");
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  });
}

function publicUrlForKey(key: string) {
  const base = requireEnv("R2_PUBLIC_URL").replace(/\/$/, "");
  return `${base}/${key}`;
}

export async function uploadToR2(file: File, folder: "blogs" | "work") {
  const bucket = requireEnv("R2_BUCKET_NAME");
  const client = getR2Client();
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const key = `${folder}/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    })
  );

  return {
    key,
    url: publicUrlForKey(key),
  };
}

export async function deleteFromR2(key?: string | null) {
  if (!key) return;
  const bucket = requireEnv("R2_BUCKET_NAME");
  const client = getR2Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
}

export async function deleteKeysFromR2(keys: Array<string | null | undefined>) {
  const unique = [...new Set(keys.filter(Boolean) as string[])];
  await Promise.all(unique.map((key) => deleteFromR2(key)));
}
