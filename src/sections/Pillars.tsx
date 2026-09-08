import { pillars } from "../lib/data";
import { Section } from "../components/ui/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "../components/ui/Reveal";
import { Satellite, Footprints, TrendingUp } from "lucide-react";

const icons = {
  satellite: Satellite,
  footprints: Footprints,
  "trending-up": TrendingUp,
} as const;

export function Pillars() {
  return (
    <Section id="platform">
      <SectionHeading id="platform-heading" title={pillars.title} lede={pillars.lede} />
      <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
        {pillars.items.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <RevealItem key={item.title}>
              <div className="group relative flex h-full flex-col pt-6 md:pt-0">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="absolute top-6 -left-5 hidden h-[calc(100%-3rem)] w-px bg-ink/10 md:block lg:-left-6"
                  />
                )}
                <div className="flex size-12 items-center justify-center rounded-full bg-paper-deep text-ink transition-transform duration-300 group-hover:rotate-6">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-clay uppercase">
                  {item.eye}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/65">{item.body}</p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
