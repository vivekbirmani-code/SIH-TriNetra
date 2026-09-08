import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Marquee } from "./components/Marquee";
import { Hero } from "./sections/Hero";
import { StatsStrip } from "./sections/StatsStrip";
import { Pillars } from "./sections/Pillars";
import { ConsolePreview } from "./sections/ConsolePreview";
import { HowItWorks } from "./sections/HowItWorks";
import { FeaturesBento } from "./sections/FeaturesBento";
import { Audiences } from "./sections/Audiences";
import { Team } from "./sections/Team";
import { CtaSection } from "./sections/CtaSection";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <StatsStrip />
        <Marquee />
        <Pillars />
        <ConsolePreview />
        <HowItWorks />
        <FeaturesBento />
        <Audiences />
        <Team />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
