import { cn } from "../../lib/cn";

/** Mono micro-label. Reserved for data contexts and section signposts —
 *  used sparingly, never as decoration on every heading. */
export function Eyebrow({
  children,
  dark = false,
  dot,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  dot?: "clay" | "moss";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.14em] uppercase",
        dark ? "text-clay-bright" : "text-ink/55",
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className={cn("size-1.5 rounded-full", dot === "clay" ? "bg-clay" : "bg-moss")}
        />
      )}
      {children}
    </span>
  );
}
