import { team } from "../lib/data";
import { Section } from "../components/ui/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "../components/ui/Reveal";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function Team() {
  return (
    <Section id="team">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="team-heading" eyebrow={team.eyebrow} title={team.title} lede={team.lede} />
      </div>
      <RevealGroup className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-6">
        {team.members.map((member) => (
          <RevealItem key={member.name} className="bg-paper">
            <div className="flex h-full flex-col gap-3.5 p-5">
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-full bg-paper-deep font-mono text-[11px] font-medium tracking-wide text-ink/65"
              >
                {initialsOf(member.name)}
              </span>
              <div>
                <p className="text-sm leading-snug font-semibold text-ink">{member.name}</p>
                <p className="mt-1.5 font-mono text-[9.5px] tracking-[0.12em] text-ink/45 uppercase">
                  {member.role}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
