export const siteConfig = {
  name: "Edev Solutions",
  legalName: "Edev Solutions",
  tagline: "Agentic systems. Cloud platforms. Products that ship.",
  description:
    "Edev Solutions builds agentic AI systems, cloud infrastructure, web platforms, and automation for teams that need speed without sacrificing craft.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://edev.solutions",
  email: "info@edevsolutions.com",
  phone: "03218995279",
  phoneDisplay: "+92 321 8995279",
  phoneHref: "tel:+923218995279",
  social: {
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/",
  },
  keywords: [
    "Edev Solutions",
    "Edev",
    "agentic AI",
    "cloud solutions",
    "web development",
    "software agency",
    "automation",
    "DevOps",
    "machine learning",
    "mobile apps",
    "UI UX design",
  ],
} as const;
