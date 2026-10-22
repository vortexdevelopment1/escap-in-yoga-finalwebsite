import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function CTABanner() {
  return (
    <section className="bg-sand px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-peach px-8 py-16 text-center sm:py-20">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-terracotta/70" aria-hidden="true" />
          <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-cream/60" aria-hidden="true" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-4xl sm:text-5xl">Choose your batch and begin.</h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-brown/80">It takes a few minutes to book. Your first session opens on your start date.</p>
            <div className="mt-8"><Button href="/booking" size="lg">Book a session</Button></div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
