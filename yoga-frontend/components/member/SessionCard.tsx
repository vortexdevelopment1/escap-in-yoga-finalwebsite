"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import CountdownTimer from "./CountdownTimer";
import SessionAccessModal from "./SessionAccessModal";
import { formatDay, formatTime } from "@/lib/dates";
import type { JourneyDay, MemberProfile } from "@/types";

interface Props {
  profile: MemberProfile;
  today: JourneyDay | null;
  next: JourneyDay | null;
  finished: boolean;
  notStarted: boolean;
}

export default function SessionCard({ profile, today, next, finished, notStarted }: Props) {
  const [open, setOpen] = useState(false);

  if (!today) {
    return (
      <section className="rounded-[2rem] bg-cream p-8 sm:p-10" aria-labelledby="today-title">
        <h2 id="today-title" className="text-3xl">
          {finished ? "Journey complete" : "Your first session is coming"}
        </h2>
        <p className="mt-3 text-brown/80">
          {finished
            ? "You have reached the end of your 30 days."
            : `Your journey begins on ${next ? formatDay(next.date) : "your start date"}.`}
        </p>
        {notStarted && next && (
          <div className="mt-6">
            <CountdownTimer target={next.date} label="Day 1 unlocks in" />
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden rounded-[2rem] bg-terracotta p-8 text-cream sm:p-10"
      aria-labelledby="today-title"
    >
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cream/15" aria-hidden="true" />
      <div className="relative">
        {/* Top Badges Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium tracking-wide text-cream/90 uppercase">
            Today&rsquo;s practice · Day {today.n}
          </p>
          <span className="text-xs font-medium text-cream/80 tracking-wider uppercase">
            Active Member
          </span>
        </div>

        {/* Main Title & Schedule */}
        <h2 id="today-title" className="mt-3 !text-cream text-4xl sm:text-5xl font-serif">
          {profile.className}
        </h2>
        <p className="mt-1 text-lg sm:text-xl text-cream/90">
          {formatTime(profile.time)} · {today.title}
        </p>

        {/* Account Info Pill */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-cream/80 bg-black/10 w-fit px-3.5 py-1.5 rounded-full border border-white/10">
          <span>Registered as</span>
          <span className="font-semibold text-white">{profile.email}</span>
        </div>

        {/* Action Button */}
        <Button variant="light" size="lg" className="mt-8 font-semibold shadow-md" onClick={() => setOpen(true)}>
          Join live session
        </Button>
      </div>

      <SessionAccessModal day={open ? today : null} mode="join" profile={profile} onClose={() => setOpen(false)} />
    </section>
  );
}
