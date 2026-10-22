import Reveal from "@/components/ui/Reveal";
import ClassCard from "./ClassCard";
import type { YogaClass } from "@/types";

export default function ClassGrid({ items }: { items: YogaClass[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c, i) => (
        <Reveal key={c.slug} delay={(i % 3) * 90} className="h-full"><ClassCard item={c} /></Reveal>
      ))}
    </div>
  );
}
