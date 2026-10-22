import SectionHeading from "@/components/ui/SectionHeading";
import PostureGrid from "@/components/postures/PostureGrid";
import Button from "@/components/ui/Button";

export default function PosturesSection() {
  return (
    <section id="postures" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Posture Knowledge Base"
          title="Explore mindful postures and wellness benefits"
          description="Discover foundational asanas, their traditional Sanskrit roots, and therapeutic physiological benefits."
        />
        <div className="mt-14">
          <PostureGrid showFilters={false} />
        </div>
        <div className="mt-12 text-center">
          <Button href="/classes" variant="secondary" size="lg">
            Explore All Services & Batches
          </Button>
        </div>
      </div>
    </section>
  );
}
