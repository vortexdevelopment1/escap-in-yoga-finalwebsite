import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { uspItems } from "@/data/usps";

export default function USPSection() {
  return (
    <section id="why-us" className="bg-[#FAF7F2] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-forest/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-forest uppercase">
            <span className="h-2 w-2 rounded-full bg-sage" />
            Why Escape in Yoga
          </span>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-forest leading-tight">
            A mindful practice designed around your life.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-forest/75 leading-relaxed">
            We combine time-honoured yogic principles with a supportive modern framework so your daily practice becomes a joyful, sustainable sanctuary.
          </p>
        </div>

        {/* 4 Cards in 4-Column Grid on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="mt-14 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {uspItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 80}>
              <div className="group flex h-full flex-col justify-between rounded-3xl bg-white p-7 border border-forest/10 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-forest/25 hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-forest/5 px-3 py-1 text-[11px] font-semibold tracking-wider text-forest uppercase">
                      {item.badge}
                    </span>
                    <span className="font-serif text-lg font-bold text-forest/25">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-xl sm:text-2xl font-medium text-forest leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-[15px] text-forest/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-forest/10 flex items-center gap-2 text-xs font-semibold text-forest/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/20 text-forest">
                    <CheckIcon className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span>{item.highlight}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Centered CTAs */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Button href="/classes" size="lg" className="shadow-sm">
            Explore Our Services
          </Button>
          <Button href="/schedule" variant="secondary" size="lg">
            View Batch Timings
          </Button>
        </div>
      </div>
    </section>
  );
}
