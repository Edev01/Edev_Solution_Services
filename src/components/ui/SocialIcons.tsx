import { siteConfig } from "@/lib/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3.1l.9-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 12 8.9a3.1 3.1 0 0 1 0 6.2z" />
      <path d="M17.5 6.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
      <path d="M12 3.5c2.3 0 2.6 0 3.5.1.9.1 1.5.2 2 .4.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.5.4 1.1.4 2 .1.9.1 1.2.1 3.5s0 2.6-.1 3.5c-.1.9-.2 1.5-.4 2-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.5.2-1.1.4-2 .4-.9.1-1.2.1-3.5.1s-2.6 0-3.5-.1c-.9-.1-1.5-.2-2-.4-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.5-.4-1.1-.4-2-.1-.9-.1-1.2-.1-3.5s0-2.6.1-3.5c.1-.9.2-1.5.4-2 .2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .5-.2 1.1-.4 2-.4.9-.1 1.2-.1 3.5-.1zm0-1.5c-2.3 0-2.6 0-3.6.1-1 .1-1.7.2-2.3.5-.7.2-1.2.6-1.8 1.1-.5.5-.9 1.1-1.1 1.8-.2.6-.4 1.3-.5 2.3-.1 1-.1 1.3-.1 3.6s0 2.6.1 3.6c.1 1 .2 1.7.5 2.3.2.7.6 1.2 1.1 1.8.5.5 1.1.9 1.8 1.1.6.2 1.3.4 2.3.5 1 .1 1.3.1 3.6.1s2.6 0 3.6-.1c1-.1 1.7-.2 2.3-.5.7-.2 1.2-.6 1.8-1.1.5-.5.9-1.1 1.1-1.8.2-.6.4-1.3.5-2.3.1-1 .1-1.3.1-3.6s0-2.6-.1-3.6c-.1-1-.2-1.7-.5-2.3-.2-.7-.6-1.2-1.1-1.8-.5-.5-1.1-.9-1.8-1.1-.6-.2-1.3-.4-2.3-.5-1-.1-1.3-.1-3.6-.1z" />
    </svg>
  );
}

export function SocialIcons({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const box =
    size === "sm"
      ? "h-10 w-10"
      : "h-11 w-11";
  const icon = size === "sm" ? "h-4 w-4" : "h-[1.15rem] w-[1.15rem]";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={siteConfig.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={`${box} inline-flex items-center justify-center border border-line bg-panel text-fog transition-colors hover:border-lilac hover:bg-signal hover:text-paper`}
      >
        <FacebookIcon className={icon} />
      </a>
      <a
        href={siteConfig.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={`${box} inline-flex items-center justify-center border border-line bg-panel text-fog transition-colors hover:border-lilac hover:bg-signal hover:text-paper`}
      >
        <InstagramIcon className={icon} />
      </a>
    </div>
  );
}
