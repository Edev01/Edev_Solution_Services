"use client";

import { FormEvent, useState } from "react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassSelect } from "@/components/ui/GlassSelect";

type Status = "idle" | "loading" | "success" | "error";

const serviceOptions = [
  { value: "Agentic AI", label: "Agentic AI" },
  { value: "Cloud Infrastructure", label: "Cloud Infrastructure" },
  { value: "Web Platforms", label: "Web Platforms" },
  { value: "Mobile Applications", label: "Mobile Applications" },
  { value: "DevOps & SRE", label: "DevOps & SRE" },
  { value: "Automation & RPA", label: "Automation & RPA" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "UI / UX Design", label: "UI / UX Design" },
  { value: "Other", label: "Other" },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      company: String(data.get("company") || "").trim(),
      service: String(data.get("service") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage("Message sent. We’ll get back to you soon.");
      form.reset();
      setService("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Unable to send right now. Email us directly."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-edev-mist/70">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="glass-input"
            placeholder="Your name"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-edev-mist/70">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="glass-input"
            placeholder="you@company.com"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-edev-mist/70">Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="glass-input"
            placeholder="+92 335 2389952"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-edev-mist/70">Company</span>
          <input
            name="company"
            autoComplete="organization"
            className="glass-input"
            placeholder="Optional"
          />
        </label>
      </div>

      <div className="block space-y-2">
        <span className="text-sm text-edev-mist/70">Service interest</span>
        <GlassSelect
          name="service"
          placeholder="Select a service"
          options={serviceOptions}
          value={service}
          onChange={setService}
        />
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-edev-mist/70">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="glass-input resize-y min-h-[140px]"
          placeholder="Tell us what you’re building…"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <GlassButton type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </GlassButton>
        {message ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-edev-lilac" : "text-rose-300"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
