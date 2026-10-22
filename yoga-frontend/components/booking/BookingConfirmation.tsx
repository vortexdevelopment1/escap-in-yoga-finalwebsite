"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Field";
import { CheckIcon } from "@/components/ui/Icons";
import NotificationPreview from "@/components/notifications/NotificationPreview";
import { SUBSCRIPTION } from "@/data/subscription";
import { addDays, formatDay, formatRange, formatTime, fromISODate } from "@/lib/dates";
import { getBooking } from "@/lib/storage";
import type { Booking } from "@/types";

export default function BookingConfirmation() {
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  useEffect(() => setBooking(getBooking()), []);

  if (booking === undefined) return <p className="text-center text-brown/70" role="status">Loading your booking…</p>;
  if (!booking) {
    return <EmptyState title="No booking yet" action={<Button href="/booking">Book a session</Button>}>Complete the booking steps and your confirmation will appear here.</EmptyState>;
  }

  const start = fromISODate(booking.dateISO);
  const isCohort = booking.planType === "30_DAY_COHORT";

  return (
    <div className="mx-auto max-w-4xl">
      <div className="animate-rise rounded-[2.5rem] bg-cream p-8 text-center shadow-[0_30px_60px_-40px_rgba(73,55,47,.7)] sm:p-14">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest text-cream">
          <CheckIcon width={30} height={30} />
        </span>

        <span className="mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-forest/10 text-forest">
          {isCohort ? "30-Day Cohort Registered" : "Free Trial Confirmed (₹0)"}
        </span>

        <h1 className="mt-3 text-4xl sm:text-5xl font-serif text-forest">
          {isCohort ? "Welcome to Your Journey" : "Your Free Trial is Booked"}
        </h1>
        <p className="mt-2 text-forest/75">
          Thank you, {booking.name.split(" ")[0]}. Your live place with Avani Jain is reserved.
        </p>

        {/* Booking Details Card */}
        <div className="mx-auto mt-8 max-w-lg rounded-3xl bg-sand/70 p-7 text-left border border-forest/10">
          <p className="font-serif text-3xl text-forest">{booking.className}</p>
          <p className="mt-1 text-lg text-forest/80 font-medium">
            {formatDay(start)} · {formatTime(booking.time)} (55 mins)
          </p>

          <dl className="mt-5 space-y-3 border-t border-forest/10 pt-5 text-sm">
            <div>
              <dt className="text-forest/65">Registered Email</dt>
              <dd className="break-all font-medium text-forest">{booking.email}</dd>
            </div>
            <div>
              <dt className="text-forest/65">WhatsApp Number</dt>
              <dd className="font-medium text-forest">{booking.phone}</dd>
            </div>
            {isCohort ? (
              <>
                <div>
                  <dt className="text-forest/65">{SUBSCRIPTION.name}</dt>
                  <dd className="font-medium text-forest">
                    {formatRange(start, addDays(start, SUBSCRIPTION.durationDays - 1))}
                  </dd>
                </div>
                {booking.password && (
                  <div className="rounded-xl bg-forest/5 p-3 border border-forest/15">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-forest/70">Your Member Password</dt>
                    <dd className="mt-1 font-mono text-base font-bold text-forest tracking-wider">{booking.password}</dd>
                    <p className="mt-1 text-[11px] text-forest/60">Use this password with your email to sign into the Member Area anytime.</p>
                  </div>
                )}
              </>
            ) : (
              <div>
                <dt className="text-forest/65">Pass Type</dt>
                <dd className="font-medium text-forest">1 Live Session Pass (Single Free Trial)</dd>
              </div>
            )}
          </dl>

          {/* Direct Live Session Zoom Box for Free Trial Student */}
          {!isCohort && (
            <div className="mt-6 rounded-2xl bg-white p-5 border border-forest/15 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest/70">
                Live Class Access
              </p>
              <p className="mt-1 text-sm font-medium text-forest">
                Your live Zoom link is ready for {formatDay(start)} at {formatTime(booking.time)}:
              </p>
              <a
                href="https://zoom.us/join"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-cream hover:bg-forest/90 transition shadow-xs"
              >
                Join Live Zoom Class
              </a>
              <p className="mt-2 text-[11px] text-forest/60 text-center">
                The meeting link has also been sent to your registered WhatsApp number.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          {isCohort ? (
            <Button href="/member/sessions" size="lg">
              Open 30-Day Member Portal
            </Button>
          ) : (
            <Button href="/classes" size="lg">
              Explore 30-Day Cohort Journey
            </Button>
          )}
          <Button href="/" variant="secondary" size="lg">
            Back to home
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-serif text-forest">What happens next</h2>
        <NotificationPreview phone={booking.phone} className={booking.className} time={formatTime(booking.time)} />
      </div>
    </div>
  );
}
