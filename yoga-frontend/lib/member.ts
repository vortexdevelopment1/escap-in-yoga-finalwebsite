import type { Booking, JourneyDay, MemberProfile, StoredSession } from "@/types";
import { SUBSCRIPTION } from "@/data/subscription";
import { journeyTitle } from "@/data/sessions";
import { addDays, daysBetween, fromISODate, startOfDay } from "@/lib/dates";

export function buildProfile(session: StoredSession | null, booking: Booking | null): MemberProfile | null {
  if (!session) return null;
  if (session.mode === "booking" && booking && booking.email.toLowerCase() === session.email.toLowerCase()) {
    return {
      name: booking.name, email: booking.email, phone: booking.phone,
      className: booking.className, time: booking.time,
      startDate: fromISODate(booking.dateISO), mode: "booking",
    };
  }
  if (session.mode === "demo") {
    return {
      name: "Demo Member", email: SUBSCRIPTION.demoEmail, phone: "+91 00000 00000",
      className: "Hot Yoga", time: "07:00",
      // Demo journey is always on day 7 so every state is visible.
      startDate: addDays(startOfDay(new Date()), -6), mode: "demo",
    };
  }
  return null;
}

export function getJourney(profile: MemberProfile, now: Date) {
  const total = SUBSCRIPTION.durationDays;
  const currentDay = daysBetween(profile.startDate, now) + 1;
  const days: JourneyDay[] = Array.from({ length: total }, (_, i) => {
    const n = i + 1;
    return {
      n,
      date: addDays(profile.startDate, i),
      status: n < currentDay ? "completed" : n === currentDay ? "today" : "locked",
      title: journeyTitle(n),
    };
  });
  return {
    days,
    currentDay,
    total,
    endDate: addDays(profile.startDate, total - 1),
    progress: Math.round((Math.min(Math.max(currentDay, 0), total) / total) * 100),
    notStarted: currentDay < 1,
    finished: currentDay > total,
    today: days.find((d) => d.status === "today") ?? null,
    upcoming: days.filter((d) => d.status === "locked").slice(0, 3),
  };
}
