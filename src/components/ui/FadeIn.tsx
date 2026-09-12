import type { ReactNode } from "react";

/** Pass-through wrapper kept for API compatibility, no scroll animation cost. */
export function FadeIn({
  children, className = "", }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}
