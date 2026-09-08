import type { Transition, Variants } from "motion/react";

/** Shared easing — one curve everywhere so the page moves as one system. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const springSoft = { type: "spring", stiffness: 120, damping: 16 } as const;

export const transitions = {
  reveal: { duration: 0.7, ease: easeOut } satisfies Transition,
  quick: { duration: 0.4, ease: easeOut } satisfies Transition,
  slow: { duration: 0.9, ease: easeOut } satisfies Transition,
};

/** The only whileInView primitive — every scroll-triggered block goes through
 *  these so distances and staggers stay consistent across sections. */
export const revealGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.reveal },
};

/** Hero entrance — tighter stagger, same curve. */
export const heroGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.reveal },
};
