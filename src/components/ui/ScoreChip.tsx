import { cn } from "../../lib/cn";

function bandOf(score: number) {
  if (score >= 70) return { word: "GOOD", tone: "moss" as const };
  if (score >= 55) return { word: "FAIR", tone: "moss" as const };
  return { word: "LOW", tone: "clay" as const };
}

/** Mono score chip — the product's one artifact, rendered consistently. */
export function ScoreChip({ score, className }: { score: number; className?: string }) {
  const band = bandOf(score);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide",
        band.tone === "moss"
          ? "bg-moss-soft text-moss"
          : "bg-clay-soft text-clay-deep",
        className,
      )}
    >
      <span className="font-semibold">{score}</span>
      <span aria-hidden>·</span>
      <span>{band.word}</span>
    </span>
  );
}
