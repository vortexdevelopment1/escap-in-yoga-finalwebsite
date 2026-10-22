import Hero from "@/components/home/Hero";
import SuccessMetrics from "@/components/home/SuccessMetrics";
import OurStory from "@/components/OurStory";
import BenefitsSection from "@/components/home/BenefitsSection";
import GallerySection from "@/components/home/GallerySection";
import HowItWorks from "@/components/home/HowItWorks";
import JourneySection from "@/components/home/JourneySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SuccessMetrics />
      <OurStory />
      <BenefitsSection />
      <GallerySection />
      <HowItWorks />
      <JourneySection />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
    </>
  );
}
