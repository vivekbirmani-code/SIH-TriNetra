import { motion } from "motion/react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "clay" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-raise",
  clay: "bg-clay text-white hover:bg-clay-deep",
  outline: "border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/[0.03]",
  ghost: "border border-white/25 text-paper hover:border-white/60 hover:bg-white/[0.06]",
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
}: {
  variant?: Variant;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200",
        variants[variant],
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
