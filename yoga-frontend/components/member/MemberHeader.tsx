"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { clearSession } from "@/lib/storage";
import type { MemberProfile } from "@/types";

export default function MemberHeader({ profile }: { profile: MemberProfile }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-terracotta-dark">{profile.mode === "demo" ? "Demo account" : "Member area"}</p>
        <h1 className="mt-2 text-4xl sm:text-6xl">Welcome, {profile.name}.</h1>
        <p className="mt-3 text-lg text-brown/75">Here is your practice for today.</p>
      </div>
      <Button variant="secondary" onClick={() => { clearSession(); router.push("/"); }}>Sign out</Button>
    </div>
  );
}
