import type { Metadata } from "next";
import MemberGate from "@/components/member/MemberGate";
import MemberSessions from "@/components/member/MemberSessions";

export const metadata: Metadata = { title: "My sessions" };

export default function MemberSessionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <MemberGate><MemberSessions /></MemberGate>
    </div>
  );
}
