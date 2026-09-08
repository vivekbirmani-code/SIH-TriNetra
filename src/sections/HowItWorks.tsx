import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { steps } from "../lib/data";
import { Section } from "../components/ui/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "../components/ui/Reveal";

/** Step markers sit on a horizontal track whose clay fill is drawn by scroll.
 *  Each dot pops as the fill reaches its position (25 / 50 / 75 / 100%). */
function StepDot({ progress, at }: { progress: ReturnType<typeof useSpring>; at: number }) {
  const scale = useTransform(progress, [at - 0.08, at], [0.4, 1]);
  const smoothed = useSpring(scale, { stiffness: 260, damping: 18 });
  return (
    <motion.span
      aria-hidden
      style={{ scale: smoothed }}
      className="z-10 flex size-4 items-center justify-center rounded-full border-[2.5px] border-clay bg-paper"
    >
      <span className="size-1.5 rounded-full bg-clay" />
    </motion.span>
  );
}

export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26 });
  const scaleX = useTransform(fill, [0, 1], [0, 1]);

  return (
    <Section id="how" className="bg-paper-deep/50">
      <SectionHeading id="how-heading" title={steps.title} />
      <div ref={trackRef} className="mt-16">
        {/* scroll-drawn track (lg+) */}
        <div aria-hidden className="relative mb-10 hidden h-0.5 bg-ink/12 lg:block">
          <motion.div
            className="absolute inset-0 origin-left bg-clay"
            style={{ scaleX: reduced ? 1 : scaleX }}
          />
          <div className="absolute inset-0 -top-[6px] flex justify-between">
            {steps.items.map((_, i) => (
              <StepDot key={i} progress={fill} at={(i + 1) / steps.items.length} />
            ))}
          </div>
        </div>

        <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.items.map((step) => (
            <RevealItem key={step.num} className="group">
              <div className="border-l-2 border-ink/12 pl-5 transition-colors duration-300 group-hover:border-clay lg:border-l-0 lg:pl-0">
                <p className="font-mono text-[13px] font-medium tracking-[0.1em] text-clay">
                  {step.num}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{step.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{step.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
