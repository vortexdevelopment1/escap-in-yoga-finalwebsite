import type { Metadata } from "next";
import MemberGate from "@/components/member/MemberGate";
import MemberOverview from "@/components/member/MemberOverview";

export const metadata: Metadata = { title: "My journey" };

export default function MemberPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <MemberGate><MemberOverview /></MemberGate>
    </div>
  );
}
