import { cn } from "../lib/cn";

/** Logo mark: three sight-lines converging on one point —
 *  TriNetra's three data sources becoming one picture. */
export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* triangle of sources */}
        <circle cx="13" cy="4.5" r="2.2" fill="currentColor" opacity="0.9" />
        <circle cx="5" cy="18" r="2.2" fill="currentColor" opacity="0.9" />
        <circle cx="21" cy="18" r="2.2" fill="currentColor" opacity="0.9" />
        {/* converging sight-lines */}
        <path
          d="M13 4.5 13 13 M5 18 13 13 M21 18 13 13"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.45"
          strokeLinecap="round"
        />
        {/* the one clear point */}
        <circle cx="13" cy="13" r="3.4" fill="var(--color-clay)" />
        <circle cx="13" cy="13" r="1.4" fill="white" />
      </svg>
      <span
        className={cn(
          "text-[17px] font-semibold tracking-tight",
          dark ? "text-paper" : "text-ink",
        )}
      >
        TriNetra
        <span className="ml-1.5 align-middle font-mono text-[10px] font-medium tracking-[0.18em] text-clay">
          NER
        </span>
      </span>
    </span>
  );
}
