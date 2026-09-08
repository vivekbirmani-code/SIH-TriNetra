/**
 * All site copy lives here — one edit point for the whole page.
 * Mono strings (route codes, scores, coordinates) are data, not decoration.
 */

export const nav = {
  links: [
    { label: "Console", href: "#console" },
    { label: "How it works", href: "#how" },
    { label: "Features", href: "#features" },
    { label: "Impact", href: "#impact" },
  ],
  cta: { label: "View demo", href: "#console" },
};

export const hero = {
  eyebrow: "Road intelligence — North East India",
  title: "Three eyes on every road in the North East.",
  lede:
    "TriNetra fuses satellite feeds, verified ground reports and AI forecasts into one live Accessibility Score for every route in the eight sister states — and it works where the network doesn't.",
  primaryCta: { label: "Explore the console", href: "#console" },
  secondaryCta: { label: "How it works", href: "#how" },
  meta: ["ISRO Bhuvan + IMD feeds", "Trust-scored reports", "SMS & IVR fallback"],
  /** Hero map — "The Advised Corridor": two roads, one verdict. */
  map: {
    origin: "Guwahati",
    destination: "Silchar",
    advisory: {
      label: "Route advisory",
      score: 91,
      unit: "accessibility",
      detail: "+22 min · 0 alerts",
    },
    risk: "Landslide · 48 h",
  },
};

export const stats = [
  { value: 8, label: "Sister states, one map" },
  { value: 3, label: "Data layers fused" },
  { value: 72, suffix: " hr", label: "Advance risk warning" },
  { value: 0, label: "New sensors required", note: "Runs on satellites, citizens and SMS" },
];

export const capitals = [
  "Guwahati",
  "Shillong",
  "Silchar",
  "Imphal",
  "Aizawl",
  "Dimapur",
  "Kohima",
  "Itanagar",
  "Agartala",
  "Gangtok",
];

export const pillars = {
  title: "Everything we know about a road, in one place.",
  lede:
    "Most platforms watch the North East from orbit alone. TriNetra adds the two things satellites can't see: the people driving the road today, and the week it's about to have.",
  items: [
    {
      icon: "satellite",
      eye: "Eye 01",
      title: "Eyes in the sky",
      body: "ISRO Bhuvan imagery and IMD weather feeds flag rising landslide and flood risk across the hills — before the first truck rolls.",
    },
    {
      icon: "footprints",
      eye: "Eye 02",
      title: "Eyes on the ground",
      body: "Citizens and field officials report the road they just drove. Every report is cross-checked and trust-scored before it moves a single score.",
    },
    {
      icon: "trending-up",
      eye: "Eye 03",
      title: "Eyes ahead",
      body: "XGBoost and Bayesian models read terrain, rainfall history and report patterns into a 72-hour risk outlook — with alternates ready.",
    },
  ],
};

export const consoleSection = {
  eyebrow: "Live console",
  title: "One console for every corridor.",
  lede:
    "Dispatchers watch supply convoys move in real time, watch risk queues build, and act on alternate routes — before the road decides for them.",
  checklist: [
    "Live GPS for medicine and food convoys",
    "Route scores refresh as reports land",
    "Alternates with estimated delay",
    "Alerts by app, SMS and IVR",
  ],
  mock: {
    header: "Trinetra Ops — Assam corridor",
    live: "Live",
    routes: [
      { id: "NH-44", path: "Sonapur → Agartala", score: 41, band: "LOW", delta: "+25 min", tone: "clay" },
      { id: "NH-6", path: "Jowai → Badarpur", score: 74, band: "FAIR", delta: "On time", tone: "moss" },
      { id: "SH-2", path: "Imphal → Moreh", score: 88, band: "GOOD", delta: "On time", tone: "moss" },
    ] as Array<{
      id: string;
      path: string;
      score: number;
      band: string;
      delta: string;
      tone: "clay" | "moss";
    }>,
    alert: "Landslide risk 62% — NH-44 — next 48 h",
    convoy: "GPS — Med convoy — ETA 14:20",
  },
};

export const steps = {
  title: "From signal to reroute in four steps.",
  items: [
    {
      num: "01",
      name: "Sense",
      body: "Satellites and weather feeds watch water, terrain and traffic across all eight states.",
    },
    {
      num: "02",
      name: "Verify",
      body: "Citizens and officials report what they see; each report is cross-checked and trust-scored.",
    },
    {
      num: "03",
      name: "Score",
      body: "Fused data becomes a live 0–100 Accessibility Score for every route.",
    },
    {
      num: "04",
      name: "Reroute",
      body: "Alerts with alternates and delay estimates reach drivers, dispatchers and district offices — by app, SMS or IVR.",
    },
  ],
};

export const features = {
  eyebrow: "What's inside",
  title: "Built for the field, not the demo.",
  score: {
    title: "Accessibility Score",
    body: "One number a driver, an official and a minister can all act on. Green means go — and when it drops, you'll know why.",
    display: 74,
  },
  alt: {
    title: "Alternate routes",
    body: "A* and Dijkstra over the live road graph surface the next-best path, with the delay it costs.",
  },
  convoy: {
    title: "Convoy tracking",
    body: "GPS tracking for vehicles carrying medicine, food and relief — position, ETA, route score.",
  },
  offline: {
    title: "Offline-first",
    body: "No internet? The map still talks — over SMS and IVR, in the local language.",
    sms: "TRINETRA: NH-44 Sonapur score 41 (LOW). Landslide risk 62% in 48h. Alt via Umling +25 min.",
  },
  trust: {
    title: "Trust scoring",
    body: "Reporters earn trust with every verified call, so their word weighs more. Bad actors fade out.",
  },
  district: {
    title: "Disaster-ready",
    body: "District dashboards bundle risk, reports and convoys for the moments that matter.",
  },
};

export const audiences = {
  title: "One map, four kinds of user.",
  lede: "The same live picture, scaled from one traveller's phone to a state control room.",
  items: [
    {
      name: "Citizens",
      line: "Check a route before you travel. Report what you see in thirty seconds.",
    },
    {
      name: "Drivers & operators",
      line: "Scores, alerts and reroutes on the road — even with no signal.",
    },
    {
      name: "Field officials",
      line: "Verify ground truth from a phone; keep the map honest.",
    },
    {
      name: "District admins",
      line: "Every risk in the district on one screen, before it becomes a crisis.",
    },
  ],
};

export const team = {
  eyebrow: "The team",
  title: "Built by Team-Hope.",
  lede: "Six builders across AI, backend, frontend and data — one map.",
  members: [
    { name: "Siddarth Bhardwaj", role: "AI/ML Dev · Lead" },
    { name: "Varun Dubey", role: "AI/ML Dev" },
    { name: "Akshaj Nambiar", role: "Backend Dev" },
    { name: "Piyush Rajput", role: "Full Stack Dev" },
    { name: "Vivek Birmani", role: "Frontend Dev" },
    { name: "Lineysha Thayat", role: "Database Admin" },
  ],
};

export const cta = {
  eyebrow: "SIH 2026 — Transportation & Logistics",
  title: "This monsoon, no route should be a surprise.",
  lede:
    "TriNetra turns three data sources into one decision — for the people who drive, dispatch and defend the North East's roads.",
  primary: { label: "Explore the console", href: "#console" },
  secondary: { label: "How it works", href: "#how" },
};

export const footer = {
  tagline: "Road accessibility intelligence for North East India.",
  dataCredits: "Data — ISRO Bhuvan · IMD · PMGSY · Citizen reports",
  stackCredits: "Stack — React · Flutter · PostGIS · XGBoost",
  copyright: "© 2026 Team-Hope — Smart India Hackathon 2026 · PS 26002",
};
