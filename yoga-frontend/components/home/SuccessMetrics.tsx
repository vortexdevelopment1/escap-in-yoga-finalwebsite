import Reveal from "@/components/ui/Reveal";
import { successMetrics } from "@/data/metrics";

export default function SuccessMetrics() {
  return (
    <section className="w-full bg-[#1e3427] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
          {successMetrics.map((item, idx) => (
            <div
              key={item.label}
              className={`relative flex flex-col items-center justify-center px-4 text-center ${
                idx !== 0 ? "md:border-l md:border-white/15" : ""
              } ${idx % 2 === 1 ? "border-l border-white/15 md:border-l" : ""}`}
            >
              <Reveal delay={idx * 60}>
                <p className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide text-sage-light/85 sm:text-sm lg:text-base">
                  {item.label}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
