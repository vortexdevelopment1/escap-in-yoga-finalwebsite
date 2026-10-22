import type { JourneyDay } from "@/types";
import JourneyStrip from "./JourneyStrip";

interface Props { progress: number; currentDay: number; total: number; days: JourneyDay[] }

export default function ProgressCard({ progress, currentDay, total, days }: Props) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const shown = Math.min(Math.max(currentDay, 0), total);
  return (
    <section className="rounded-[2rem] bg-cream p-8" aria-labelledby="progress-title">
      <h2 id="progress-title" className="text-2xl">Your progress</h2>
      <div className="mt-6 flex items-center gap-6">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label={`${progress} percent complete`}>
            <circle cx="60" cy="60" r={r} fill="none" stroke="#EBC5AD" strokeWidth="10" />
            <circle cx="60" cy="60" r={r} fill="none" stroke="#C4775B" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - progress / 100)} className="transition-[stroke-dashoffset] duration-1000" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-serif text-3xl">{progress}%</span>
        </div>
        <div>
          <p className="font-serif text-3xl">Day {shown} of {total}</p>
          <p className="mt-1 text-sm text-brown/70">One new session opens each day.</p>
        </div>
      </div>
      <div className="mt-8"><JourneyStrip days={days} /></div>
    </section>
  );
}
