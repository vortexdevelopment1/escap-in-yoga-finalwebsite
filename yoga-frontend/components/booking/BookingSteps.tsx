const LABELS = ["Class", "Date", "Time", "Details", "Review", "Confirmed"];

export default function BookingSteps({ current }: { current: number }) {
  return (
    <ol className="flex items-center justify-between gap-1" aria-label="Booking progress">
      {LABELS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={label} className="flex flex-1 flex-col items-center gap-2 text-center" aria-current={active ? "step" : undefined}>
            <span className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${done ? "border-terracotta bg-terracotta text-cream" : active ? "border-brown bg-brown text-cream" : "border-brown/25 text-brown/60"}`}>
              {done ? "✓" : n}
            </span>
            <span className={`hidden text-xs sm:block ${active ? "font-semibold" : "text-brown/60"}`}>{label}</span>
            <span className="sr-only">{done ? "completed" : active ? "current step" : "upcoming"}</span>
          </li>
        );
      })}
    </ol>
  );
}
