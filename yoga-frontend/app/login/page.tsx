import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/layout/PageHero";
import LoginForm from "@/components/member/LoginForm";

export const metadata: Metadata = { title: "Member Access" };

export default function LoginPage() {
  return (
    <>
      <PageHero
        title="Find your session"
        eyebrow="Student Portal"
        description="Enter the email address you used when booking to view your class schedule and Zoom link."
      />
      <div className="px-5 pb-24 sm:px-8">
        <Suspense fallback={null}><LoginForm /></Suspense>
      </div>
    </>
  );
}
