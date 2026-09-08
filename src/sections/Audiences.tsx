import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { audiences } from "../lib/data";
import { Section } from "../components/ui/Section";
import { RevealGroup } from "../components/ui/Reveal";
import { revealItem } from "../lib/motion";

export function Audiences() {
  return (
    <Section id="impact" className="bg-paper-deep/50">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2
              id="impact-heading"
              className="max-w-[420px] text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-ink"
            >
              {audiences.title}
            </h2>
            <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink/70">
              {audiences.lede}
            </p>
          </div>
        </div>
        <RevealGroup className="lg:col-span-7">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {audiences.items.map((item) => (
              <motion.li
                variants={revealItem}
                key={item.name}
                className="group -mx-4 flex items-center justify-between gap-6 px-4 py-7 transition-colors duration-300 hover:bg-white/60"
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink/60">
                    {item.line}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="shrink-0 text-clay opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </motion.li>
            ))}
          </ul>
        </RevealGroup>
      </div>
    </Section>
  );
}
