import { CheckIcon, LockIcon } from "@/components/ui/Icons";
import { formatCompact, formatShort } from "@/lib/dates";
import type { JourneyDay } from "@/types";

interface Props { day: JourneyDay; now: Date | null; onOpen: (d: JourneyDay) => void }

export default function DayCard({ day, now, onOpen }: Props) {
  const label = `Day ${String(day.n).padStart(2, "0")}`;

  if (day.status === "today") {
    return (
      <div className="col-span-2 flex flex-col justify-between rounded-3xl bg-terracotta p-5 text-cream shadow-lg sm:col-span-1">
        <div>
          <p className="font-serif text-2xl">{label}</p>
          <p className="mt-1 flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 animate-pulse rounded-full bg-cream" aria-hidden="true" />Today</p>
        </div>
        <button onClick={() => onOpen(day)} className="mt-6 min-h-[44px] rounded-full bg-cream px-4 py-2 text-sm font-semibold text-brown transition hover:bg-peach">
          Join session<span className="sr-only"> for {label}</span>
        </button>
      </div>
    );
  }

  if (day.status === "completed") {
    return (
      <button onClick={() => onOpen(day)} className="rounded-3xl bg-cream p-5 text-left transition hover:-translate-y-1 hover:bg-peach/60">
        <p className="font-serif text-2xl">{label}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-terracotta-dark"><CheckIcon width={16} height={16} />Completed</p>
        <p className="mt-6 text-sm text-brown/65">{formatShort(day.date)}</p>
      </button>
    );
  }

  const ms = now ? day.date.getTime() - now.getTime() : null;
  return (
    <div aria-disabled="true" className="rounded-3xl border border-dashed border-brown/25 bg-sand/60 p-5 text-brown/70">
      <p className="font-serif text-2xl">{label}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><LockIcon width={16} height={16} />Locked</p>
      <p className="mt-6 text-sm">Unlocks {formatShort(day.date)}</p>
      <p className="text-sm tabular-nums" aria-label="Time until unlock">{ms === null ? "--:--:--" : formatCompact(ms)}</p>
    </div>
  );
}
