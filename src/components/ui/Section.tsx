import { cn } from "../../lib/cn";

/** Anchor + padding rhythm + container. `dark` swaps the section's surface. */
export function Section({
  id,
  dark = false,
  className,
  children,
}: {
  id?: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={cn(
        "scroll-mt-24",
        dark ? "bg-ink py-28 text-paper lg:py-36" : "bg-paper py-24 lg:py-32",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">{children}</div>
    </section>
  );
}
