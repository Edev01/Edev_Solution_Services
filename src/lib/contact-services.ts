import { services } from "@/data/content";

export const contactServiceOptions = [
  { value: "Agentic AI", label: "Agentic AI", slug: "agentic-ai" },
  {
    value: "Cloud Infrastructure",
    label: "Cloud Infrastructure",
    slug: "cloud-infrastructure",
  },
  { value: "Web Platforms", label: "Web Platforms", slug: "web-platforms" },
  {
    value: "Mobile Applications",
    label: "Mobile Applications",
    slug: "mobile-apps",
  },
  { value: "DevOps & SRE", label: "DevOps & SRE", slug: "devops-sre" },
  {
    value: "Automation & RPA",
    label: "Automation & RPA",
    slug: "automation-rpa",
  },
  {
    value: "Machine Learning",
    label: "Machine Learning",
    slug: "machine-learning",
  },
  { value: "UI / UX Design", label: "UI / UX Design", slug: "ui-ux-design" },
  { value: "Cybersecurity", label: "Cybersecurity", slug: "cybersecurity" },
  {
    value: "Data & Analytics",
    label: "Data & Analytics",
    slug: "data-analytics",
  },
  {
    value: "API & Integrations",
    label: "API & Integrations",
    slug: "api-integrations",
  },
  {
    value: "Product Consulting",
    label: "Product Consulting",
    slug: "product-consulting",
  },
  { value: "Other", label: "Other", slug: "other" },
] as const;

export function resolveContactService(input?: string | null): string {
  if (!input) return "";
  const raw = decodeURIComponent(input).trim().toLowerCase();
  if (!raw) return "";

  const bySlug = contactServiceOptions.find((o) => o.slug === raw);
  if (bySlug) return bySlug.value;

  const byValue = contactServiceOptions.find(
    (o) => o.value.toLowerCase() === raw || o.label.toLowerCase() === raw
  );
  if (byValue) return byValue.value;

  const service = services.find(
    (s) =>
      s.slug === raw ||
      s.title.toLowerCase() === raw ||
      s.title.toLowerCase().includes(raw)
  );
  if (service) {
    const mapped = contactServiceOptions.find((o) => o.slug === service.slug);
    if (mapped) return mapped.value;
  }

  return "";
}

export function contactHrefForService(slug: string) {
  return `/contact?service=${encodeURIComponent(slug)}`;
}
