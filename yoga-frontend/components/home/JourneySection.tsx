import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SUBSCRIPTION } from "@/data/subscription";

/** Decorative preview only: days 1–7 done, day 8 open, the rest locked. */
export default function JourneySection() {
  return (
    <section id="journey" className="relative overflow-hidden bg-brown py-16 sm:py-20 lg:py-24 text-cream">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-terracotta/25" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <SectionHeading tone="light" eyebrow="Subscription" title={`The ${SUBSCRIPTION.name}`} description="Day 1 opens on the day you start. Day 2 opens the next day, and so on to day 30. Future days stay locked and count down to their unlock time." />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/booking?plan=cohort">Join 30-Day Cohort</Button>
            <Button href="/login" variant="light">Member login</Button>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid grid-cols-6 gap-3 sm:gap-4" role="img" aria-label="Preview of a 30-day journey: earlier days complete, today open, later days locked">
            {Array.from({ length: 30 }, (_, i) => {
              const n = i + 1;
              const state = n < 8 ? "done" : n === 8 ? "today" : "locked";
              return (
                <div key={n} className={`flex aspect-square items-center justify-center rounded-full text-sm font-semibold sm:text-base ${state === "done" ? "bg-peach text-brown" : state === "today" ? "animate-pulse-ring bg-terracotta text-cream" : "border border-cream/30 text-cream/50"}`}>
                  {n}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
