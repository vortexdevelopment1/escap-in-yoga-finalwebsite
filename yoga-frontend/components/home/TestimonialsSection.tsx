import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-sage" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5 fill-current"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const featured = testimonials.slice(0, 3);

  return (
    <section id="testimonials" className="relative bg-softcream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Member Stories"
          title="Stories of calm, strength & transformation"
        />

        {/* 3 Compact Testimonial Cards in 1 row */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featured.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 80}>
              <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-5 border border-forest/10 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between">
                    <StarRating count={item.rating} />
                    <span className="rounded-full bg-peach/70 px-2.5 py-0.5 text-[10px] font-semibold text-forest uppercase tracking-wider">
                      {item.journeyMilestone}
                    </span>
                  </div>

                  <p className="mt-3.5 font-serif text-sm sm:text-[15px] text-forest italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-3 pt-3.5 border-t border-forest/10">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/20 text-forest font-serif font-semibold text-xs">
                    {item.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-forest text-sm leading-snug truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-forest/70 truncate">
                      {item.role} · {item.location}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
