"use client";
import { useNow } from "@/components/hooks/useNow";
import { splitCountdown } from "@/lib/dates";

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownTimer({ target, label = "Unlocks in" }: { target: Date; label?: string }) {
  const now = useNow();
  const parts = now ? splitCountdown(target.getTime() - now.getTime()) : null;
  const cells: [string, string][] = parts
    ? [...(parts.days > 0 ? ([[pad(parts.days), "days"]] as [string, string][]) : []), [pad(parts.hours), "hours"], [pad(parts.minutes), "min"], [pad(parts.seconds), "sec"]]
    : [["--", "hours"], ["--", "min"], ["--", "sec"]];

  return (
    <div role="timer" aria-label={parts ? `${label} ${parts.days} days ${parts.hours} hours ${parts.minutes} minutes` : label}>
      <p className="mb-3 text-sm font-semibold text-brown/70">{label}</p>
      <div className="flex items-start gap-2 sm:gap-3">
        {cells.map(([v, unit], i) => (
          <div key={unit} className="flex items-start gap-2 sm:gap-3">
            <div className="text-center">
              <span className="block min-w-[3.5rem] rounded-2xl bg-cream px-2 py-3 font-serif text-3xl tabular-nums sm:min-w-[4.5rem] sm:text-4xl" aria-hidden="true">{v}</span>
              <span className="mt-1 block text-xs text-brown/60">{unit}</span>
            </div>
            {i < cells.length - 1 && <span className="pt-3 font-serif text-3xl text-terracotta" aria-hidden="true">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
