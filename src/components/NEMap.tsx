import { motion, useReducedMotion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { GlassCard } from "./ui/GlassCard";
import { easeOut } from "../lib/motion";
import { hero } from "../lib/data";

/**
 * Hero map — "The Advised Corridor". One sentence in geography:
 * two roads from Guwahati to Silchar, the hill road is failing, TriNetra advises the other.
 * Load sequence: land fades → advised route draws → endpoints pop →
 * avoided route + risk ticks → one advisory readout settles. Then everything is still.
 * The SVG is decorative (aria-hidden); all text is HTML for crispness and a11y.
 * Scroll adds only a two-rate parallax — terrain settles under, intelligence floats over.
 */

const { map } = hero;

const ORIGIN = { x: 245, y: 240 };
const FORK = { x: 272, y: 292 };
const DEST = { x: 386, y: 482 };

/** Guwahati → fork → east through the valley — the advised corridor (draws itself on load). */
const ADVISED = `M ${ORIGIN.x} ${ORIGIN.y} C 255 262, 264 278, ${FORK.x} ${FORK.y} C 330 310, 386 344, 396 402 C 402 438, 396 462, ${DEST.x} ${DEST.y}`;
/** Guwahati → fork → direct through the hills — shorter, currently failing. */
const AVOIDED = `M ${ORIGIN.x} ${ORIGIN.y} C 255 262, 264 278, ${FORK.x} ${FORK.y} C 258 344, 284 402, 322 434 C 344 452, 368 468, ${DEST.x} ${DEST.y}`;

/** Inspection marks on the hill section of the avoided road. */
const RISK_TICKS = [
  { x1: 266.3, y1: 348.8, x2: 275.7, y2: 345.2 },
  { x1: 272.8, y1: 372.3, x2: 282.2, y2: 368.7 },
  { x1: 285.7, y1: 398.6, x2: 294.3, y2: 393.4 },
];

function Fade({
  delay,
  reduced,
  children,
}: {
  delay: number;
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      initial={{ opacity: reduced ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: reduced ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.g>
  );
}

function Dot({
  cx,
  cy,
  r,
  delay,
  reduced,
  fill,
  fillOpacity = 1,
}: {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  reduced: boolean;
  fill: string;
  fillOpacity?: number;
}) {
  return (
    <motion.g
      initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 17, delay: reduced ? 0 : delay }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle cx={cx} cy={cy} r={r} fill={fill} fillOpacity={fillOpacity} />
    </motion.g>
  );
}

export function NEMap({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const reduced = useReducedMotion() ?? false;

  // Two-rate parallax: terrain settles under, intelligence floats over.
  const groundY = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const routeY = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <div className="relative aspect-square w-full max-w-[520px]">
      <svg
        viewBox="0 50 560 560"
        aria-hidden="true"
        focusable="false"
        className="relative h-full w-full"
      >
        <defs>
          {/* the region's northern edge dissolves into the paper */}
          <linearGradient id="ne-fade-grad" x1="0" y1="50" x2="0" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#000" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <mask id="ne-fade-mask">
            <rect x="0" y="50" width="560" height="560" fill="url(#ne-fade-grad)" />
          </mask>
        </defs>

        {/* — Ground: terrain — */}
        <motion.g style={reduced ? undefined : { y: groundY }} mask="url(#ne-fade-mask)">
          <Fade delay={0} reduced={reduced}>
            <path
              d="M 70 205 C 90 175, 130 160, 160 168 C 158 138, 166 108, 172 92 C 186 96, 194 122, 182 142 C 224 122, 264 102, 312 90 C 362 72, 440 60, 500 85 C 542 106, 556 142, 530 170 C 506 196, 470 200, 456 226 C 470 260, 466 300, 446 336 C 430 366, 402 380, 392 414 C 386 460, 380 520, 390 574 C 394 598, 372 602, 362 578 C 350 522, 352 462, 340 420 C 326 386, 300 370, 290 340 C 276 362, 250 380, 245 420 C 240 456, 226 480, 205 470 C 190 462, 196 430, 186 400 C 172 370, 150 350, 148 320 C 130 310, 110 290, 112 265 C 100 245, 80 235, 70 205 Z"
              fill="var(--color-ink)"
              fillOpacity="0.08"
              stroke="var(--color-ink)"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* internal boundaries — quiet suggestions, not cartography */}
            <g fill="none" stroke="var(--color-ink)" strokeOpacity="0.13" strokeWidth="1.2">
              <path d="M 182 142 C 240 168, 330 190, 452 205 C 470 200, 500 196, 530 170" />
              <path d="M 148 320 C 200 330, 260 320, 290 340 C 330 340, 400 330, 446 336" />
            </g>
            {/* the Brahmaputra — the detail that says "this region" */}
            <path
              d="M 78 216 C 150 202, 210 242, 290 228 S 430 196, 520 178"
              fill="none"
              stroke="var(--color-ink)"
              strokeOpacity="0.14"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </Fade>
        </motion.g>

        {/* — Foreground: the decision — */}
        <motion.g style={reduced ? undefined : { y: routeY }}>
          {/* the hill road — shorter, failing; quiet and dashed */}
          <Fade delay={1.5} reduced={reduced}>
            <path
              d={AVOIDED}
              fill="none"
              stroke="var(--color-ink)"
              strokeOpacity="0.32"
              strokeWidth="1.8"
              strokeDasharray="5 7"
              strokeLinecap="round"
            />
          </Fade>

          {/* risk lives on the road it affects */}
          {RISK_TICKS.map((t, i) => (
            <Fade key={i} delay={1.55 + i * 0.08} reduced={reduced}>
              <line {...t} stroke="var(--color-clay)" strokeWidth="2" strokeLinecap="round" />
            </Fade>
          ))}

          {/* the advised corridor — the one thing the eye should find first */}
          <motion.path
            d={ADVISED}
            fill="none"
            stroke="var(--color-clay)"
            strokeWidth="3.2"
            strokeLinecap="round"
            initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0.001 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.9, delay: reduced ? 0 : 0.5, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.01, delay: reduced ? 0 : 0.5 },
            }}
          />

          <Dot cx={ORIGIN.x} cy={ORIGIN.y} r={5} delay={0.5} reduced={reduced} fill="var(--color-ink)" fillOpacity={0.85} />
          <Dot cx={DEST.x} cy={DEST.y} r={5.5} delay={1.4} reduced={reduced} fill="var(--color-clay)" />

          {/* arrival — one ripple, once */}
          <motion.circle
            cx={DEST.x}
            cy={DEST.y}
            r="8"
            fill="none"
            stroke="var(--color-clay)"
            strokeWidth="1.5"
            initial={reduced ? { opacity: 0 } : { opacity: 0.7, scale: 0.3 }}
            animate={reduced ? { opacity: 0 } : { opacity: 0, scale: 2.2 }}
            transition={{ duration: 0.9, delay: reduced ? 0 : 1.4, ease: "easeOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </motion.g>
      </svg>

      {/* — HTML layer: every word on the map — */}
      <motion.div
        style={reduced ? undefined : { y: routeY }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.p
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 0.55, ease: "easeOut" }}
          className="absolute top-[30.5%] left-[43.75%] -translate-x-1/2 font-mono text-[9px] tracking-[0.16em] text-ink/60 uppercase"
        >
          {map.origin}
        </motion.p>
        <motion.p
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 1.45, ease: "easeOut" }}
          className="absolute top-[73.5%] left-[75%] font-mono text-[9px] tracking-[0.16em] text-ink/65 uppercase"
        >
          {map.destination}
        </motion.p>
        <motion.p
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 1.66, ease: "easeOut" }}
          className="absolute top-[57.5%] left-[45%] hidden -translate-x-full font-mono text-[8.5px] tracking-[0.14em] text-ink/75 uppercase min-[1100px]:block"
        >
          {map.risk}
        </motion.p>

        {/* the verdict — the only floating element on the map */}
        <motion.div
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.45, ease: easeOut, delay: 1.7 }}
          className="absolute right-[2%] bottom-[4.5%] left-[24%]"
        >
          <GlassCard className="px-4 py-3">
            <p className="font-mono text-[8.5px] tracking-[0.16em] text-ink/50 uppercase sm:text-[9px]">
              {map.advisory.label}
              <span className="hidden xl:inline">
                {" "}
                — {map.origin} → {map.destination}
              </span>
            </p>
            <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
              <span className="text-[26px] leading-none font-semibold tracking-tight text-moss">
                {map.advisory.score}
              </span>
              <span className="font-mono text-[8.5px] tracking-[0.14em] text-ink/45 uppercase sm:text-[9px]">
                {map.advisory.unit}
              </span>
              <span className="font-mono text-[8.5px] tracking-[0.12em] text-ink/60 uppercase sm:text-[9px]">
                {map.advisory.detail}
              </span>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
