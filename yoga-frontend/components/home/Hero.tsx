import Button from "@/components/ui/Button";
import { LeafBranchArt, LotusArt, Wave } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-softcream pt-16 sm:pt-20 lg:pt-24 pb-0">
      {/* Botanical Background Line Art for Desktop ONLY (>= 1024px untouched) */}
      <LotusArt className="absolute -left-12 top-16 h-64 w-64 text-forest/20 pointer-events-none hidden lg:block rotate-[-15deg]" />
      <LotusArt className="absolute -right-12 top-10 h-72 w-72 text-sage/35 pointer-events-none hidden lg:block rotate-[20deg]" />
      <LeafBranchArt className="absolute pointer-events-none text-forest/15 left-6 bottom-16 h-80 w-80 hidden lg:block" />
      <LeafBranchArt className="absolute pointer-events-none text-sage/25 -scale-x-100 right-4 bottom-20 h-80 w-80 hidden lg:block" />

      {/* 1. HERO IMAGE WRAPPER
          - Below 1024px (Mobile & Tablet):
              * min-height: calc(100svh - 64px) on mobile, calc(100svh - 80px) on tablet
              * display: flex; align-items: center; justify-content: center; position: relative
          - Desktop (>= 1024px): 100% original pixel-identical layout
      */}
      <div className="relative w-full flex flex-col justify-between items-center min-h-[calc(100svh-64px)] md:min-h-[calc(100svh-80px)] lg:min-h-0">
        <Reveal delay={0} className="relative z-10 w-full flex-1 flex items-center justify-center max-w-6xl px-4 py-4 md:py-6 lg:py-0 lg:pt-4 lg:pb-10">
          {/* Leaf Line Art for Mobile & Tablet (positioned on top with z-20 so it never gets hidden) */}
          <LeafBranchArt className="hidden min-[360px]:block lg:hidden absolute pointer-events-none text-forest/25 z-20 left-[-4px] md:left-2 top-1/2 -translate-y-1/2 w-[75px] md:w-[130px] h-auto" />
          <LeafBranchArt className="hidden min-[360px]:block lg:hidden absolute pointer-events-none text-sage/40 z-20 -scale-x-100 right-[-4px] md:right-2 top-1/2 -translate-y-1/2 w-[75px] md:w-[130px] h-auto" />

          {/* Clean, fluid image without distortion or box (Matching exact softcream background) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/l44x18ko/image/upload/f_auto,q_auto/escape_in_yoga/hero-custom.png"
            alt="Escape in Yoga Visual"
            className="relative z-10 w-full max-w-[480px] max-h-[65svh] md:w-[92%] md:max-w-[760px] md:max-h-[65svh] lg:w-full lg:max-w-none h-auto lg:max-h-[72vh] object-contain mx-auto pointer-events-none select-none"
          />
        </Reveal>

        {/* Divider line stays at the bottom of the wrapper */}
        <div className="relative z-10 w-full max-w-7xl px-5 md:px-12 lg:px-8">
          <hr className="border-t border-forest/15" />
        </div>
      </div>

      {/* 2. HERO TEXT CONTENT - Completely intact, starting right after the image wrapper */}
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
