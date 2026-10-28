import type { Booking, JourneyDay, MemberProfile, StoredSession } from "@/types";
import { SUBSCRIPTION } from "@/data/subscription";
import { journeyTitle } from "@/data/sessions";
import { addDays, daysBetween, fromISODate, startOfDay } from "@/lib/dates";

export function buildProfile(session: StoredSession | null, booking: Booking | null): MemberProfile | null {
  if (!session) return null;

  // 1. Direct match with current active booking
  if (session.mode === "booking" && booking && booking.email.toLowerCase() === session.email.toLowerCase()) {
    return {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      className: booking.className,
      time: booking.time,
      startDate: fromISODate(booking.dateISO),
      mode: "booking",
    };
  }

  // 2. Check all_bookings array in localStorage
  if (typeof window !== "undefined" && session.email) {
    try {
      const allBookings = JSON.parse(localStorage.getItem("eiy:all_bookings") || "[]");
      const matched = allBookings.find((b: any) => b.email && b.email.toLowerCase() === session.email.toLowerCase());
      if (matched) {
        return {
          name: matched.name,
          email: matched.email,
          phone: matched.phone || "+91 98765 43210",
          className: matched.className || "30-Day Cohort Journey",
          time: matched.time || "07:00",
          startDate: matched.dateISO ? fromISODate(matched.dateISO) : new Date(),
          mode: "booking",
        };
      }
    } catch {}
  }

  // 3. Fallback for valid student session
  if (session.email) {
    return {
      name: session.email.split("@")[0].replace(/[._]/g, " "),
      email: session.email,
      phone: "+91 98765 43210",
      className: "30-Day Cohort Journey",
      time: "07:00",
      startDate: new Date(),
      mode: "booking",
    };
  }

  if (session.mode === "demo") {
    return {
      name: "Demo Member",
      email: SUBSCRIPTION.demoEmail,
      phone: "+91 00000 00000",
      className: "Hot Yoga",
      time: "07:00",
      startDate: addDays(startOfDay(new Date()), -6),
      mode: "demo",
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
