/**
 * Frontend-only stand-in for restricted session access.
 * Later, replace the body with a call to your backend, which should confirm the
 * registered email and return a restricted meeting link. Nothing here talks to Zoom.
 */
export type AccessResult =
  | { ok: true; meetingUrl: string; verifiedEmail: string }
  | { ok: false; reason: string };

export async function requestSessionAccess(req: { email: string; day: number }): Promise<AccessResult> {
  await new Promise((r) => setTimeout(r, 1400));
  if (!req.email) return { ok: false, reason: "No registered email was found for this account." };
  return { ok: true, meetingUrl: `https://zoom.example.invalid/escape-in-yoga/day-${req.day}`, verifiedEmail: req.email };
}
