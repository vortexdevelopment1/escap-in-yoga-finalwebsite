import Button from "@/components/ui/Button";
import { LeafBranchArt, LotusArt, Wave } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-softcream pt-20 sm:pt-24 pb-0">
      {/* Botanical Background Line Art to fill empty spaces (Lotus & Leaves) */}
      <LotusArt className="absolute -left-12 top-16 h-64 w-64 text-forest/20 pointer-events-none hidden md:block rotate-[-15deg]" />
      <LotusArt className="absolute -right-12 top-10 h-72 w-72 text-sage/35 pointer-events-none hidden md:block rotate-[20deg]" />
      <LeafBranchArt className="absolute left-6 bottom-16 h-80 w-80 text-forest/15 pointer-events-none hidden lg:block" />
      <LeafBranchArt className="absolute right-4 bottom-20 h-80 w-80 text-sage/25 pointer-events-none hidden lg:block -scale-x-100" />

      {/* 1. CLEAN HERO VISUAL AREA - Pure image showcase with reveal animation */}
      <Reveal delay={0} className="relative z-10 mx-auto max-w-6xl px-4 pt-4 sm:pt-6 pb-6 sm:pb-10 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/l44x18ko/image/upload/f_auto,q_auto/escape_in_yoga/hero-custom.png"
          alt="Escape in Yoga Visual"
          className="w-full h-auto max-h-[72vh] object-contain mx-auto pointer-events-none select-none"
        />
      </Reveal>

      {/* DIVIDER LINE BELOW THE IMAGE WITH REVEAL */}
      <Reveal delay={100} className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <hr className="border-t border-forest/15" />
      </Reveal>

      {/* 2. HERO COMPONENTS BENEATH THE IMAGE AND DIVIDER LINE WITH REVEAL */}
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-12">
        <div className="grid gap-8 items-center lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left Column: Eyebrow, Main Headline & Description */}
          <Reveal delay={150}>
            <p className="mb-4 inline-flex items-center rounded-full border border-forest/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-widest text-forest uppercase shadow-sm">
              Live Yoga Studio · Guided by Avani Jain
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-forest leading-tight tracking-tight">
              Return to yourself,
              <br />
              <span className="italic text-sage">one breath at a time.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-forest/80">
              Book a batch that fits your day, then unlock one guided session every morning for thirty days. Hatha, vinyasa, yin and hot yoga, taught live.
            </p>
          </Reveal>

          {/* Right Column: Action Buttons & 30-Day Journey Card */}
          <Reveal delay={250} className="flex flex-col gap-6 lg:items-end">
            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
              <Button href="/booking?plan=trial" size="lg">Book Free Trial (₹0)</Button>
              <Button href="/booking?plan=cohort" variant="secondary" size="lg">Join 30-Day Cohort</Button>
            </div>
            <div className="w-full sm:max-w-xs rounded-2xl bg-white p-5 shadow-sm border border-forest/10">
              <p className="font-serif text-lg leading-snug text-forest">A new session unlocks every day.</p>
              <p className="mt-1 text-sm text-forest/70">30-day guided live yoga journey</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Organic Bottom Wave Transition */}
      <Wave fill="#1e3427" className="mt-10 sm:mt-14 block w-full -mb-px" />
    </section>
  );
}
