import { footer, nav } from "../lib/data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-deep text-paper">
      <div className="mx-auto max-w-[1200px] px-6 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo dark />
            <p className="mt-4 text-sm leading-relaxed text-paper/60">{footer.tagline}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center py-1.5 text-sm font-medium text-paper/70 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 font-mono text-[11px] tracking-[0.08em] text-paper/40">
          <p>{footer.dataCredits}</p>
          <p>{footer.stackCredits}</p>
          <p className="mt-2 text-paper/50">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
