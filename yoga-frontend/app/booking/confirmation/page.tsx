import type { Metadata } from "next";
import BookingConfirmation from "@/components/booking/BookingConfirmation";

export const metadata: Metadata = { title: "Booking confirmed" };

export default function ConfirmationPage() {
  return (
    <div className="px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <BookingConfirmation />
    </div>
  );
}
