import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "edev_admin_token";

function authSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET");
  return new TextEncoder().encode(secret);
}

export async function createAdminToken(email: string) {
  return new SignJWT({ role: "admin", email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(authSecret());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, authSecret());
  if (payload.role !== "admin" || typeof payload.email !== "string") {
    return null;
  }
  return { email: payload.email };
}
