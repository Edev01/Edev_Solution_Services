import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminToken,
  ensureAdminUser,
  verifyPassword,
} from "@/lib/auth";
import { getDb } from "@/lib/mongo";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    await ensureAdminUser();
    const db = await getDb();
    const admin = await db.collection("admins").findOne({ email });
    if (!admin?.passwordHash) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = await createAdminToken(email);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Login failed." },
      { status: 500 }
    );
  }
}
