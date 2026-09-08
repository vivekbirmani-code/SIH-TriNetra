import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Check, TriangleAlert } from "lucide-react";
import { consoleSection } from "../lib/data";
import { Section } from "../components/ui/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ScoreChip } from "../components/ui/ScoreChip";
import { MiniMap } from "../components/MiniMap";

export function ConsolePreview() {
  const c = consoleSection;
  const mockRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: mockRef,
    offset: ["start end", "center 0.55"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const rotateX = useTransform(smooth, [0, 1], [8, 0]);
  const y = useTransform(smooth, [0, 1], [60, 0]);
  const scale = useTransform(smooth, [0, 1], [0.97, 1]);
  const opacity = useTransform(smooth, [0, 0.35], [0, 1]);

  return (
    <Section id="console" dark className="relative overflow-hidden">
      {/* quiet vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 60% at 70% 38%, rgba(30,45,73,0.9) 0%, rgba(14,27,51,0) 70%)",
        }}
      />
      <div className="relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="console-heading" eyebrow={c.eyebrow} title={c.title} lede={c.lede} dark />
          <ul className="mt-8 flex flex-col gap-3.5">
            {c.checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-moss" aria-hidden />
                <span className="text-sm text-paper/75">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8" style={{ perspective: 1200 }}>
          <motion.div
            ref={mockRef}
            style={reduced ? undefined : { rotateX, y, scale, opacity }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-ink-raise shadow-float"
          >
            {/* header bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <p className="font-mono text-[11px] tracking-[0.12em] text-paper/55 uppercase">
                {c.mock.header}
              </p>
              <span className="inline-flex items-center gap-2 rounded-full bg-moss/15 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-moss uppercase">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-moss opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-moss" />
                </span>
                {c.mock.live}
              </span>
            </div>

            {/* body: routes + minimap */}
            <div className="grid gap-px bg-white/5 md:grid-cols-5">
              <ul className="flex flex-col divide-y divide-white/5 bg-ink-raise md:col-span-3">
                {c.mock.routes.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-white/5">
                    <div className="min-w-0">
                      <p className="font-mono text-[12px] font-medium tracking-wide text-paper/85">
                        {r.id}
                      </p>
                      <p className="mt-0.5 truncate text-[13px] text-paper/50">{r.path}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <ScoreChip score={r.score} />
                      <p
                        className={`font-mono text-[10px] tracking-[0.1em] uppercase ${
                          r.tone === "clay" ? "text-clay-bright" : "text-moss"
                        }`}
                      >
                        {r.delta}
                      </p>
                    </div>
                  </li>
                ))}
                <li className="bg-ink-raise px-5 py-3.5 md:hidden">
                  <MiniMap compact />
                </li>
              </ul>
              <div className="hidden bg-ink-raise md:col-span-2 md:block">
                <MiniMap />
              </div>
            </div>

            {/* alert bar */}
            <div className="flex items-center gap-3 border-t border-white/10 bg-clay/10 px-5 py-3.5">
              <TriangleAlert size={15} className="shrink-0 text-clay-bright" aria-hidden />
              <p className="animate-breathe font-mono text-[11px] tracking-[0.1em] text-clay-bright uppercase">
                {c.mock.alert}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
