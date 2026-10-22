"use client";
import { useState, useMemo } from "react";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { faqs, FAQItem } from "@/data/faqs";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = [
    "All",
    "Getting Started",
    "Sessions & Batches",
    "Health & Safety",
    "Memberships & Billing",
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <PageHero
        title="Help & Questions"
        eyebrow="Knowledge Base"
        description="Search our complete guide to live batches, daily unlocking sessions, equipment, and yogic safety."
      />

      <section className="bg-sand py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {/* Search Box & Controls */}
          <div className="rounded-3xl bg-cream p-6 sm:p-8 border border-forest/10 shadow-sm">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-forest/40">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any question (e.g. beginner, zoom, timings, injuries)..."
                className="w-full rounded-2xl border border-forest/20 bg-softcream/60 py-3.5 pl-12 pr-10 text-base text-forest placeholder:text-forest/40 focus:border-sage focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-forest/40 hover:text-forest"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-forest/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                    selectedCategory === cat
                      ? "bg-forest text-cream shadow-sm"
                      : "bg-softcream text-forest/75 border border-forest/10 hover:bg-peach"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-xs text-forest/60">
              <span>
                Showing {filteredFaqs.length} of {faqs.length} questions
              </span>
            </div>
          </div>

          {/* Accordion List */}
          <div className="mt-10 space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openId === faq.id;
                return (
                  <Reveal key={faq.id} delay={idx * 30}>
                    <div
                      className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                        isOpen
                          ? "border-sage bg-cream shadow-md"
                          : "border-forest/10 bg-cream hover:border-forest/25"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggle(faq.id)}
                        className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left"
                        aria-expanded={isOpen}
                      >
                        <div>
                          <h3 className="font-serif text-lg sm:text-xl font-medium text-forest">
                            {faq.question}
                          </h3>
                        </div>
                        <span
                          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest/15 transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 bg-forest text-cream border-forest"
                              : "bg-softcream text-forest"
                          }`}
                          aria-hidden="true"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 sm:px-6 pt-0 animate-fade-in">
                          <p className="text-sm sm:text-base leading-relaxed text-forest/80 border-t border-forest/10 pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-forest/20 bg-cream p-12 text-center">
                <p className="font-serif text-2xl text-forest">No matching questions found</p>
                <p className="mt-2 text-sm text-forest/70">
                  Try searching with different keywords like &ldquo;zoom&rdquo;, &ldquo;beginner&rdquo;, or &ldquo;batch&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-5 inline-flex items-center rounded-full bg-forest px-5 py-2 text-xs font-semibold text-cream"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Need personal advice card */}
          <div className="mt-16 rounded-3xl border border-forest/10 bg-white p-8 text-center sm:p-10 shadow-sm">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-forest">
              Could not find what you were looking for?
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-forest/80 leading-relaxed">
              Avani and our support team are available to discuss customized modifications, health precautions, and batch timings.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/contact" size="md">
                Contact Avani
              </Button>
              <Button href="/schedule" variant="secondary" size="md">
                Explore Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
