"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { CheckIcon } from "@/components/ui/Icons";
import { formatDay, formatTime } from "@/lib/dates";
import { requestSessionAccess } from "@/lib/sessionAccess";
import type { JourneyDay, MemberProfile } from "@/types";

type Phase = "checking" | "granted" | "denied" | "room";

function JoinBody({ day, profile, onClose }: { day: JourneyDay; profile: MemberProfile; onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("checking");
  const [reason, setReason] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setPhase("checking");
    requestSessionAccess({ email: profile.email, day: day.n }).then((r) => {
      if (cancelled) return;
      if (r.ok) setPhase("granted");
      else { setReason(r.reason); setPhase("denied"); }
    });
    return () => { cancelled = true; };
  }, [profile.email, day.n, attempt]);

  return (
    <div className="p-8 sm:p-10">
      <p className="text-sm font-semibold text-terracotta-dark">Secure session access</p>
      <h2 className="mt-2 text-3xl">Day {day.n}: {profile.className}</h2>
      <p className="mt-1 text-brown/75">{formatDay(day.date)} · {formatTime(profile.time)}</p>

      <div className="mt-8" aria-live="polite">
        {phase === "checking" && (
          <div className="flex items-center gap-4 rounded-3xl bg-sand/70 p-6">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-terracotta border-t-transparent" aria-hidden="true" />
            <p>Checking your registered email…</p>
          </div>
        )}
        {phase === "granted" && (
          <div className="rounded-3xl bg-sand/70 p-6">
            <p className="flex items-center gap-2 font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta text-cream"><CheckIcon width={16} height={16} /></span>Email verified</p>
            <p className="mt-2 break-all text-sm text-brown/75">{profile.email}</p>
            <Button className="mt-6 w-full" size="lg" onClick={() => setPhase("room")}>Enter demo room</Button>
          </div>
        )}
        {phase === "denied" && (
          <div role="alert" className="rounded-3xl bg-red-100 p-6 text-red-900">
            <p className="font-semibold">We couldn&rsquo;t verify your access</p>
            <p className="mt-1 text-sm">{reason}</p>
            <Button className="mt-5" variant="secondary" onClick={() => setAttempt((a) => a + 1)}>Try again</Button>
          </div>
        )}
        {phase === "room" && (
          <div className="rounded-3xl bg-brown p-8 text-center text-cream">
            <p className="font-serif text-2xl">Demo waiting room</p>
            <p className="mt-2 text-sm text-cream/75">This stands in for the live meeting window. No Zoom connection or authentication was made.</p>
            <Button className="mt-6" variant="light" onClick={onClose}>Leave demo room</Button>
          </div>
        )}
      </div>
      <p className="mt-6 text-sm text-brown/60">In the live product, your backend will check your registered email and return a restricted meeting link. This screen is ready to connect to that.</p>
    </div>
  );
}

function DetailsBody({ day, profile }: { day: JourneyDay; profile: MemberProfile }) {
  return (
    <div className="p-8 sm:p-10">
      <p className="text-sm font-semibold text-terracotta-dark">Completed session</p>
      <h2 className="mt-2 text-3xl">Day {day.n}: {day.title}</h2>
      <dl className="mt-6 space-y-3 text-sm">
        <div><dt className="text-brown/65">Class</dt><dd className="font-medium">{profile.className}</dd></div>
        <div><dt className="text-brown/65">Date and time</dt><dd className="font-medium">{formatDay(day.date)} · {formatTime(profile.time)}</dd></div>
        <div><dt className="text-brown/65">Status</dt><dd className="font-medium">Completed</dd></div>
      </dl>
    </div>
  );
}

interface Props { day: JourneyDay | null; mode: "join" | "details"; profile: MemberProfile; onClose: () => void }

export default function SessionAccessModal({ day, mode, profile, onClose }: Props) {
  return (
    <Modal open={!!day} onClose={onClose} title={mode === "join" ? "Secure session access" : "Session details"} maxWidth="max-w-xl">
      {day && (mode === "join" ? <JoinBody day={day} profile={profile} onClose={onClose} /> : <DetailsBody day={day} profile={profile} />)}
    </Modal>
  );
}
