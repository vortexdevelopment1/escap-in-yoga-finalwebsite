import type { Metadata } from "next";
import TrainerSection from "@/components/home/TrainerSection";
import TeachingPhilosophy from "@/components/about/TeachingPhilosophy";
import CTABanner from "@/components/home/CTABanner";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Escape in Yoga"
        eyebrow="Our story"
        description="Founded by Avani Jain, Escape in Yoga is an intentional daily sanctuary designed to help you slow down, cultivate steady physical strength, and rediscover inner stillness amidst everyday life."
      />
      <TrainerSection />
      <TeachingPhilosophy />
      <CTABanner />
    </>
  );
}
