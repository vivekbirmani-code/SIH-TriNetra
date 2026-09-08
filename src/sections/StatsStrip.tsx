import { stats } from "../lib/data";
import { StatCounter } from "../components/ui/StatCounter";

export function StatsStrip() {
  return (
    <section aria-label="Platform statistics" className="border-y border-ink/10 bg-paper">
      <dl className="mx-auto grid max-w-[1200px] grid-cols-2 divide-ink/10 px-6 py-14 md:grid-cols-4 md:divide-x md:px-8">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-2 px-6 first:pl-0 max-md:py-4 ${
              i >= 2 ? "max-md:border-t max-md:border-ink/10" : ""
            }`}
          >
            <dt className="order-2 font-mono text-[11px] tracking-[0.12em] text-ink/50 uppercase">
              {s.label}
            </dt>
            <dd className="order-1 text-5xl font-semibold tracking-tight text-ink md:text-6xl">
              <StatCounter value={s.value} suffix={s.suffix} />
            </dd>
            {s.note && <dd className="order-3 text-xs text-ink/45">{s.note}</dd>}
          </div>
        ))}
      </dl>
    </section>
  );
}
