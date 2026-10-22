import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { ArrowIcon, ClockIcon } from "@/components/ui/Icons";
import type { YogaClass } from "@/types";

export default function ClassCard({ item }: { item: YogaClass }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_40px_-28px_rgba(52,76,61,.2)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-26px_rgba(52,76,61,.3)]">
      <Photo src={item.image} alt={`${item.name} illustration`} className="aspect-[4/3]" zoom />
      <div className="flex flex-1 flex-col p-7">
        <p className="flex items-center gap-2 text-sm font-semibold text-sage"><ClockIcon width={16} height={16} />{item.duration} · {item.level}</p>
        <h3 className="mt-3 text-3xl font-serif text-forest">{item.name}</h3>
        <p className="mt-3 flex-1 text-forest/80 leading-relaxed">{item.short}</p>
        <div className="mt-6 border-t border-forest/10 pt-4">
          <Link
            href={`/booking?class=${item.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-3 text-sm font-semibold text-cream shadow-sm hover:bg-forest/90 transition-all"
          >
            Book Live Class
            <ArrowIcon width={16} height={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
