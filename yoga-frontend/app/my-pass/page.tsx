"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ClockIcon, CheckIcon } from "@/components/ui/Icons";
import { formatDay, formatTime, fromISODate } from "@/lib/dates";
import { getBooking } from "@/lib/storage";
import type { Booking } from "@/types";

export default function MyPassPage() {
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  const [searchEmail, setSearchEmail] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setBooking(getBooking());
  }, []);

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setHasSearched(true);
    const saved = getBooking();
    if (saved && saved.email.toLowerCase().trim() === searchEmail.toLowerCase().trim()) {
      setBooking(saved);
    } else {
      setBooking(null);
    }
  }

  const start = booking ? fromISODate(booking.dateISO) : null;
  const isCohort = booking?.planType === "30_DAY_COHORT";

  return (
    <div className="min-h-screen bg-sand pt-32 pb-24 px-4 sm:px-8 max-w-4xl mx-auto">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-forest/5 px-3 py-1 text-xs font-semibold text-forest uppercase tracking-wider">
          Student Portal
        </span>
        <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-medium text-forest">
          Find My Live Session
        </h1>
        <p className="mt-3 text-sm sm:text-base text-forest/70 max-w-md mx-auto">
          View your booked class details, batch timing and direct Zoom joining link.
        </p>
      </div>

      {/* If booking found on device */}
      {booking ? (
        <div className="mt-10 rounded-[2.5rem] bg-white p-7 sm:p-10 border border-forest/10 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-forest/10">
            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold">
                {isCohort ? "30-Day Cohort Member" : "Free Trial Pass Active"}
              </span>
              <h2 className="mt-2 font-serif text-3xl font-medium text-forest">
                {booking.className}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-forest/60">Registered Name</p>
              <p className="font-semibold text-forest">{booking.name}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-2xl bg-sand/50 border border-forest/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest/60">Scheduled Date</p>
              <p className="mt-1 font-serif text-xl text-forest font-medium">
                {start ? formatDay(start) : booking.dateISO}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-sand/50 border border-forest/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest/60">Batch Time</p>
              <p className="mt-1 font-serif text-xl text-forest font-medium">
                {formatTime(booking.time)} (55 mins)
              </p>
            </div>
          </div>

          {/* Live Zoom Access Card */}
          <div className="mt-6 rounded-2xl bg-forest/5 p-6 border border-forest/15">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sage">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Live Class Room
            </div>
            <h3 className="mt-2 text-lg font-serif font-medium text-forest">
              Live Session with Avani Jain
            </h3>
            <p className="mt-1 text-xs text-forest/70">
              Please join 5 minutes before your batch begins with a yoga mat and a quiet space.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="https://zoom.us/join"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-cream hover:bg-forest/90 transition shadow-sm"
              >
                Join Live Zoom Class
              </a>
              <a
                href={`https://wa.me/919826012345?text=Namaste%20Avani%20ji,%20I%20have%20booked%20${encodeURIComponent(booking.className)}%20at%20${booking.time}%20AM`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-forest/20 bg-white px-5 py-3 text-sm font-semibold text-forest hover:bg-forest/5 transition"
              >
                Help on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-forest/10 flex flex-wrap items-center justify-between text-xs text-forest/60">
            <span>Email: {booking.email}</span>
            <span>WhatsApp: {booking.phone}</span>
          </div>
        </div>
      ) : (
        /* Lookup Form if not found in current browser cache */
        <div className="mt-10 rounded-[2.5rem] bg-white p-8 sm:p-10 border border-forest/10 shadow-sm max-w-md mx-auto">
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-forest uppercase tracking-wider">
                Enter your booking email
              </label>
              <input
                type="email"
                required
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="prachi@gmail.com"
                className="mt-1 w-full rounded-2xl border border-forest/20 px-4 py-3 text-sm text-forest focus:border-forest focus:outline-none"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Find My Session
            </Button>
          </form>

          {hasSearched && (
            <p className="mt-4 text-xs text-center text-rose-700 font-medium">
              No booking found for this email on this device. Make sure you enter the exact email used during booking.
            </p>
          )}

          <div className="mt-6 text-center">
            <Link href="/booking" className="text-xs font-semibold text-forest underline">
              Want to book a new session? Click here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
