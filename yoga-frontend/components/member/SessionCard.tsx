"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import CountdownTimer from "./CountdownTimer";
import SessionAccessModal from "./SessionAccessModal";
import { formatDay, formatTime } from "@/lib/dates";
import type { JourneyDay, MemberProfile } from "@/types";

interface Props { profile: MemberProfile; today: JourneyDay | null; next: JourneyDay | null; finished: boolean; notStarted: boolean }

export default function SessionCard({ profile, today, next, finished, notStarted }: Props) {
  const [open, setOpen] = useState(false);

  if (!today) {
    return (
      <section className="rounded-[2rem] bg-cream p-8 sm:p-10" aria-labelledby="today-title">
        <h2 id="today-title" className="text-3xl">{finished ? "Journey complete" : "Your first session is coming"}</h2>
        <p className="mt-3 text-brown/80">{finished ? "You have reached the end of your 30 days." : `Your journey begins on ${next ? formatDay(next.date) : "your start date"}.`}</p>
        {notStarted && next && <div className="mt-6"><CountdownTimer target={next.date} label="Day 1 unlocks in" /></div>}
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-terracotta p-8 text-cream sm:p-10" aria-labelledby="today-title">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cream/15" aria-hidden="true" />
      <div className="relative">
        <p className="text-sm font-semibold text-cream/90">Today&rsquo;s practice · Day {today.n}</p>
        <h2 id="today-title" className="mt-2 !text-cream text-4xl sm:text-5xl">{profile.className}</h2>
        <p className="mt-1 text-xl">{formatTime(profile.time)} · {today.title}</p>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          <div><dt className="text-cream/80">Registered email</dt><dd className="break-all font-semibold">{profile.email}</dd></div>
          <div><dt className="text-cream/80">Access</dt><dd className="font-semibold">Verified</dd></div>
        </dl>
        <Button variant="light" size="lg" className="mt-8" onClick={() => setOpen(true)}>Join live session</Button>
      </div>
      <SessionAccessModal day={open ? today : null} mode="join" profile={profile} onClose={() => setOpen(false)} />
    </section>
  );
}
