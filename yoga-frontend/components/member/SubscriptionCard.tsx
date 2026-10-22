import { SUBSCRIPTION } from "@/data/subscription";
import { formatRange, formatTime } from "@/lib/dates";
import type { MemberProfile } from "@/types";

interface Props { profile: MemberProfile; endDate: Date; currentDay: number; finished: boolean; notStarted: boolean }

export default function SubscriptionCard({ profile, endDate, currentDay, finished, notStarted }: Props) {
  const status = finished ? "Completed" : notStarted ? "Starts soon" : "Active";
  return (
    <section className="rounded-[2rem] bg-brown p-8 text-cream" aria-labelledby="sub-title">
      <div className="flex items-start justify-between gap-4">
        <h2 id="sub-title" className="!text-cream text-2xl">{SUBSCRIPTION.name}</h2>
        <span className="rounded-full bg-peach px-3 py-1 text-sm font-semibold text-brown">{status}</span>
      </div>
      <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
        <div><dt className="text-cream/65">Duration</dt><dd className="font-medium">{SUBSCRIPTION.durationDays} days</dd></div>
        <div><dt className="text-cream/65">Dates</dt><dd className="font-medium">{formatRange(profile.startDate, endDate)}</dd></div>
        <div><dt className="text-cream/65">Current day</dt><dd className="font-medium">{Math.min(Math.max(currentDay, 0), SUBSCRIPTION.durationDays)} of {SUBSCRIPTION.durationDays}</dd></div>
        <div><dt className="text-cream/65">Selected batch</dt><dd className="font-medium">{profile.className}, {formatTime(profile.time)}</dd></div>
      </dl>
    </section>
  );
}
