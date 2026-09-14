"use client";

import { FormEvent, useEffect, useState } from "react";
import { FieldSelect } from "@/components/ui/FieldSelect";
import { contactServiceOptions } from "@/lib/contact-services";

type Status = "idle" | "loading" | "success" | "error";

const options = contactServiceOptions.map(({ value, label }) => ({
  value,
  label,
}));

export function ContactForm({
  initialService = "",
}: {
  initialService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [service, setService] = useState(initialService);

  useEffect(() => {
    setService(initialService);
  }, [initialService]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
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
      setService(initialService || "");
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
      {service ? (
        <div className="flex flex-wrap items-center gap-2 border border-line bg-ink px-3 py-2">
          <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-lilac">
            Interested in
          </span>
          <span className="text-sm text-paper">{service}</span>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
            Name
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className="field"
            placeholder="Your name"
          />
        </label>
        <label className="block space-y-2">
          <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field"
            placeholder="you@company.com"
          />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
            Company
          </span>
          <input
            name="company"
            autoComplete="organization"
            className="field"
            placeholder="Optional"
          />
        </label>
      </div>

      <div className="block space-y-2">
        <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
          Service interest
        </span>
        <FieldSelect
          name="service"
          placeholder="Select a service"
          options={options}
          value={service}
          onChange={setService}
        />
      </div>

      <label className="block space-y-2">
        <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-fog">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="field min-h-[140px] resize-y"
          placeholder="Tell us what you’re building…"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        {message ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-signal" : "text-heat"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
