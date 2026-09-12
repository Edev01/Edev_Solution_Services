import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const company = (body.company || "").trim();
    const service = (body.service || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "Message is too long." },
        { status: 400 }
      );
    }

    const user = process.env.SMTP_USER || siteConfig.email;
    const pass = process.env.SMTP_PASS;
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT || 465);
    const to = process.env.CONTACT_TO || siteConfig.email;
    const from = process.env.CONTACT_FROM || user;

    if (!pass) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email is not configured yet. Set SMTP_PASS in your environment.",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `Edev inquiry${service ? `, ${service}` : ""} from ${name}`;
    const text = [
      `New contact form submission from ${siteConfig.name}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "n/a"}`,
      `Company: ${company || "n/a"}`,
      `Service: ${service || "n/a"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#1a1028">
        <h2 style="margin:0 0 12px">New Edev inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "n/a")}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "n/a")}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || "n/a")}</p>
        <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${siteConfig.name} Website" <${from}>`,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
