import Link from "next/link";
import type { ReactNode } from "react";

type GlassButtonProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

const sizeClass = {
  sm: "glass-btn-sm", md: "", lg: "glass-btn-lg", };

function isExternalHref(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  );
}

export function GlassButton({
  children, className = "", size = "md", href, type = "button", disabled, onClick, }: GlassButtonProps) {
  const classes = `glass-btn ${sizeClass[size]} ${className}`.trim();

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
