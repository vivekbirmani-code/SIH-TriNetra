import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { hero } from "../lib/data";
import { heroGroup, heroItem } from "../lib/motion";
import { Button } from "../components/ui/Button";
import { NEMap } from "../components/NEMap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const drift = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <section ref={ref} id="top" className="bg-paper">
      <motion.div
        style={reduced ? undefined : { opacity: fade, y: drift }}
        className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 pt-32 pb-16 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-40 lg:pb-24"
      >
        <motion.div
          variants={heroGroup}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7"
        >
          <motion.p
            variants={heroItem}
            className="font-mono text-[11px] font-medium tracking-[0.14em] text-ink/55 uppercase"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-5 max-w-[13ch] text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-ink"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink/70"
          >
            {hero.lede}
          </motion.p>
          <motion.div variants={heroItem} className="mt-9 flex flex-wrap gap-3">
            <Button variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Button>
            <Button variant="outline" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
          <motion.ul
            variants={heroItem}
            className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-2.5 font-mono text-[10.5px] tracking-[0.1em] text-ink/45 uppercase"
          >
            {hero.meta.map((m, i) => (
              <li key={m} className="flex items-center gap-7">
                {i > 0 && <span aria-hidden className="h-3 w-px bg-ink/15" />}
                <span>{m}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <NEMap scrollYProgress={scrollYProgress} />
        </div>
      </motion.div>
    </section>
  );
}
