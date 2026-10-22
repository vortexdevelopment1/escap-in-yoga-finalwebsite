"use client";
import { useState } from "react";
import Photo from "@/components/ui/Photo";
import SectionHeading from "@/components/ui/SectionHeading";

const slides = [
  {
    src: "/images/gal-1.jpg",
    title: "Grounding Asanas",
    desc: "Postures held with stillness and deep breath awareness.",
  },
  {
    src: "/images/gal-2.jpg",
    title: "Strength & Fluidity",
    desc: "Building steady stability without straining the body.",
  },
  {
    src: "/images/gal-3.jpg",
    title: "Deep Opening",
    desc: "Gentle releases designed to melt physical stiffness.",
  },
  {
    src: "/images/gal-4.jpg",
    title: "Stillness & Mindfulness",
    desc: "A calm sanctuary to slow down mental chatter.",
  },
  {
    src: "/images/gal-5.jpg",
    title: "Conscious Breathwork",
    desc: "Pranayama techniques that re-energise your entire system.",
  },
];

export default function GallerySection() {
  const [active, setActive] = useState(0);

  return (
    <section id="gallery" className="bg-sand py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Top Heading: Full Page Alignment (max-w-7xl) */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Inside The Practice"
          title="Moments of calm, strength & breath"
          description="A glimpse of daily live sessions guided by Avani Jain."
        />
      </div>

      {/* Images Slider Container: Full Width & Large Prominent Cards */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-12 sm:mt-16">
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar scrollbar-none snap-x snap-mandatory">
          {slides.map((item, idx) => {
            const isSelected = active === idx;
            return (
              <div
                key={item.src}
                onClick={() => setActive(idx)}
                className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-[2.5rem] transition-all duration-500 snap-center ${
                  isSelected
                    ? "w-[340px] sm:w-[480px] shadow-2xl ring-2 ring-forest/30"
                    : "w-[260px] sm:w-[340px] opacity-80 hover:opacity-100 hover:shadow-xl"
                }`}
              >
                <div className="aspect-[4/4.2] sm:aspect-[4/3.8] w-full overflow-hidden bg-forest/5">
                  <Photo
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Gradient & Caption Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/25 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
                    {item.title}
                  </h3>
                  <p className={`mt-2 text-sm text-cream/90 transition-all duration-300 leading-relaxed ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicators / Progress Dots */}
        <div className="mt-8 flex justify-center items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                active === idx
                  ? "w-10 bg-forest"
                  : "w-2.5 bg-forest/20 hover:bg-forest/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
