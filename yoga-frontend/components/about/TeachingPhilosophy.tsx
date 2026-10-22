import Reveal from "@/components/ui/Reveal";

const principles = [
  {
    title: "The Studio in Your Home",
    desc: "Live, synchronous batches mean you practise with an authentic community and an attentive instructor without commuting.",
    icon: (
      <svg className="h-6 w-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "Breath as the Foundation",
    desc: "Every flow starts with settling the nervous system. Asanas follow the breath, keeping movement safe, grounded, and deeply restorative.",
    icon: (
      <svg className="h-6 w-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Non-Judgmental Progression",
    desc: "Yoga is not about touching your toes or striking a perfect pose. It is about consistent showing up and listening to what your body needs today.",
    icon: (
      <svg className="h-6 w-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function TeachingPhilosophy() {
  return (
    <section className="bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="rounded-[2.5rem] sm:rounded-[3rem] bg-[#FCFAF6] p-8 sm:p-12 lg:p-16 border border-forest/10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-forest/5 px-3 py-1 text-xs font-semibold tracking-wider text-forest uppercase">
              Core Principles
            </span>
            <h2 className="mt-4 text-3xl font-serif font-medium text-forest sm:text-4xl lg:text-5xl">
              Our Teaching Philosophy
            </h2>
            <p className="mt-3 text-sm sm:text-base text-forest/70 leading-relaxed">
              How we approach mindful living, body awareness, and daily sustainable transformation.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {principles.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 90}>
                <div className="flex h-full flex-col rounded-2xl bg-white p-7 border border-forest/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/5 text-forest">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-medium text-forest">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-forest/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
