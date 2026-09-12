export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  description: string;
  outcomes: string[];
  capabilities: string[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "agentic-ai", title: "Agentic AI Systems", short: "Autonomous agents that plan, act, and integrate with your stack.", summary:
      "Design and ship multi-agent workflows that research, decide, and execute across tools with guardrails.", description:
      "We build production agent stacks, orchestration, memory, tool calling, evaluation, and human-in-the-loop controls, so intelligence becomes operational, not experimental.", outcomes: [
      "Agents that complete multi-step work with audit trails", "Safer tool use with policy and approval gates", "Measurable quality loops and eval suites", ], capabilities: [
      "Multi-agent orchestration", "Tool & API grounding", "Memory and retrieval layers", "Eval, tracing, and observability", "Human approval workflows", ], image:
      "/images/agentic.jpg", imageAlt: "Engineer working with AI systems on multiple displays", }, {
    slug: "cloud-infrastructure", title: "Cloud Infrastructure", short: "Scalable cloud architecture on AWS, Azure, and GCP.", summary:
      "Secure, observable cloud foundations engineered for growth, cost control, and reliability.", description:
      "From landing zones to production clusters, we design resilient cloud platforms with IaC, networking, identity, and cost-aware architecture.", outcomes: [
      "Infrastructure as code you can trust", "Hardened identity and network boundaries", "Clear cost and performance visibility", ], capabilities: [
      "Landing zones & multi-account setup", "Kubernetes & container platforms", "Serverless architectures", "Networking, IAM, and security baselines", "FinOps and capacity planning", ], image:
      "/images/cloud.jpg", imageAlt: "Global cloud network visualization", }, {
    slug: "web-platforms", title: "Web Platforms", short: "Fast, polished product web experiences that convert.", summary:
      "Next-generation web applications with performance, accessibility, and brand-grade interfaces.", description:
      "We craft marketing sites, dashboards, and full product surfaces with modern frameworks, edge delivery, and liquid-smooth interaction design.", outcomes: [
      "Core Web Vitals that stay green", "Interfaces that feel premium and clear", "SEO-ready architecture from day one", ], capabilities: [
      "Next.js & React product apps", "Design systems & component libraries", "CMS and content platforms", "Auth, billing, and admin suites", "Performance and SEO engineering", ], image:
      "/images/web.jpg", imageAlt: "Product team reviewing web analytics dashboards", }, {
    slug: "mobile-apps", title: "Mobile Applications", short: "Native-feel iOS and Android products that stay fast.", summary:
      "Cross-platform and native mobile experiences built for retention and clarity.", description:
      "From MVP to scale, we deliver mobile apps with clean architecture, offline resilience, and interfaces that feel at home on every device.", outcomes: [
      "Ship faster with shared product logic", "Smooth motion and responsive layouts", "Store-ready release pipelines", ], capabilities: [
      "React Native & Flutter", "Native modules when needed", "Push, offline, and sync patterns", "App Store & Play release ops", "Analytics and crash monitoring", ], image:
      "/images/mobile.jpg", imageAlt: "Designer reviewing a mobile app prototype", }, {
    slug: "devops-sre", title: "DevOps & SRE", short: "CI/CD, observability, and reliability as a product.", summary:
      "Release systems that are boring in the best way, repeatable, visible, and recoverable.", description:
      "We harden delivery pipelines, monitoring, and incident readiness so teams ship often without gambling production.", outcomes: [
      "Predictable deployments", "Faster mean-time-to-recovery", "Shared operational clarity", ], capabilities: [
      "CI/CD pipelines", "GitOps workflows", "Metrics, logs, and traces", "SLO design and alerting", "Incident runbooks", ], image:
      "/images/devops.jpg", imageAlt: "Server room and infrastructure operations", }, {
    slug: "automation-rpa", title: "Automation & RPA", short: "Remove repetitive work with durable automation.", summary:
      "Process automation that connects people, software, and data without fragile scripts.", description:
      "We map workflows, automate the high-volume paths, and keep humans where judgment matters, clean, monitored, and maintainable.", outcomes: [
      "Hours returned every week", "Fewer manual errors", "Processes that stay documented", ], capabilities: [
      "Business process automation", "RPA bot design", "Document and inbox pipelines", "System integrations", "Ops dashboards", ], image:
      "/images/code.jpg", imageAlt: "Software engineer writing automation and workflow code", }, {
    slug: "machine-learning", title: "Machine Learning", short: "Models that reach production with evaluation built in.", summary:
      "From data pipelines to deployed inference, ML that is measurable and maintainable.", description:
      "We help you move from notebooks to services: feature pipelines, training loops, model serving, and continuous evaluation.", outcomes: [
      "Reliable training-to-serve paths", "Clear model quality signals", "Cost-aware inference options", ], capabilities: [
      "Feature engineering pipelines", "Model training & tuning", "Inference APIs", "MLOps and monitoring", "Computer vision & NLP", ], image:
      "/images/analytics.jpg", imageAlt: "Machine learning dashboards and model analytics", }, {
    slug: "ui-ux-design", title: "UI / UX Design", short: "Interfaces with presence, hierarchy, and calm clarity.", summary:
      "Product design that feels intentional, motion, typography, and interaction as one system.", description:
      "We design experiences that carry your brand through every state: empty, loading, success, and edge cases that usually get ignored.", outcomes: [
      "Cohesive visual language", "Flows users finish without friction", "Handoff-ready design systems", ], capabilities: [
      "Product & marketing design", "Design systems", "Prototyping and motion", "Accessibility reviews", "Brand-to-product alignment", ], image:
      "/images/design.jpg", imageAlt: "Designer crafting interface layouts on a large display", }, {
    slug: "cybersecurity", title: "Cybersecurity", short: "Practical security layered into how you build and ship.", summary:
      "Threat-aware architecture, reviews, and hardening that fits real delivery timelines.", description:
      "Security is part of the build, identity, secrets, application review, and cloud posture, so growth does not invent new risk.", outcomes: [
      "Reduced attack surface", "Clear remediation priorities", "Safer release habits", ], capabilities: [
      "Secure architecture reviews", "Cloud posture hardening", "App security baselines", "Secrets and identity design", "Compliance-ready controls", ], image:
      "/images/security.jpg", imageAlt: "Security operations and digital defense systems", }, {
    slug: "data-analytics", title: "Data & Analytics", short: "Pipelines and insights that leadership can act on.", summary:
      "Trusted data platforms, warehouses, and dashboards connected to decisions.", description:
      "We build the path from raw events to reliable metrics, ingestion, modeling, governance, and visualization that teams actually use.", outcomes: [
      "A single source of operational truth", "Faster reporting cycles", "Metrics people trust", ], capabilities: [
      "ETL / ELT pipelines", "Warehouses and lakehouses", "BI dashboards", "Data quality checks", "Real-time analytics", ], image:
      "/images/analytics.jpg", imageAlt: "Analytics dashboards on multiple monitors", }, {
    slug: "api-integrations", title: "API & Integrations", short: "Connect the stack so work flows without copy-paste.", summary:
      "Robust APIs and third-party integrations that stay stable under load.", description:
      "We design API contracts, webhooks, and sync layers that keep CRM, billing, ops, and product systems aligned.", outcomes: [
      "Fewer brittle point-to-point hacks", "Clear contracts between teams", "Resilient retry and idempotency", ], capabilities: [
      "REST & GraphQL APIs", "Webhook platforms", "ERP / CRM connectors", "Event-driven sync", "API gateways", ], image:
      "/images/devops.jpg", imageAlt: "Connected systems and network infrastructure", }, {
    slug: "product-consulting", title: "Product Consulting", short: "Strategy and architecture before the expensive mistakes.", summary:
      "Technical discovery, roadmaps, and build plans grounded in what your team can ship.", description:
      "We help founders and operators choose the right architecture, sequence, and delivery model, then stay close while it becomes real.", outcomes: [
      "Clear build vs buy decisions", "Realistic delivery plans", "Architecture that ages well", ], capabilities: [
      "Technical discovery", "Architecture reviews", "Roadmap facilitation", "Vendor selection", "Team enablement", ], image:
      "/images/consulting.jpg", imageAlt: "Team collaborating on product strategy", }, ];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const marqueeWords = [
  "Agentic AI", "Cloud", "Web Platforms", "DevOps", "Automation", "Machine Learning", "Mobile", "Security", "Data", "Integrations", "Product Design", "Agent Workflows", ];

export const testimonials = [
  {
    quote:
      "Edev turned a scattered set of tools into an agent workflow our ops team actually trusts. Delivery was precise and calm.", name: "Ayesha Rahman", role: "Head of Operations", company: "Northline Logistics", }, {
    quote:
      "The cloud rebuild cut our release risk dramatically. Observability finally matches the pace we ship at.", name: "Daniel Okoye", role: "CTO", company: "Harbor Metrics", }, {
    quote:
      "Design and engineering moved as one. The product feels premium without becoming fragile or overbuilt.", name: "Maya Chen", role: "Product Lead", company: "Lumen Studio", }, {
    quote:
      "Their automation work removed an entire class of manual handoffs. We measure the hours returned every week.", name: "Omar Siddiqui", role: "Founder", company: "Volt Retail", }, ];
