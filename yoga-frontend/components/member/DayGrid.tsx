"use client";
import { useState } from "react";
import { useNow } from "@/components/hooks/useNow";
import type { JourneyDay, MemberProfile } from "@/types";
import DayCard from "./DayCard";
import SessionAccessModal from "./SessionAccessModal";

export default function DayGrid({ days, profile }: { days: JourneyDay[]; profile: MemberProfile }) {
  const now = useNow();
  const [selected, setSelected] = useState<JourneyDay | null>(null);

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" aria-label="30-day journey">
        {days.map((d) => (
          <li key={d.n} className={`contents`}>
            <DayCard day={d} now={now} onOpen={setSelected} />
          </li>
        ))}
      </ul>
      <SessionAccessModal day={selected} mode={selected?.status === "today" ? "join" : "details"} profile={profile} onClose={() => setSelected(null)} />
    </div>
  );
}
