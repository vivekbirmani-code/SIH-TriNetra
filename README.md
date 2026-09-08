# TriNetra-NER — Marketing Site

Single-page marketing site for **TriNetra-NER**, Team-Hope's Smart India Hackathon 2026 entry (PS 26002 — AI-Based Smart Logistics and Accessibility Intelligence Platform for the North Eastern Region).

Built with **React 19 + Vite 7 + Tailwind CSS v4 + Framer Motion (`motion`)**. No map SDKs, no API keys, zero raster images — every visual is inline SVG or CSS.

## Quick start

```bash
npm install
npm run dev        # dev server (default http://localhost:5173)
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally
```

If a port is already in use, Vite prints the next free one — open **that** URL, and hard-refresh (`Ctrl + Shift + R`) after crashes or dependency installs.

## Editing content

**All page copy lives in [`src/lib/data.ts`](src/lib/data.ts)** — headlines, stats, route codes, team roster, footer credits. Change words there; components read from it. Design tokens (colors, fonts, shadows, keyframes) live in [`src/index.css`](src/index.css) under `@theme`.

## Structure

```
src/
  lib/         data.ts (all copy) · motion.ts (shared variants) · cn.ts
  components/  Navbar · Footer · Logo · Marquee · NEMap (hero map) · MiniMap
  components/ui/  Button · Section · SectionHeading · Reveal · GlassCard ·
                  ScoreChip · StatCounter · Eyebrow
  sections/    Hero · StatsStrip · Pillars · ConsolePreview · HowItWorks ·
               FeaturesBento · Audiences · Team · CtaSection
```

## Design system

| Token | Value | Role |
|---|---|---|
| `paper` / `paper-deep` | `#F7F5F1` / `#EFECE5` | Light surfaces |
| `ink` / `ink-deep` / `ink-raise` | `#16233A` / `#0F1929` / `#1E2D49` | Text / dark sections / dark cards |
| `clay` (+ deep/bright/soft) | `#D9622B` | Terracotta accent — CTAs, routes, alerts |
| `moss` (+ soft) | `#3E7C59` | **Semantic only** — good Accessibility Scores |

Type: **Sora** (display + body) · **IBM Plex Mono** (data labels only). Two radii (`rounded-full`, `rounded-2xl`). Motion: one orchestrated hero load sequence, one scroll-linked console reveal, one scroll-drawn timeline — everything else quiet staggered reveals, all respecting `prefers-reduced-motion`.

## Assets

- `public/favicon.svg` — tab icon (logo mark)
- `public/og-image.png` — 1200×630 social share card (regenerate by screenshotting `public/og-src.html` at 1200×630 if copy changes)
- `public/robots.txt`

## Deploy

Any static host: run `npm run build` and serve `dist/` (Vercel, Netlify, GitHub Pages — no special config needed; it's a single-page app with hash-free anchors).
