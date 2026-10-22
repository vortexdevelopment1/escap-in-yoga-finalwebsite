import Reveal from "@/components/ui/Reveal";

const benefits = [
  {
    title: "Breath awareness",
    text: "Learn to notice and steady your breath, on and off the mat.",
    icon: (
      <svg className="mx-auto h-8 w-8 text-sage" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M25 7 C15 7, 7 15, 7 25 C17 25, 25 17, 25 7 Z" />
        <path d="M7 25 L16 16" />
      </svg>
    ),
  },
  {
    title: "Strength and steadiness",
    text: "Standing and floor postures build a stable, supported body over time.",
    icon: (
      <svg className="mx-auto h-8 w-8 text-sage" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 27 V13" />
        <path d="M16 17 C12 13, 8 13, 8 16 C8 19, 12 19, 16 17 Z" />
        <path d="M16 15 C20 11, 24 11, 24 14 C24 17, 20 17, 16 15 Z" />
      </svg>
    ),
  },
  {
    title: "Flexibility and ease",
    text: "Regular, gentle stretching helps the body feel more open and at ease.",
    icon: (
      <svg className="mx-auto h-8 w-8 text-sage" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8 C14 13, 14 18, 16 24 C18 18, 18 13, 16 8 Z" />
        <path d="M16 24 C11 22, 7 17, 9 14 C12 14, 15 19, 16 24 Z" />
        <path d="M16 24 C21 22, 25 17, 23 14 C20 14, 17 19, 16 24 Z" />
      </svg>
    ),
  },
  {
    title: "Calm and focus",
    text: "A daily routine gives the mind a regular place to slow down.",
    icon: (
      <svg className="mx-auto h-8 w-8 text-sage" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="16" cy="16" r="12" />
        <path d="M21 11 C15 11, 11 15, 11 21 C17 21, 21 17, 21 11 Z" />
        <path d="M11 21 L16 16" />
      </svg>
    ),
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="relative bg-sand py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="rounded-[2.5rem] sm:rounded-[3rem] bg-[#FCF9F4] p-8 sm:p-12 lg:p-16 border border-forest/10 shadow-sm">
            {/* Top Ornamental Header */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-forest/20" />
                <svg className="h-4 w-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 5 C12 5, 5 12, 5 19 C12 19, 19 12, 19 5 Z" />
                  <path d="M5 19 L12 12" />
                </svg>
                <span className="h-px w-8 bg-forest/20" />
              </div>

              <p className="mt-3 text-xs font-semibold tracking-widest text-sage uppercase">
                Why Practise
              </p>

              <h2 className="mt-3 text-3xl font-serif font-medium text-forest sm:text-4xl lg:text-5xl">
                What a regular practice can bring
              </h2>

              <p className="mt-3 text-sm sm:text-base text-forest/70 leading-relaxed">
                Many practitioners describe these benefits. Yoga is a wellness practice, not a medical treatment.
              </p>
            </div>

            {/* 4 Columns with Vertical Dividers */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-forest/10">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className={`flex flex-col items-center text-center px-4 sm:px-6 py-6 md:py-4 ${
                    i !== 0 ? "lg:pl-8" : ""
                  } ${i !== benefits.length - 1 ? "lg:pr-8" : ""}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center">
                    {b.icon}
                  </div>
                  <h3 className="mt-4 font-serif text-xl sm:text-2xl font-medium text-forest">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm text-forest/75 leading-relaxed max-w-xs">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
