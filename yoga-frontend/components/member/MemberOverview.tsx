"use client";
import Button from "@/components/ui/Button";
import NotificationPreview from "@/components/notifications/NotificationPreview";
import { formatDay, formatTime } from "@/lib/dates";
import { getJourney } from "@/lib/member";
import type { MemberProfile } from "@/types";
import { useMember } from "./useMember";
import CountdownTimer from "./CountdownTimer";
import MemberHeader from "./MemberHeader";
import ProgressCard from "./ProgressCard";
import SessionCard from "./SessionCard";
import SubscriptionCard from "./SubscriptionCard";

export default function MemberOverview() {
  const { profile } = useMember();
  if (!profile) return null;

  const j = getJourney(profile, new Date());
  const next = j.upcoming[0] ?? null;

  return (
    <div className="space-y-10">
      <MemberHeader profile={profile} />
      <SessionCard profile={profile} today={j.today} next={next} finished={j.finished} notStarted={j.notStarted} />
      <div className="grid gap-6 lg:grid-cols-2">
        <SubscriptionCard profile={profile} endDate={j.endDate} currentDay={j.currentDay} finished={j.finished} notStarted={j.notStarted} />
        <ProgressCard progress={j.progress} currentDay={j.currentDay} total={j.total} days={j.days} />
      </div>

      <section aria-labelledby="upcoming-title">
        <div className="flex items-end justify-between gap-4">
          <h2 id="upcoming-title" className="text-3xl">Coming up</h2>
          <Button href="/member/sessions" variant="secondary" size="sm">View all 30 days</Button>
        </div>
        {j.upcoming.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-[1.2fr_1fr]">
            {next && !j.notStarted && (
              <div className="rounded-[2rem] bg-peach p-8">
                <p className="font-serif text-2xl">Day {next.n} is locked</p>
                <p className="mb-6 mt-1 text-brown/75">{formatDay(next.date)} · {formatTime(profile.time)}</p>
                <CountdownTimer target={next.date} />
              </div>
            )}
            <ul className="space-y-3">
              {j.upcoming.map((d) => (
                <li key={d.n} className="flex items-center justify-between rounded-3xl bg-cream px-6 py-4">
                  <span><span className="font-serif text-xl">Day {d.n}</span><span className="block text-sm text-brown/70">{d.title}</span></span>
                  <span className="text-sm text-brown/70">{formatDay(d.date).split(", ")[1]}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : <p className="mt-4 text-brown/75">No more locked days. You have reached the end of the journey.</p>}
      </section>

      <section aria-labelledby="notif-title">
        <h2 id="notif-title" className="mb-4 text-3xl">Notifications</h2>
        <NotificationPreview phone={profile.phone} className={profile.className} time={formatTime(profile.time)} />
      </section>
    </div>
  );
}
