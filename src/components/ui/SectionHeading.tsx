import { cn } from "../../lib/cn";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  dark = false,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[640px]", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "mt-4 text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em]",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed",
            dark ? "text-paper/65" : "text-ink/70",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
