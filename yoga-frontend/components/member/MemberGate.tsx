"use client";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Field";
import type { MemberProfile } from "@/types";
import { useMember } from "./useMember";

/** Renders children only for a logged-in (mock) member. */
export default function MemberGate({ children }: { children: ReactNode }) {
  const { ready, profile } = useMember();
  if (!ready) return <p role="status" className="py-20 text-center text-brown/70">Loading your journey…</p>;
  if (!profile) {
    return <EmptyState title="Log in to see your sessions" action={<Button href="/login">Member login</Button>}>Your subscription and daily sessions appear here after you log in.</EmptyState>;
  }

  // Check if this student is restricted by Admin
  if (typeof window !== "undefined") {
    try {
      const allBookings = JSON.parse(localStorage.getItem("eiy:all_bookings") || "[]");
      const matched = allBookings.find((b: any) => b.email && b.email.toLowerCase() === profile.email.toLowerCase());
      if (matched && matched.isRestricted) {
        return (
          <EmptyState
            title="Account Access Restricted"
            action={
              <a
                href="https://wa.me/919826012345?text=Hello%20Avani%20ji,%20my%20account%20access%20is%20restricted."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-forest text-cream px-5 py-2.5 text-sm font-semibold hover:bg-forest/90 transition shadow-sm"
              >
                Contact Instructor on WhatsApp
              </a>
            }
          >
            Your live session access has been temporarily put on hold by the instructor. Please contact support.
          </EmptyState>
        );
      }
    } catch {}
  }

  return <>{children}</>;
}
