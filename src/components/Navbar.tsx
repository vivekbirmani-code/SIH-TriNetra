import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "../lib/data";
import { cn } from "../lib/cn";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy — the section occupying the upper-middle band of the viewport wins
  useEffect(() => {
    const sections = nav.links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((s): s is HTMLElement => s !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-6 px-6 transition-all duration-300 md:px-8",
            scrolled
              ? "mt-3 max-w-[1160px] rounded-full border border-white/60 bg-white/85 py-2.5 pr-2.5 pl-6 shadow-float backdrop-blur-md"
              : "max-w-[1200px] bg-transparent py-5",
          )}
        >
          <a href="#top" aria-label="TriNetra-NER — back to top">
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative inline-flex items-center py-1.5 text-sm font-medium transition-colors hover:text-ink",
                    isActive ? "text-ink" : "text-ink/70",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-clay transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={nav.cta.href}
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-raise lg:inline-flex"
            >
              {nav.cta.label}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open menu"
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-paper px-6 py-5 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink"
              >
                <X size={18} />
              </button>
            </div>
            <nav
              aria-label="Mobile"
              className="mt-14 flex flex-col gap-2"
            >
              {nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  className="rounded-2xl px-4 py-4 text-2xl font-semibold tracking-tight text-ink hover:bg-paper-deep"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + nav.links.length * 0.06, duration: 0.4 }}
                className="mt-6 rounded-full bg-ink px-6 py-4 text-center text-base font-medium text-paper"
              >
                {nav.cta.label}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
