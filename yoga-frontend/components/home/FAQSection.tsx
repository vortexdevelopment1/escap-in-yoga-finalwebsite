"use client";
import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { faqs } from "@/data/faqs";

export default function FAQSection() {
  const featuredFaqs = faqs.filter((f) => f.featured).slice(0, 4);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative bg-forest text-cream py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Subtle organic ambient background glows */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-sage/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-forest-soft/40 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75 leading-relaxed">
            Everything you need to know about joining live batches, equipment, and building your daily practice.
          </p>
        </div>

        {/* 4-5 Featured Questions Accordion */}
        <div className="mt-14 space-y-3.5">
          {featuredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <Reveal key={faq.id} delay={idx * 60}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-sage/40 bg-white/10 shadow-lg"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl font-medium text-white">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-sage text-forest-dark border-sage" : "bg-white/5 text-white/80"
                      }`}
                      aria-hidden="true"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 animate-fade-in">
                      <p className="text-sm sm:text-base leading-relaxed text-white/80 border-t border-white/10 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* View All FAQs CTA Banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/15 bg-white/[0.06] p-6 sm:p-8 backdrop-blur-sm">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
              Have more questions?
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Browse our full knowledge base of all 14 questions with live search.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-forest-dark shadow-sm transition-all hover:bg-sage-light hover:shadow-md w-full sm:w-auto"
            >
              <span>View all questions ({faqs.length})</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
