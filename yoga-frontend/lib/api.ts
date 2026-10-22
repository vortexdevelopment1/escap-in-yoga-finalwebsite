const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  classSlug: string;
  className: string;
  batchTime: string;
  dateISO: string;
  planType?: "FREE_TRIAL" | "30_DAY_COHORT";
}

/**
 * Check if the user's email is eligible for a Free Trial.
 * Checks both local storage cache and live backend database.
 */
export async function checkTrialEligibility(email: string): Promise<{ eligible: boolean; message?: string }> {
  const cleanEmail = email.toLowerCase().trim();

  // 1. Check local storage: claimed trials AND all existing bookings (including 30-Day Cohort)
  if (typeof window !== "undefined") {
    try {
      // Check claimed trials list
      const claimedTrials: string[] = JSON.parse(localStorage.getItem("eiy:claimed_trials") || "[]");
      if (claimedTrials.map((e) => e.toLowerCase().trim()).includes(cleanEmail)) {
        return {
          eligible: false,
          message: "This email has already claimed a Free Trial session. Please choose the 30-Day Cohort Journey to continue practicing.",
        };
      }

      // Check all bookings list (if already in 30-Day Cohort or Trial)
      const allBookings: any[] = JSON.parse(localStorage.getItem("eiy:all_bookings") || "[]");
      const existing = allBookings.find((b) => b?.email?.toLowerCase().trim() === cleanEmail);
      if (existing) {
        const isCohort = existing.planType === "30_DAY_COHORT";
        return {
          eligible: false,
          message: isCohort
            ? "This email is already enrolled in the 30-Day Cohort! Free Trials are reserved for new students."
            : "This email has already claimed a Free Trial session. Please choose the 30-Day Cohort.",
        };
      }
    } catch {}
  }

  // 2. Check Backend API
  try {
    const res = await fetch(`${API_BASE}/bookings/check-trial/${encodeURIComponent(cleanEmail)}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {}

  return { eligible: true };
}

/**
 * Submit booking to backend database.
 */
export async function submitBooking(payload: BookingPayload) {
  const cleanEmail = payload.email.toLowerCase().trim();

  // If this is a free trial, enforce strict non-duplicate policy
  if (payload.planType === "FREE_TRIAL" && typeof window !== "undefined") {
    try {
      const allBookings: any[] = JSON.parse(localStorage.getItem("eiy:all_bookings") || "[]");
      const existing = allBookings.find((b) => b?.email?.toLowerCase().trim() === cleanEmail);
      if (existing) {
        throw new Error(
          existing.planType === "30_DAY_COHORT"
            ? "This email is already registered in the 30-Day Cohort. Free Trials are for new students only."
            : "This email has already claimed a Free Trial session."
        );
      }

      const claimedTrials: string[] = JSON.parse(localStorage.getItem("eiy:claimed_trials") || "[]");
      if (claimedTrials.map((e) => e.toLowerCase().trim()).includes(cleanEmail)) {
        throw new Error("This email has already claimed a Free Trial. Please select the 30-Day Cohort.");
      }
      localStorage.setItem("eiy:claimed_trials", JSON.stringify([...claimedTrials, cleanEmail]));
    } catch (err: any) {
      if (err.message && (err.message.includes("already") || err.message.includes("Free Trial"))) throw err;
    }
  }

  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to create booking");
    }
    return data;
  } catch (err: any) {
    if (err?.message && !err.message.includes("fetch")) {
      throw err;
    }
    // Fallback if backend is offline
    return {
      success: true,
      booking: { ...payload, _id: "local-" + Date.now(), status: "CONFIRMED" },
    };
  }
}

/**
 * Fetch member's 30-day journey progress from backend.
 */
export async function fetchMemberJourney(email: string) {
  const res = await fetch(`${API_BASE}/sessions/journey/${encodeURIComponent(email)}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch journey");
  }
  return data;
}

/**
 * Request access to today's Zoom session room.
 */
export async function accessSessionRoom(email: string, dayNumber: number) {
  const res = await fetch(`${API_BASE}/sessions/access-room`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, dayNumber }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to access session");
  }
  return data;
}
