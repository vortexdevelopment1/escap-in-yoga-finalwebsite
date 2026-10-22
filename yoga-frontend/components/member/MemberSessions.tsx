"use client";
import Button from "@/components/ui/Button";
import { getJourney } from "@/lib/member";
import type { MemberProfile } from "@/types";
import { useMember } from "./useMember";
import DayGrid from "./DayGrid";
import MemberHeader from "./MemberHeader";
import SessionCard from "./SessionCard";

export default function MemberSessions() {
  const { profile } = useMember();
  if (!profile) return null;

  const j = getJourney(profile, new Date());
  return (
    <div className="space-y-10">
      <MemberHeader profile={profile} />
      <SessionCard profile={profile} today={j.today} next={j.upcoming[0] ?? null} finished={j.finished} notStarted={j.notStarted} />
      <section aria-labelledby="grid-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="grid-title" className="text-3xl">Your 30-day journey</h2>
            <p className="mt-2 max-w-xl text-brown/75">Completed days open their details. Today opens the live session. Future days unlock on their own date.</p>
          </div>
          <Button href="/member" variant="secondary" size="sm">Back to overview</Button>
        </div>
        <div className="mt-8"><DayGrid days={j.days} profile={profile} /></div>
      </section>
    </div>
  );
}
