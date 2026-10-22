import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const pillars = [
  { title: "Breath", text: "Every session begins by slowing down and noticing how you breathe." },
  { title: "Movement", text: "Postures are taught step by step, with options for different levels." },
  { title: "Stillness", text: "Each class ends with time to settle before you return to your day." },
];

export default function OurStory() {
  return (
    <section id="our-story" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left Side (Desktop) / Top (Mobile): Big rounded image + overlapping circular image */}
        <Reveal className="relative order-1 lg:order-1">
          <Photo
            src="/images/story-1.jpg"
            alt="Avani Jain practising yoga tree posture"
            className="aspect-[4/5] w-4/5 rounded-[2.5rem] shadow-sm"
          />
          <Photo
            src="/images/story-2.jpg"
            alt="Avani Jain smiling in yoga posture"
            className="absolute -bottom-8 right-2 sm:-bottom-10 sm:right-0 aspect-square w-1/2 rounded-full border-8 border-white shadow-md"
          />
        </Reveal>

        {/* Right Side (Desktop) / Bottom (Mobile): Heading, Paragraph & 3 Pillars */}
        <Reveal className="order-2 lg:order-2">
          <SectionHeading
            eyebrow="Our story"
            title="A calm place to practise, wherever you are."
            description="Escape in Yoga brings a studio-style routine to your screen. Classes run live at set batch times, so you practise alongside others without leaving home."
          />
          <ul className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
            {pillars.map((p) => (
              <li key={p.title} className="border-l-2 border-sage pl-5">
                <h3 className="text-xl font-serif text-forest">{p.title}</h3>
                <p className="mt-1 text-forest/80">{p.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
