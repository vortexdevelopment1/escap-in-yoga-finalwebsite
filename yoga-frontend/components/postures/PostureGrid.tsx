"use client";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { postureCategories, postures } from "@/data/postures";
import type { Posture, PostureCategory } from "@/types";
import PostureCard from "./PostureCard";
import PostureModal from "./PostureModal";

export default function PostureGrid({ limit, showFilters = true }: { limit?: number; showFilters?: boolean }) {
  const [category, setCategory] = useState<"All" | PostureCategory>("All");
  const [selected, setSelected] = useState<Posture | null>(null);

  const filtered = postures.filter((p) => category === "All" || p.category === category);
  const items = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      {showFilters && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter postures by category">
          {postureCategories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c}
              className={`min-h-[44px] rounded-full border px-5 text-sm font-semibold transition ${category === c ? "border-terracotta bg-terracotta text-cream" : "border-brown/25 hover:bg-peach/60"}`}>
              {c}
            </button>
          ))}
        </div>
      )}
      {items.length === 0 ? (
        <EmptyState title="No postures in this category" action={<Button variant="secondary" onClick={() => setCategory("All")}>Show all postures</Button>}>Try another category.</EmptyState>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 80} className="h-full"><PostureCard item={p} onOpen={setSelected} /></Reveal>)}
        </div>
      )}
      <PostureModal posture={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
