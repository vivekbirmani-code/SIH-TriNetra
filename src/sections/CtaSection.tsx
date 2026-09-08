import { motion } from "motion/react";
import { cta } from "../lib/data";
import { Button } from "../components/ui/Button";
import { Eyebrow } from "../components/ui/Eyebrow";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-ink-deep px-6 py-32 text-paper lg:py-40"
    >
      {/* hero-map echo: a clay route drifting under the heading at low opacity */}
      <svg
        viewBox="0 0 900 320"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-20 260 C 180 220, 240 120, 430 140 S 720 240, 940 90"
          fill="none"
          stroke="var(--color-clay)"
          strokeWidth="3"
          strokeDasharray="10 12"
          strokeLinecap="round"
        />
        <circle cx="430" cy="140" r="7" fill="var(--color-clay)" />
        <circle cx="940" cy="90" r="7" fill="none" stroke="var(--color-clay)" strokeWidth="2.5" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <Eyebrow dark dot="clay">{cta.eyebrow}</Eyebrow>
        <h2
          id="cta-heading"
          className="mt-5 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.02em]"
        >
          {cta.title}
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper/65">{cta.lede}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="clay" href={cta.primary.href}>
            {cta.primary.label}
          </Button>
          <Button variant="ghost" href={cta.secondary.href}>
            {cta.secondary.label}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
