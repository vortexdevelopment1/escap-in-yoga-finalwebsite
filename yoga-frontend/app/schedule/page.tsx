import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Schedule from "@/components/schedule/Schedule";

export const metadata: Metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <>
      <PageHero title="Session schedule" eyebrow="Timings" description="Choose a day, filter by class and select the batch you want to book." />
      <div className="mx-auto max-w-4xl px-5 pb-24 sm:px-8"><Schedule /></div>
    </>
  );
}
