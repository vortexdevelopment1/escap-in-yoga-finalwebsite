import type { JourneyDay } from "@/types";

export default function JourneyStrip({ days }: { days: JourneyDay[] }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="img" aria-label={`${days.filter((d) => d.status === "completed").length} of ${days.length} days completed`}>
      {days.map((d) => (
        <span key={d.n} className={`h-3 w-3 rounded-full ${d.status === "completed" ? "bg-terracotta" : d.status === "today" ? "bg-brown ring-4 ring-terracotta/30" : "bg-brown/15"}`} />
      ))}
    </div>
  );
}
