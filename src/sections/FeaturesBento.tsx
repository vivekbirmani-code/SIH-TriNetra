import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Route, Truck, ShieldCheck, Siren, Database } from "lucide-react";
import { features } from "../lib/data";
import { Section } from "../components/ui/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "../components/ui/Reveal";
import { StatCounter } from "../components/ui/StatCounter";

const tile =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-[3px] hover:shadow-float";

function TileTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[17px] font-semibold tracking-tight text-ink">{children}</h3>;
}

function TileBody({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-sm leading-relaxed text-ink/65">{children}</p>;
}

/** Arc gauge sweeping to the score when it enters view. */
function ScoreGauge({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const R = 84;
  return (
    <div ref={ref} className="relative mt-2 flex flex-col items-center">
      <svg width="220" height="126" viewBox="0 0 220 126" aria-hidden="true">
        <path
          d={`M ${110 - R} 112 A ${R} ${R} 0 0 1 ${110 + R} 112`}
          fill="none"
          stroke="var(--color-paper-deep)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${110 - R} 112 A ${R} ${R} 0 0 1 ${110 + R} 112`}
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: reduced ? 0.74 : 0 }}
          animate={inView ? { pathLength: 0.74 } : undefined}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="text-5xl font-semibold tracking-tight text-ink">
          <StatCounter value={value} />
        </span>
        <span className="mt-1 font-mono text-[10px] tracking-[0.16em] text-ink/45 uppercase">
          Accessibility — NH-6 Jowai
        </span>
      </div>
    </div>
  );
}

export function FeaturesBento() {
  const f = features;
  const reduced = useReducedMotion() ?? false;
  return (
    <Section id="features">
      <SectionHeading id="features-heading" eyebrow={f.eyebrow} title={f.title} />
      <RevealGroup className="mt-14 grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
        {/* A — score gauge */}
        <RevealItem className="md:col-span-2 lg:col-span-5 lg:row-span-2">
          <div className={tile + " h-full"}>
            <TileTitle>{f.score.title}</TileTitle>
            <TileBody>{f.score.body}</TileBody>
            <ScoreGauge value={f.score.display} />
            <div className="mt-auto flex items-center gap-4 pt-6 font-mono text-[10px] tracking-[0.12em] text-ink/40 uppercase">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-moss" /> 70+ go
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-clay" /> below 55 reroute
              </span>
            </div>
          </div>
        </RevealItem>

        {/* B — alternate routes */}
        <RevealItem className="lg:col-span-4">
          <div className={tile + " h-full"}>
            <Route size={20} strokeWidth={1.75} className="text-ink" aria-hidden />
            <div className="mt-5">
              <TileTitle>{f.alt.title}</TileTitle>
              <TileBody>{f.alt.body}</TileBody>
            </div>
            <svg viewBox="0 0 200 34" className="mt-auto pt-4" aria-hidden="true">
              <path d="M6 26 H 118" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <path d="M118 26 C 138 26, 146 8, 172 8 H 194" stroke="var(--color-clay)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M118 26 H 194" stroke="var(--color-moss)" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
              <circle cx="6" cy="26" r="3.5" fill="var(--color-ink)" />
              <circle cx="194" cy="8" r="3.5" fill="var(--color-clay)" />
              <circle cx="194" cy="26" r="3.5" fill="var(--color-moss)" />
            </svg>
          </div>
        </RevealItem>

        {/* C — convoy tracking */}
        <RevealItem className="lg:col-span-3">
          <div className={tile + " h-full"}>
            <Truck size={20} strokeWidth={1.75} className="text-ink" aria-hidden />
            <div className="mt-5">
              <TileTitle>{f.convoy.title}</TileTitle>
              <TileBody>{f.convoy.body}</TileBody>
            </div>
          </div>
        </RevealItem>

        {/* D — offline SMS */}
        <RevealItem className="lg:col-span-3">
          <div className={tile + " h-full"}>
            <div className="mt-1">
              <TileTitle>{f.offline.title}</TileTitle>
            </div>
            <motion.div
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              whileHover={reduced ? undefined : { rotate: -1.2, y: -2 }}
              className="mt-5 rounded-2xl rounded-bl-md bg-ink p-4 shadow-card"
            >
              <p className="font-mono text-[10px] tracking-[0.12em] text-paper/45 uppercase">
                SMS — +91 ••••• 42190
              </p>
              <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-paper/85">
                {f.offline.sms}
              </p>
            </motion.div>
            <TileBody>{f.offline.body}</TileBody>
          </div>
        </RevealItem>

        {/* E — trust scoring */}
        <RevealItem className="lg:col-span-4">
          <div className={tile + " h-full"}>
            <ShieldCheck size={20} strokeWidth={1.75} className="text-ink" aria-hidden />
            <div className="mt-5">
              <TileTitle>{f.trust.title}</TileTitle>
              <TileBody>{f.trust.body}</TileBody>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-5">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="h-1.5 flex-1 rounded-full"
                  style={{
                    background:
                      i < 4 ? "var(--color-moss)" : "var(--color-paper-deep)",
                    opacity: i < 4 ? 0.75 : 1,
                  }}
                />
              ))}
              <span className="ml-2 font-mono text-[10px] tracking-[0.12em] text-ink/45 uppercase">
                Trust 4.2 / 5
              </span>
            </div>
          </div>
        </RevealItem>

        {/* F — disaster-ready */}
        <RevealItem className="md:col-span-2 lg:col-span-7">
          <div className={tile + " h-full md:flex-row md:items-center md:gap-10"}>
            <div className="md:flex-1">
              <Siren size={20} strokeWidth={1.75} className="text-ink" aria-hidden />
              <div className="mt-5">
                <TileTitle>{f.district.title}</TileTitle>
                <TileBody>{f.district.body}</TileBody>
              </div>
            </div>
            <div className="mt-6 grid flex-1 grid-cols-3 gap-2 md:mt-0">
              {[
                { k: "RISK", v: "3 corridors" },
                { k: "CONVOYS", v: "12 live" },
                { k: "REPORTS", v: "48 today" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl bg-paper-deep/70 px-3.5 py-3 text-center">
                  <p className="text-[15px] font-semibold text-ink">{s.v}</p>
                  <p className="mt-1 font-mono text-[9px] tracking-[0.14em] text-ink/45 uppercase">
                    {s.k}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealItem>

        {/* G — open data sources */}
        <RevealItem className="md:col-span-2 lg:col-span-5">
          <div className={tile + " h-full"}>
            <Database size={20} strokeWidth={1.75} className="text-ink" aria-hidden />
            <div className="mt-5">
              <TileTitle>Open data, not new hardware</TileTitle>
              <TileBody>
                Every core feed is already public — no new satellites, sensors or sanction needed to
                light up a district.
              </TileBody>
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {["ISRO Bhuvan", "IMD", "PMGSY", "Sachet NDMA", "data.gov.in"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-ink/55 uppercase"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
