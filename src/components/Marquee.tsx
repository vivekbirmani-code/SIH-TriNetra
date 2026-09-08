import { capitals } from "../lib/data";
import { cn } from "../lib/cn";

/** One-use typographic divider — the corridor of state capitals.
 *  Decorative: aria-hidden, killed under reduced motion. */
export function Marquee() {
  const items = [...capitals, ...capitals];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-ink/10 bg-paper py-8 select-none">
      <div className="flex w-max animate-marquee items-baseline whitespace-nowrap">
        {items.map((city, i) => (
          <span
            key={`${city}-${i}`}
            className={cn(
              "mx-6 text-5xl font-semibold tracking-[-0.02em] md:text-7xl",
              i % 2 === 0
                ? "text-ink/10"
                : "text-transparent [-webkit-text-stroke:1px_rgba(22,35,58,0.22)]",
            )}
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}
