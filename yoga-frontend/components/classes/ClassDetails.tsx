import Link from "next/link";
import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { CheckIcon, ClockIcon } from "@/components/ui/Icons";
import { batchesForClass } from "@/data/schedule";
import { WEEKDAYS, formatTime } from "@/lib/dates";
import { scheduleDayOrder } from "@/data/schedule";
import type { YogaClass } from "@/types";

export default function ClassDetails({ item }: { item: YogaClass }) {
  const sessions = batchesForClass(item.slug).sort(
    (a, b) => scheduleDayOrder.indexOf(a.day) - scheduleDayOrder.indexOf(b.day) || a.time.localeCompare(b.time)
  );
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[1fr_1fr]">
      <Photo src={item.image} alt={`${item.name} illustration`} className="aspect-[4/5] rounded-[2.5rem] lg:sticky lg:top-28 lg:self-start" />
      <div>
        <p className="flex items-center gap-2 font-semibold text-forest"><ClockIcon width={18} height={18} />{item.duration} · {item.level}</p>
        <h1 className="mt-3 text-5xl sm:text-6xl font-serif text-forest">{item.name}</h1>
        <p className="mt-6 text-lg leading-relaxed text-forest/80">{item.description}</p>

        <h2 className="mt-12 text-2xl font-serif text-forest">What you will gain</h2>
        <ul className="mt-4 space-y-3">
          {item.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                <CheckIcon width={14} height={14} />
              </span>
              <span className="text-forest/85">{b}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-serif text-forest">Available Weekly Slots</h2>
        <ul className="mt-4 divide-y divide-forest/10 rounded-3xl bg-sand/60 border border-forest/10">
          {sessions.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <p className="font-semibold text-forest">{WEEKDAYS[s.day]}</p>
                <p className="text-sm text-forest/70">{s.label} · {formatTime(s.time)} (55 mins)</p>
              </div>
              <Link href={`/booking?class=${item.slug}&batch=${s.id}`} className="rounded-full bg-forest text-cream px-4 py-2 text-xs font-semibold transition hover:bg-forest/90">
                Book Slot
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={`/booking?class=${item.slug}`} size="lg">Book Free Trial Session</Button>
          <Button href="/schedule" variant="secondary" size="lg">View Full Schedule</Button>
        </div>
      </div>
    </div>
  );
}
