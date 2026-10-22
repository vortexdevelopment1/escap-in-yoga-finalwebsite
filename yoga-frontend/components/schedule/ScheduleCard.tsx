import Link from "next/link";
import { ClockIcon } from "@/components/ui/Icons";
import { formatTime } from "@/lib/dates";
import { getClass } from "@/data/classes";
import type { Batch } from "@/types";

export default function ScheduleCard({ batch }: { batch: Batch }) {
  const cls = getClass(batch.classSlug);
  return (
    <li className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full bg-warmbeige font-serif leading-none text-forest">
          <span className="text-lg">{formatTime(batch.time).slice(0, 5)}</span>
          <span className="mt-0.5 text-xs">{formatTime(batch.time).slice(6)}</span>
        </div>
        <div>
          <h3 className="text-xl font-serif text-forest">{batch.label}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-forest/70"><ClockIcon width={15} height={15} />{cls?.name} · {cls?.duration}</p>
        </div>
      </div>
      <Link href={`/booking?class=${batch.classSlug}&batch=${batch.id}`} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-sage px-6 font-semibold text-white transition hover:bg-sage-dark">
        Select session
      </Link>
    </li>
  );
}
