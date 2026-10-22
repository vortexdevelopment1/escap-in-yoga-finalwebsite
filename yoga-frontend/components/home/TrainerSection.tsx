import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TrainerSection() {
  return (
    <section id="trainer" className="relative overflow-hidden bg-warmbeige/50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Photo src="/images/trainer.jpg" alt="Yoga instructor Avani Jain in meditation pose" className="mx-auto aspect-[4/5] max-w-sm rounded-t-full rounded-b-[2rem] shadow-sm lg:max-w-none" />
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading eyebrow="Your teacher" title="Meet Avani Jain" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-forest/85">
            <p>Avani leads every live session at Escape in Yoga. Her classes are paced, clear and welcoming, whether you are stepping onto the mat for the first time or returning after a break.</p>
            <p>Her approach centres on breath first, movement second, so each posture feels considered rather than rushed.</p>
          </div>
          <blockquote className="mt-8 rounded-3xl bg-white p-7 shadow-sm">
            <p className="font-serif text-2xl leading-snug text-forest">&ldquo;Show up, breathe, and let the practice meet you where you are.&rdquo;</p>
            <footer className="mt-3 text-sm text-forest/70">Avani Jain</footer>
          </blockquote>
          <div className="mt-8"><Button href="/schedule">See Avani&rsquo;s schedule</Button></div>
        </Reveal>
      </div>
    </section>
  );
}
