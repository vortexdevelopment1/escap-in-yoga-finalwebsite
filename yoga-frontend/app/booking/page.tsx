import type { Metadata } from "next";
import { Suspense } from "react";
import BookingFlow from "@/components/booking/BookingFlow";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "Book a session" };

export default function BookingPage() {
  return (
    <>
      <PageHero title="Book your session" eyebrow="Booking" description="Choose a class, a date and a batch, then share your details. It takes about two minutes." />
      <div className="px-5 pb-24 sm:px-8">
        <Suspense fallback={<p role="status" className="text-center text-brown/70">Loading booking…</p>}>
          <BookingFlow />
        </Suspense>
      </div>
    </>
  );
}
