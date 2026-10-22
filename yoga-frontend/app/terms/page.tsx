import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms" description="Placeholder page. Replace with the studio's official terms text before launch." />
      <div className="mx-auto max-w-3xl px-5 pb-24 text-lg text-brown/80 sm:px-8">
        <p>This frontend demo does not collect or send personal data to a server. Bookings and login state are stored only in your own browser.</p>
      </div>
    </>
  );
}
