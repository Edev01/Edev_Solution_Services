import DOMPurify from "isomorphic-dompurify";

const HTML_TAG_RE = /<\/?[a-z][\s\S]*>/i;

/** True when content looks like stored rich HTML (from the editor). */
export function isRichHtml(content: string) {
  return HTML_TAG_RE.test(content);
}

/** Strip tags for excerpts, SEO, and word counts. */
export function plainTextFromContent(content: string) {
  if (!content) return "";
  if (!isRichHtml(content)) return content;
  return content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h[1-6]|li|div|blockquote)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** Sanitize HTML for safe public rendering. */
export function sanitizeBlogHtml(content: string) {
  return DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "code",
      "pre",
      "hr",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
  });
}

/** Legacy plain posts: split on blank lines into paragraphs. */
export function splitPlainParagraphs(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\n/g, " ").trim())
    .filter(Boolean);
}
