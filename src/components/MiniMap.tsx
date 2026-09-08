import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";

/** Console mini-map — the hero map's language reduced to one route
 *  and a convoy dot that crawls along it. */
export function MiniMap({ compact = false }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        compact ? "aspect-[16/9]" : "min-h-[240px]",
      )}
    >
      <svg
        viewBox="0 0 320 240"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        {/* faint grid */}
        <g stroke="rgba(232,236,244,0.06)" strokeWidth="1">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="240" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40} />
          ))}
        </g>
        {/* river */}
        <path
          d="M-10 70 C 60 60, 90 95, 150 88 S 260 60, 330 72"
          stroke="rgba(232,236,244,0.1)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        {/* main route */}
        <path
          d="M36 196 C 90 170, 100 130, 150 118 S 240 96, 284 52"
          stroke="var(--color-clay)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* blocked segment marker */}
        <g>
          <circle cx="150" cy="118" r="5" fill="var(--color-clay)" />
          <circle cx="150" cy="118" r="5" fill="none" stroke="var(--color-clay)" strokeWidth="1.5" opacity="0.5" className="ping-ring animate-ping-ring" />
        </g>
        {/* alternate branch */}
        <path
          d="M150 118 C 170 140, 210 168, 252 196"
          stroke="var(--color-moss)"
          strokeWidth="2"
          strokeDasharray="5 6"
          fill="none"
          strokeLinecap="round"
        />
        {/* endpoints */}
        <circle cx="36" cy="196" r="4" fill="#E8ECF4" />
        <circle cx="284" cy="52" r="4.5" fill="none" stroke="#E8ECF4" strokeWidth="1.5" />
        <circle cx="284" cy="52" r="1.8" fill="#E8ECF4" />
        <circle cx="252" cy="196" r="3.5" fill="var(--color-moss)" />
      </svg>

      {/* convoy dot crawling the main route */}
      {!reduced && (
        <motion.span
          className="absolute size-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ offsetPath: "path('M36 196 C 90 170, 100 130, 150 118 S 240 96, 284 52')", offsetRotate: "0deg" }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
      )}
      <p className="absolute right-3 bottom-2.5 font-mono text-[9px] tracking-[0.12em] text-paper/35 uppercase">
        Route graph — live
      </p>
    </div>
  );
}
