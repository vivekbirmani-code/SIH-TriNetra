import { cn } from "../../lib/cn";

/** Frosted card — light (over the hero map) or dark (console surfaces). */
export function GlassCard({
  dark = false,
  className,
  children,
}: {
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border shadow-float backdrop-blur-md",
        dark
          ? "border-white/10 bg-ink-raise/85"
          : "border-white/60 bg-white/85",
        className,
      )}
    >
      {children}
    </div>
  );
}
